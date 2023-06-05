import { z } from "zod";

import { KontenBlogSchema } from "~/utils/zod-prisma/index";

import {
  createTRPCRouter,
  publicProcedure,
  blogManagerProcedure,
  userProcedure,
} from "~/server/api/trpc";
import { env } from "~/env.mjs";
import { tryToCatch } from "~/utils/trycatch";
import { TRPCError } from "@trpc/server";
import { addCommentSchema } from "~/utils/schemas";

export const blogRouter = createTRPCRouter({
  createPresignedUrl: publicProcedure.mutation(async ({ ctx }) => {
    const gambar = await ctx.prisma.gambarBlog.create({
      data: {},
    });

    try {
      const post = ctx.s3.createPresignedPost({
        Fields: {
          key: `blog/${gambar.id}`,
        },
        Conditions: [
          ["starts-with", "$Content-Type", "image/"],
          ["content-length-range", 0, 10_000_000],
        ],
        Expires: 60,
        Bucket: env.BUCKET_NAME,
      });

      return { ...post, imageId: gambar.id };
    } catch (err) {
      console.error(err);
      // console.log(env);

      await ctx.prisma.gambarBlog.delete({
        where: {
          id: gambar.id,
        },
      });

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create presigned url",
      });
    }
  }),

  getAllImages: publicProcedure.query(async ({ ctx }) => {
    const images = await ctx.prisma.gambarBlog.findMany({});

    return await Promise.all(
      images.map(async (image) => {
        return {
          ...image,
          url: await ctx.s3.getSignedUrlPromise("getObject", {
            Bucket: env.BUCKET_NAME,
            Key: `blog/${image.id}`,
          }),
        };
      })
    );
  }),

  getImagesById: publicProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
      })
    )
    .query(async ({ ctx, input }) => {
      const images = await ctx.prisma.gambarBlog.findMany({
        where: {
          id: { in: input.ids },
        },
      });

      return await Promise.all(
        images.map(async (image) => {
          return {
            ...image,
            url: await ctx.s3.getSignedUrlPromise("getObject", {
              Bucket: env.BUCKET_NAME,
              Key: `blog/${image.id}`,
            }),
          };
        })
      );
    }),

  getImage: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (input.id === "") {
        return null;
      }

      const image = await ctx.prisma.gambarBlog.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!image) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Image not found",
        });
      }

      return {
        ...image,
        url: await ctx.s3.getSignedUrlPromise("getObject", {
          Bucket: env.BUCKET_NAME,
          Key: `blog/${image.id}`,
        }),
      };
    }),

  deleteImage: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.contohImage.delete({
        where: {
          id: input.id,
        },
      });

      return new Promise((resolve, reject) => {
        ctx.s3.deleteObject(
          {
            Bucket: env.BUCKET_NAME,
            Key: `blog/${input.id}`,
          },
          (err, data) => {
            if (err) reject(err);
            else resolve(data);
          }
        );
      });
    }),

  createBlog: publicProcedure
    .input(
      z.object({
        judul: z.string(),
        isi: z.string(),
        imageId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const blog = await ctx.prisma.kontenBlog.create({
        data: {
          judul: input.judul,
          isi: input.isi,
          posted: false,
          gambarBlog: {
            connect: { id: input.imageId },
          },
        },
      });

      return blog;
    }),

  updateBlog: publicProcedure
    .input(KontenBlogSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.kontenBlog.update({
        where: {
          id: input.id,
        },
        data: input,
      });
    }),

  getBlogById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const blog = await ctx.prisma.kontenBlog.findUnique({
        where: {
          id: input.id,
        },
        include: {
          gambarBlog: true,
          dislikedBy: true,
          likedBy: true,
        },
      });

      return blog;
    }),

  getAllBlogDraft: publicProcedure.query(async ({ ctx }) => {
    const blogs = await ctx.prisma.kontenBlog.findMany({
      where: {
        posted: false,
      },
      include: {
        gambarBlog: true,
      },
    });

    return blogs;
  }),

  getAllBlogPosted: publicProcedure.query(async ({ ctx }) => {
    const blogs = await ctx.prisma.kontenBlog.findMany({
      where: {
        posted: true,
      },
      include: {
        gambarBlog: true,
      },
    });

    return blogs;
  }),

  konfirmasiBlog: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const blog = await ctx.prisma.kontenBlog.update({
        where: {
          id: input.id,
        },
        data: {
          posted: true,
        },
      });

      return blog;
    }),

  draftBlog: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const blog = await ctx.prisma.kontenBlog.update({
        where: {
          id: input.id,
        },
        data: {
          posted: false,
        },
      });
    }),

  deleteBlog: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const blog = await ctx.prisma.kontenBlog.delete({
        where: {
          id: input.id,
        },
      });

      return new Promise((resolve, reject) => {
        ctx.s3.deleteObject(
          {
            Bucket: env.BUCKET_NAME,
            Key: `blog/${blog.gambarBlogId}`,
          },
          (err, data) => {
            if (err) reject(err);
            else resolve(data);
          }
        );
      });
    }),

  addComment: userProcedure
    .input(addCommentSchema)
    .mutation(async ({ ctx, input }) => {
      const blog = await ctx.prisma.kontenBlog.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!blog) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Blog not found",
        });
      }

      await ctx.prisma.commentBlog.create({
        data: {
          isi: input.isi,
          kontenBlog: {
            connect: {
              id: input.id,
            },
          },
          user: {
            connect: {
              id: ctx.session.id,
            },
          },
        },
      });
    }),

  getAllComment: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.commentBlog.findMany({
        where: {
          kontenBlogId: input.id,
        },
        include: {
          user: true,
          likedBy: true,
          dislikedBy: true,
        },
      });
    }),

  addBlogLike: userProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const blog = await ctx.prisma.kontenBlog.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!blog) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Blog not found",
        });
      }

      const isLiked = await ctx.prisma.kontenBlog.findUnique({
        where: {
          id: input.id,
        },
        include: {
          likedBy: {
            where: {
              id: ctx.session.id,
            },
          },
        },
      });

      if (isLiked!.likedBy.length > 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Already liked",
        });
      }

      return await ctx.prisma.kontenBlog.update({
        where: {
          id: input.id,
        },
        data: {
          likedBy: {
            connect: {
              id: ctx.session.id,
            },
          },
        },
      });
    }),

  addBlogDislike: userProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const blog = await ctx.prisma.kontenBlog.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!blog) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Blog not found",
        });
      }

      const isLiked = await ctx.prisma.kontenBlog.findUnique({
        where: {
          id: input.id,
        },
        include: {
          dislikedBy: {
            where: {
              id: ctx.session.id,
            },
          },
        },
      });

      if (isLiked!.dislikedBy.length > 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Already liked",
        });
      }

      return await ctx.prisma.kontenBlog.update({
        where: {
          id: input.id,
        },
        data: {
          dislikedBy: {
            connect: {
              id: ctx.session.id,
            },
          },
        },
      });
    }),

  removeBlogLike: userProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const blog = await ctx.prisma.kontenBlog.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!blog) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Blog not found",
        });
      }

      const isLiked = await ctx.prisma.kontenBlog.findUnique({
        where: {
          id: input.id,
        },
        include: {
          likedBy: {
            where: {
              id: ctx.session.id,
            },
          },
        },
      });

      if (isLiked!.likedBy.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Already liked",
        });
      }

      return await ctx.prisma.kontenBlog.update({
        where: {
          id: input.id,
        },
        data: {
          likedBy: {
            disconnect: {
              id: ctx.session.id,
            },
          },
        },
      });
    }),

  removeBlogDislike: userProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const blog = await ctx.prisma.kontenBlog.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!blog) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Blog not found",
        });
      }

      const isLiked = await ctx.prisma.kontenBlog.findUnique({
        where: {
          id: input.id,
        },
        include: {
          dislikedBy: {
            where: {
              id: ctx.session.id,
            },
          },
        },
      });

      if (isLiked!.dislikedBy.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Already liked",
        });
      }

      return await ctx.prisma.kontenBlog.update({
        where: {
          id: input.id,
        },
        data: {
          dislikedBy: {
            disconnect: {
              id: ctx.session.id,
            },
          },
        },
      });
    }),

  addLike: userProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.prisma.commentBlog.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!comment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Comment not found",
        });
      }

      const isLiked = await ctx.prisma.commentBlog.findUnique({
        where: {
          id: input.id,
        },
        include: {
          likedBy: {
            where: {
              id: ctx.session.id,
            },
          },
        },
      });

      if (isLiked!.likedBy.length > 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Already liked",
        });
      }

      return await ctx.prisma.commentBlog.update({
        where: {
          id: input.id,
        },
        data: {
          likedBy: {
            connect: {
              id: ctx.session.id,
            },
          },
        },
      });
    }),

  addDislike: userProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.prisma.commentBlog.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!comment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Comment not found",
        });
      }

      const isDisliked = await ctx.prisma.commentBlog.findUnique({
        where: {
          id: input.id,
        },
        include: {
          dislikedBy: {
            where: {
              id: ctx.session.id,
            },
          },
        },
      });

      if (isDisliked!.dislikedBy.length > 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Already disliked",
        });
      }

      return await ctx.prisma.commentBlog.update({
        where: {
          id: input.id,
        },
        data: {
          dislikedBy: {
            connect: {
              id: ctx.session.id,
            },
          },
        },
      });
    }),

  removeLike: userProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.prisma.commentBlog.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!comment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Comment not found",
        });
      }

      const isLiked = await ctx.prisma.commentBlog.findUnique({
        where: {
          id: input.id,
        },
        include: {
          likedBy: {
            where: {
              id: ctx.session.id,
            },
          },
        },
      });

      if (isLiked!.likedBy.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Haven't liked",
        });
      }

      return await ctx.prisma.commentBlog.update({
        where: {
          id: input.id,
        },
        data: {
          likedBy: {
            disconnect: {
              id: ctx.session.id,
            },
          },
        },
      });
    }),

  removeDislike: userProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.prisma.commentBlog.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!comment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Comment not found",
        });
      }

      const isDisliked = await ctx.prisma.commentBlog.findUnique({
        where: {
          id: input.id,
        },
        include: {
          dislikedBy: {
            where: {
              id: ctx.session.id,
            },
          },
        },
      });

      if (isDisliked!.dislikedBy.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Haven't disliked",
        });
      }

      return await ctx.prisma.commentBlog.update({
        where: {
          id: input.id,
        },
        data: {
          dislikedBy: {
            disconnect: {
              id: ctx.session.id,
            },
          },
        },
      });
    }),

  getDashboardData: blogManagerProcedure.query(async ({ ctx }) => {
    const blogCount = await ctx.prisma.kontenBlog.count();
    const commentCount = await ctx.prisma.commentBlog.count();
    const userCount = await ctx.prisma.user.count();
    const likedBlogCount = await ctx.prisma.kontenBlog.count({
      where: {
        likedBy: {
          some: {
            id: {
              not: undefined,
            },
          },
        },
      },
    });

    const dislikeBlogCount = await ctx.prisma.kontenBlog.count({
      where: {
        dislikedBy: {
          some: {
            id: {
              not: undefined,
            },
          },
        },
      },
    });

    return [
      {
        name: "blogCount",
        value: blogCount,
      },
      {
        name: "commentCount",
        value: commentCount,
      },
      {
        name: "userCount",
        value: userCount,
      },
      {
        name: "likedBlogCount",
        value: likedBlogCount,
      },
      {
        name: "dislikeBlogCount",
        value: dislikeBlogCount,
      },
    ];
  }),
});

import { z } from "zod";

import { KontenBlogSchema} from "~/utils/zod-prisma/index"

import {
  createTRPCRouter,
  publicProcedure,
  blogManagerProcedure,
} from "~/server/api/trpc";
import { env } from "~/env.mjs";
import { tryToCatch } from "~/utils/trycatch";
import { TRPCError } from "@trpc/server";

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
          like: 0,
          posted: false,
          gambarBlog: {
            connect: { id: input.imageId },
          },
        },
      });

      return blog;
    }),

  updateBlog: publicProcedure.input(KontenBlogSchema)
  .mutation(async ({ ctx, input }) => {
    return await ctx.prisma.kontenBlog.update({
      where: {
        id: input.id,
      },
      data: input
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
    }
  ),

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
    }
  ),

});

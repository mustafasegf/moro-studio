import { z } from "zod";
import { sign } from "jsonwebtoken";

import {
  createTRPCRouter,
  publicProcedure,
  userProcedure,
} from "~/server/api/trpc";
import { env } from "~/env.mjs";
import { tryToCatch } from "~/utils/trycatch";
import { TRPCError } from "@trpc/server";

export const aksesFotoRouter = createTRPCRouter({
  createPresignedUrl: userProcedure.mutation(async ({ ctx }) => {
    console.log("ctx.session.id", ctx.session);

    const gambarRow = await ctx.prisma.contohImage.create({
      data: {
        user: {
          connect: {
            id: ctx.session.id,
          },
        },
      },
    });

    try {
      const post = ctx.s3.createPresignedPost({
        Fields: {
          key: `${ctx.session.id}/${gambarRow.id}`,
        },
        Conditions: [
          ["starts-with", "$Content-Type", "image/"],
          ["content-length-range", 0, 10_000_000],
        ],
        Expires: 60,
        Bucket: env.BUCKET_NAME,
      });

      return { ...post, imageId: gambarRow.id };

    } catch (err) {
      console.error(err);
      console.log(env);

      await ctx.prisma.fotoUser.delete({
        where: {
          id: gambarRow.id,
        },
      });

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create presigned url",
      });
    }
  }),

  getAllFoto: userProcedure.query(async ({ ctx }) => {
    const images = await ctx.prisma.contohImage.findMany({
      where: {
        userId: ctx.session.id,
      },
    });

    return await Promise.all(
      images.map(async (image) => {
        return {
          ...image,
          url: await ctx.s3.getSignedUrlPromise("getObject", {
            Bucket: env.BUCKET_NAME,
            Key: `${ctx.session.id}/${image.id}`,
          }),
        };
      })
    );
  }),

  deleteFoto: userProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.fotoUser.delete({
        where: {
          id: input.id,
        },
      });

      return new Promise((resolve, reject) => {
        ctx.s3.deleteObject(
          {
            Bucket: env.BUCKET_NAME,
            Key: `${ctx.session.id}/${input.id}`,
          },
          (err, data) => {
            if (err) reject(err);
            else resolve(data);
          }
        );
      });
    }),

  //   downloadFoto: userProcedure.query(async ({ ctx, input }) => {
  //   const { id } = input;

  //   const filePath = `${ctx.session.id}/${id}`;

  //   const fileStream = createReadStream(filePath);
  //   fileStream.on("error", (error) => {
  //     throw new TRPCError({
  //       code: "INTERNAL_SERVER_ERROR",
  //       message: "Failed to download photo",
  //     });
  //   });

  //   return {
  //     stream: fileStream,
  //     fileName: id,
  //   };
  // }),
});

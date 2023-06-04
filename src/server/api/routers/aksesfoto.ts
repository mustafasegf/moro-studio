import { z } from "zod";
import { sign } from "jsonwebtoken";

import {
  createTRPCRouter,
  publicProcedure,
  studioManagerProcedure,
  userProcedure,
} from "~/server/api/trpc";
import { env } from "~/env.mjs";
import { tryToCatch } from "~/utils/trycatch";
import { TRPCError } from "@trpc/server";

export const aksesFotoRouter = createTRPCRouter({
  createPresignedUrl: studioManagerProcedure
  .input(
      z.object({
        bookingId: z.string(),
      })
    )
  .mutation(async ({ ctx, input }) => {
    console.log("ctx.session.id", ctx.session);


    // get booking id
    const booking = await ctx.prisma.booking.findUnique({
      where: {
        id: input.bookingId,
      },
    });

    if (!booking) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Booking tidak ditemukan",
      });
    }


    const gambarRow = await ctx.prisma.fotoUser.create({
      data: {
        user: {
          connect: {
            id: booking.userId,
          },
        },
        booking: {
          connect: {
            id: input.bookingId,
          },
        },
      },
    });


    // update booking with foto user
    const bookingWithFotoUser = await ctx.prisma.booking.update({
      where: {
        id: input.bookingId,
      },
      data: {
        fotoUser: {
          connect : {
            id : gambarRow.id
          }
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
    const images = await ctx.prisma.fotoUser.findMany({
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

    getFotoByUser : userProcedure.query(async ({ ctx }) => {
      const images = await ctx.prisma.fotoUser.findMany({
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

    })
});
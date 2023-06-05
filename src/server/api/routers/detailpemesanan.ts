import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  userProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const detailPemesananRouter = createTRPCRouter({ 
  getAllPemesanan: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.booking.findMany({
      include :{
        user: true,
        katalog: true,
      }
    });
  }),

  getPemesananById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.booking.findUnique({
        where: {
          id: input.id,
        },
        include :{
          user: true,
          katalog: true,
        }
      });
    }),

    getAllPemesananByUserId: userProcedure
    .query(async ({ ctx }) => {
      const userId = ctx.session.id; // Assuming `id` is the field that uniquely identifies a user

    // Check if the user exists
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('User not found'); // You can handle this error according to your needs
    }

    // Create the feedback record and connect it to the user
    try {
        const data = await ctx.prisma.booking.findMany({
          where: {
            userId: userId,
          },
        });
      } catch (e) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Tidak bisa akses database" });
      }

    }),

});
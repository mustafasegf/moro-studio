import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const detailPemesananRouter = createTRPCRouter({ 
  getAllPemesananan: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.booking.findMany();
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
      });
    }),

});

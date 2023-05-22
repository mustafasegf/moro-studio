import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, studioManagerProcedure } from "~/server/api/trpc";
import { addPembayaranSchema } from "~/utils/schemas";

export const pembayaranRouter = createTRPCRouter({
  addPembayaran: studioManagerProcedure
    .input(addPembayaranSchema)
    .mutation(async ({ input, ctx }) => {
      let pembayaran = await ctx.prisma.pembayaran.findFirst({
        where: {
          dp: input.dp,
          booking: { id: input.booking },
        },
      });

      if (pembayaran) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Pembayaran sudah ada",
        });
      }

      pembayaran = await ctx.prisma.pembayaran.create({
        data: {
          dp: input.dp,
          jumlah: input.jumlah,
          booking: {
            connect: { id: input.booking },
          },
        },
      });
    }),
});

import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const kuponRouter = createTRPCRouter({
  addKupon: publicProcedure
    .input(
      z.object({
        nama: z.string(),
        kode: z.string(),
        diskon: z.number(),
        kuotaPemakaian: z.number(),
        tanggal: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const existingKupon = await ctx.prisma.kupon.findFirst({
        where: {
          kode: input.kode,
        },
      });
      const existingNamaKupon =  await ctx.prisma.kupon.findFirst({
        where: {
          nama: input.nama,
        },
      });

      if (existingKupon) {
        throw new Error("Kode kupon telah ada");
      }
      if (existingNamaKupon) {
        throw new Error("Nama kupon telah ada");
      }

      return ctx.prisma.kupon.create({
        data: {
          nama: input.nama,
          kode: input.kode,
          diskon: input.diskon,
          kuotaPemakaian: input.kuotaPemakaian,
          kuotaTerpakai: 0,
          tanggal: input.tanggal,
        },
      });
    }),

  getAllKupon: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.kupon.findMany();
  }),

  getKuponById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.kupon.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  updateKupon: publicProcedure
    .input(
      z.object({
        id: z.string(),
        nama: z.string(),
        kode: z.string(),
        diskon: z.number(),
        kuotaPemakaian: z.number(),
        tanggal: z.date(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.kupon.update({
        where: {
          id: input.id,
        },
        data: {
          nama: input.nama,
          kode: input.kode,
          diskon: input.diskon,
          kuotaPemakaian: input.kuotaPemakaian,
          kuotaTerpakai: 0,
          tanggal: input.tanggal,
        },
      });
    }),

  deleteKupon: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.kupon.delete({
        where: {
          id: input.id,
        },
      });
    }),
});

import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const catalogueRouter = createTRPCRouter({
  addCatalogue: publicProcedure
    .input(
      z.object({
        nama: z.string(),
        durasi: z.string(),
        harga: z.number(),
        deskripsi: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.katalog.create({
        data: {
          nama: input.nama,
          durasi: input.durasi,
          harga: input.harga,
          deskripsi: input.deskripsi,
        },
      });
    }),

    getAllCatalogue: publicProcedure.query(({ ctx }) => {
      return ctx.prisma.katalog.findMany();
    }),

    getCatalogueById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.katalog.findUnique({
        where: {
          id : input.id,
        }
      });
    }),

    updateCatalogue: publicProcedure
    .input(
      z.object({
        id: z.string(),
        nama: z.string(),
        durasi: z.string(),
        harga: z.number(),
        deskripsi: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.katalog.update({
        where: {
          id: input.id,
        },
        data: {
          nama: input.nama,
          durasi: input.durasi,
          harga: input.harga,
          deskripsi: input.deskripsi,
        },
      });
    }),

    deleteCatalogue: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.katalog.delete({
        where: {
          id: input.id,
        },
      });
    })
});

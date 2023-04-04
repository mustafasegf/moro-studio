import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";
import { addCatalogueSchema, updateCatalogueSchema } from "~/utils/schemas";

export const catalogueRouter = createTRPCRouter({
  addCatalogue: publicProcedure
    .input(addCatalogueSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.katalog.create({
        data: {
          nama: input.nama,
          durasi: input.durasi,
          jumlahOrang: input.jumlahOrang,
          harga: input.harga,
          deskripsi: input.deskripsi,
        },
      });
    }),

  getAllCatalogue: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.katalog.findMany({
      where: {
        deleted: false,
      },
    });
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
          id: input.id,
        },
      });
    }),

  updateCatalogue: publicProcedure
    .input(updateCatalogueSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.katalog.update({
        where: {
          id: input.id,
        },
        data: {
          nama: input.nama,
          durasi: input.durasi,
          jumlahOrang: input.jumlahOrang,
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
    }),
});

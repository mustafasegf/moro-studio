import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const aksesFotoRouter = createTRPCRouter({
  // addFoto: publicProcedure
  //   .input(
  //     z.object({
  //       gambar: z.string(),
  //     })
  //   )
  //   .mutation(({ input, ctx }) => {
  //     return ctx.prisma.fotoUser.create({
  //       data: {
  //         gambar: input.gambar,
  //       },
  //     });
  //   }),
  
  getAllFoto: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.fotoUser.findMany();
  }),

  getFotoById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.fotoUser.findUnique({
        where: {
          id : input.id,
        }
      });
    }),

  deleteFoto: publicProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(({ input, ctx }) => {
    return ctx.prisma.fotoUser.delete({
      where: {
        id: input.id,
      },
    });
  }),
});

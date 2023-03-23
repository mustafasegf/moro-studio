import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const contohRouter = createTRPCRouter({
  addContoh: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.contoh.create({
        data: {
          email: input.email,
        },
      });
    }),
  
  getAllContoh: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.contoh.findMany();
  }),

  
});

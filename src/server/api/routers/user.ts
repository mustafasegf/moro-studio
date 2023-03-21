import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  addUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        nama: z.string(),
        hp: z.string(),
        role: z.enum(["admin", "studioManager", "blogManager", "user"]),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.create({
        data: {
          email: input.email,
          nama: input.nama,
          hp: input.hp,
          role: input.role,
        },
      });
    }),

    deleteUser: publicProcedure
    .input(z.object({
      id: z.string()
    }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.delete({
        where: {
          id: input.id
        }
      })
    }),

  getAllUser: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
});

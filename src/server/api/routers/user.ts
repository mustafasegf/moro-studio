import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure
} from "~/server/api/trpc";
import { addUserSchema } from "~/utils/schemas";


export const userRouter = createTRPCRouter({
  addUser: adminProcedure
    .input(
      addUserSchema
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

    deleteUser: adminProcedure
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

  getAllUser: adminProcedure.query( async ({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
});

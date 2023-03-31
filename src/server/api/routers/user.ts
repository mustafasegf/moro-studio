import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  adminProcedure,
} from "~/server/api/trpc";
import { addUserSchema } from "~/utils/schemas";

export const userRouter = createTRPCRouter({
  addUser: adminProcedure.input(addUserSchema).mutation(async ({ input, ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        email: input.email,
        deleted: false,
      }
    })

    if (user) {
      throw new TRPCError({code: "BAD_REQUEST", message: "Email sudah terdaftar"})
    }

    return ctx.prisma.user.create({
      data: {
        email: input.email,
        nama: input.nama,
        hp: input.hp || undefined,
        role: input.role,
      },
    });
  }),

  deleteUser: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.delete({
        where: {
          id: input.id,
        },
      });
    }),

  getAllUser: adminProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findMany({
      where: {
        deleted: false,
      },
    });
  }),
});

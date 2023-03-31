import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, adminProcedure } from "~/server/api/trpc";
import { roles } from "~/utils/roles";
import { addUserSchema } from "~/utils/schemas";

export const userRouter = createTRPCRouter({
  addUser: adminProcedure
    .input(addUserSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          email: input.email,
          deleted: false,
        },
      });

      if (user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email sudah terdaftar",
        });
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

  getAllUser: adminProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        page: z.number().nullish(),
        role: z.enum(roles).optional(),
        search: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 100;
      const { page } = input;

      const users = await ctx.prisma.user.findMany({
        take: limit + 1,
        skip: page ? (page - 1) * limit : 0,
        where: {
          deleted: false,
          role: input.role,
          OR: [
            {
              nama: {
                contains: input.search,
                mode: 'insensitive',
              },
            },
            {
              email: {
                contains: input.search,
                mode: 'insensitive',
              },
            },
            {
              instagram: {
                contains: input.search,
                mode: 'insensitive',
              },
            },
            {
              hp: {
                contains: input.search,
                mode: 'insensitive',
              },
            },
          ],
        },
        orderBy: {
          id: "desc",
        },
      });

      const userCount = await ctx.prisma.user.count({
        where: { deleted: false },
      });
      const maxPage = Math.ceil(userCount / limit);
      let hasNextPage = false;
      if (users.length > limit) {
        hasNextPage = true;
        users.pop();
      }

      return {
        users,
        hasNextPage,
        maxPage,
      };
    }),
});

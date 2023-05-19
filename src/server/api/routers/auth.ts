import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { sendEmail } from "~/utils/sendemail";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          email: input.email,
          deleted: false,
        },
      });

      if (!user) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      }

      sendEmail(input.email, ctx.transport);
    }),

  // token : publicProcedure.query(async ({ctx}) => {
  //   // get user by email
  //   const user = await ctx.prisma.user.findUnique({
  //     where: {
  //       email: "user@example.com",
  //     },
  //   });
  //   if (!user) {
  //     throw new Error("User not found");
  //   }
  //   const payload = { id: user.id, nama: user.nama, role: user.role };
  //   const token = sign(payload, env.NEXTAUTH_SECRET, {});
  //   return token
  // })
});


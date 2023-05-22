import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

import { addPertanyaanFeedbackSchema} from "~/utils/schemas"

export const pertanyaanFeedbackRouter = createTRPCRouter({
  addPertanyaanFeedback: publicProcedure
    .input(addPertanyaanFeedbackSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const data = await ctx.prisma.feedbackQuestion.create({
          data: {
            pertanyaan: input.pertanyaan,
          },
        });
      } catch (e) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Tidak bisa akses database" });
      }

    }),
  
  getAllPertanyaanFeedback: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.feedbackQuestion.findMany();
  }),

  deletePertanyaanFeedback: publicProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(({ input, ctx }) => {
    return ctx.prisma.feedbackQuestion.delete({
      where: {
        id: input.id,
      },
    });
  }),
});

import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const feedbackRouter = createTRPCRouter({
  addFeedback: publicProcedure
    .input(
      z.object({
        namaPenulis: z.string(),
        isiFeedback: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.feedback.create({
        data: {
          namaPenulis: input.namaPenulis,
          isiFeedback: input.isiFeedback,
        },
      });
    }),
  
  getAllFeedback: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.feedback.findMany();
  }),

  getFeedbackById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.feedback.findUnique({
        where: {
          id : input.id,
        }
      });
    }),

  deleteFeedback: publicProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(({ input, ctx }) => {
    return ctx.prisma.feedback.delete({
      where: {
        id: input.id,
      },
    });
  }),

  updateFeedback: publicProcedure
    .input(
      z.object({
        id: z.string(),
        namaPenulis: z.string(),
        isiFeedback: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.feedback.update({
        where: {
          id: input.id,
        },
        data: {
          namaPenulis: input.namaPenulis,
          isiFeedback: input.isiFeedback,
        },
      });
    }),
});

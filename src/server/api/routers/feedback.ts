import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
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
        Id: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.feedback.findUnique({
        where: {
          Id : input.Id,
        }
      });
    }),

  deleteFeedback: publicProcedure
  .input(
    z.object({
      Id: z.string(),
    })
  )
  .mutation(({ input, ctx }) => {
    return ctx.prisma.feedback.delete({
      where: {
        Id: input.Id,
      },
    });
  }),

  updateFeedback: publicProcedure
    .input(
      z.object({
        Id: z.string(),
        namaPenulis: z.string(),
        isiFeedback: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.feedback.update({
        where: {
          Id: input.Id,
        },
        data: {
          namaPenulis: input.namaPenulis,
          isiFeedback: input.isiFeedback,
        },
      });
    }),
});

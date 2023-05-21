import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  userProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const feedbackRouter = createTRPCRouter({
  addFeedback: userProcedure
    .input(
      z.object({
        namaPenulis: z.string(),
        isiFeedback: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.feedback.create({
        data: {
          user: {
            connect: {
              id: ctx.session.id,
            },
          },
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
          isiFeedback: input.isiFeedback,
        },
      });
    }),
});

import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const chatRouter = createTRPCRouter({
  getChatRooms: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.chatRoom.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        chat: true,
      },
    });
  }),

  getChatRoom: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.chatRoom.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  createChatRoom: publicProcedure.mutation(({ ctx }) => {
    return ctx.prisma.chatRoom.create({
      data: {},
    });
  }),

  getLatestChatRoom: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.chatRoom.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        chat: true,
      },
    });
  }),

  getChats: publicProcedure
    .input(
      z.object({
        chatRoomId: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.chat.findMany({
        where: {
          chatRoomId: input.chatRoomId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  createChat: publicProcedure
    .input(
      z.object({
        chatRoomId: z.string(),
        chat: z.string(),
        staffSend: z.boolean(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.chat.create({
        data: {
          chatRoomId: input.chatRoomId,
          chat: input.chat,
          staffSend: input.staffSend,
        },
      });
    }),
});

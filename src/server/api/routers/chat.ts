import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const chatRouter = createTRPCRouter({

  getChatRooms: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.chatRoom.findMany({
      orderBy: {
        createdAt: "desc",
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
    }
  ),

  createChatRoom: publicProcedure
    .input(
      z.object({
        adminId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.chatRoom.create({
        data: {
          adminId: input.adminId,
          userId: input.userId,
        },
      });
    }
  ),

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
    }
  ),

  createChat: publicProcedure
    .input(
      z.object({
        chatRoomId: z.string(),
        chat: z.string(),
        adminSend: z.boolean(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.chat.create({
        data: {
          chatRoomId: input.chatRoomId,
          chat: input.chat,
          adminSend: input.adminSend,
        },
      });
    }
  ),

  updateChatRoom: publicProcedure
    
    .input(
      z.object({
        id: z.string(),
        adminId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.chatRoom.update({
        where: {
          id: input.id,
        },
        data: {
          adminId: input.adminId,
          userId: input.userId,
        },
      });
    }
  ),
});

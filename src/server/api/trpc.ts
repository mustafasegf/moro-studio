import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";

import { prisma } from "~/server/db";
import { email } from "~/server/nodemailer";
import { tryCatch } from "~/utils/trycatch";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { User } from "@prisma/client";
import { z } from "zod";
import { decode } from "jsonwebtoken";

const sessionSchema = z.object({
  id: z.string(),
  nama: z.string(),
  role: z.enum(["admin", "studioManager", "blogManager", "user"]),
});

type Session = z.infer<typeof sessionSchema>;

type CreateContextOptions = {
  session: Session | null;
};

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
    email,
  };
};

function getServerAuthSession({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const parsedCookies = parseCookies({ req });
  const token = parsedCookies["token"];
  if (!token) {
    return null;
  }

  let decoded = decode(token);
  if (!decoded) {
    return null;
  }

  const [err, data] = tryCatch(sessionSchema.parse, decoded);
  if (err) {
    return null;
  }
  return data;
}

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  const session = await getServerAuthSession({ req, res });

  return createInnerTRPCContext({
    session,
  });
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: { ...ctx.session },
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);

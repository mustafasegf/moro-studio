import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";

import { prisma } from "~/server/db";
import { transport } from "~/server/nodemailer";
import { tryCatch } from "~/utils/trycatch";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";
import { decode } from "jsonwebtoken";

const sessionSchema = z.object({
  id: z.string(),
  nama: z.string(),
  role: z.enum(["admin", "studioManager", "blogManager", "user"]),
});

export type Session = z.infer<typeof sessionSchema>;

type CreateContextOptions = {
  session: Session | null;
};

export const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
    transport,
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
  const session = getServerAuthSession({ req, res });

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

function enforceUserIsAuthed(
  role: "admin" | "studioManager" | "blogManager" | "user"
) {

  return t.middleware(({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    if (ctx.session.role !== role && ctx.session.role !== "admin") {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return next({
      ctx: {
        session: { ...ctx.session },
      },
    });
  });
}

export const publicProcedure = t.procedure;
export const userProcedure = t.procedure.use(enforceUserIsAuthed("user"));
export const studioManagerProcedure = t.procedure.use(enforceUserIsAuthed("studioManager"));
export const blogManagerProcedure = t.procedure.use(enforceUserIsAuthed("blogManager"));
export const adminProcedure = t.procedure.use(enforceUserIsAuthed("admin"));

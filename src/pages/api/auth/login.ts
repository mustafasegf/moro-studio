import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { verify, decode, sign } from "jsonwebtoken";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import { setCookie } from "nookies";
import { tryCatch, tryToCatch } from "~/utils/trycatch"
import {logger} from "~/utils/logger"

const schema = z.object({
  token: z.string(),
});

const jwtSchema = z.object({
  email: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  logger.info("login")
  const [parseErr, data] = tryCatch(schema.parse, req.query);
  if (parseErr) {
    logger.error(parseErr)
    return res.redirect(`/error?data=${encodeURI("Link login bermasalah, silahkan coba lagi")}`);

  }
  if (!data) {
     logger.error("login error: no data") 
    return res.redirect(`/error?data=${encodeURI("Link login bermasalah, silahkan coba lagi")}`);
  }

  let [verifyErr] = tryCatch(verify, data.token, env.NEXTAUTH_SECRET);

  if (verifyErr) {
    logger.error(verifyErr)
    return res.redirect(`/error?data=${encodeURI("Link login kadaluarasa, silahkan coba lagi")}`);
  }

  let decoded = decode(data.token);
  if (!decoded) {
    logger.error("login error: no decoded")
    return res.redirect(`/error?data=${encodeURI("Link login bermasalah, silahkan coba lagi")}`);
  }
  const [jwtParseErr, jwtPayload] = tryCatch(jwtSchema.parse, decoded);
  if (jwtParseErr) {
    logger.error(jwtParseErr)
    return res.redirect(`/error?data=${encodeURI("Link login bermasalah, silahkan coba lagi")}`);
  }
  if (!jwtPayload) {
    logger.error("login error: no data")
    return res.redirect(`/error?data=${encodeURI("Link login bermasalah, silahkan coba lagi")}`);
  }

  const [errPrisma, user] = await tryToCatch(prisma.user.findFirst, {
    where: {
      email: jwtPayload.email,
      deleted: false,
    },
  });

  if (errPrisma) {
    logger.error(errPrisma.message)
    return res.redirect(`/error?data=${encodeURI("Database be bermasalah, silahkan coba lagi")}`);
    
  }
  if (!user) {
    logger.error("login error: user not found")
    return res.redirect(`/error?data=${encodeURI("User tidak ditemukan, silahkan coba lagi")}`);
  }

  const payload = { id: user.id, nama: user.nama, role: user.role };
  const token = sign(payload, env.NEXTAUTH_SECRET, {});

  setCookie({ res }, "token", token, {
    secure: env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 365 * 24 * 60 * 60,
    path: "/"
  });

  return res.redirect("/");
}

import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { verify, decode, sign } from "jsonwebtoken";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import { setCookie } from "nookies";
import { tryCatch, tryToCatch } from "~/utils/trycatch"

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
  const [parseErr, data] = tryCatch(schema.parse, req.query);
  if (parseErr) {
    // return res.redirect(`/error?data=${encodeURI(parseErr.message)}`);
    return res.redirect(`/error?data=${encodeURI("Link login bermasalah, silahkan coba lagi")}`);

  }
  if (!data) {
    return res.redirect(`/error?data=${encodeURI("Link login bermasalah, silahkan coba lagi")}`);
  }

  let [err] = tryCatch(verify, data.token, env.NEXTAUTH_SECRET);

  if (err) {
    // return res.redirect(`/error?data=${encodeURI(err.message)}`);
    return res.redirect(`/error?data=${encodeURI("Link login kadaluarasa, silahkan coba lagi")}`);
  }

  let decoded = decode(data.token);
  if (!decoded) {
    // return res.redirect(`/error?data=${encodeURI("No decoded")}`);
    return res.redirect(`/error?data=${encodeURI("Link login bermasalah, silahkan coba lagi")}`);
  }
  const [jwtParseErr, jwtPayload] = tryCatch(jwtSchema.parse, decoded);
  if (jwtParseErr) {
    // return res.redirect(`/error?data=${encodeURI(jwtParseErr.message)}`);
    return res.redirect(`/error?data=${encodeURI("Link login bermasalah, silahkan coba lagi")}`);
  }
  if (!jwtPayload) {
    // return res.redirect(`/error?data=${encodeURI("No data")}`);
    return res.redirect(`/error?data=${encodeURI("Link login bermasalah, silahkan coba lagi")}`);
  }

  const [errPrisma, user] = await tryToCatch(prisma.user.findUnique, {
    where: {
      email: jwtPayload.email,
    },
  });
  if (errPrisma) {
    // return res.redirect(`/error?data=${encodeURI(errPrisma.message)}`);
    return res.redirect(`/error?data=${encodeURI("Database be bermasalah, silahkan coba lagi")}`);
  }
  if (!user) {
    // return res.redirect(`/error?data=${encodeURI("No User")}`);
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

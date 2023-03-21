import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { verify, decode, sign } from "jsonwebtoken";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import tryToCatch from "try-to-catch";
import { setCookie } from "nookies";
import { tryCatch } from "~/utils/trycatch"

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
    return res.redirect(`/error?data=${encodeURI(parseErr.message)}`);
  }
  if (!data) {
    return res.redirect(`/error?data=${encodeURI("No data")}`);
  }

  let [err] = tryCatch(verify, data.token, env.NEXTAUTH_SECRET);

  if (err) {
    return res.redirect(`/error?data=${encodeURI(err.message)}`);
  }

  let decoded = decode(data.token);
  if (!decoded) {
    return res.redirect(`/error?data=${encodeURI("No decoded")}`);
  }
  const [jwtParseErr, jwtPayload] = tryCatch(jwtSchema.parse, decoded);
  if (jwtParseErr) {
    return res.redirect(`/error?data=${encodeURI(jwtParseErr.message)}`);
  }
  if (!jwtPayload) {
    return res.redirect(`/error?data=${encodeURI("No data")}`);
  }

  const [errPrisma, user] = await tryToCatch(prisma.user.findUnique, {
    where: {
      email: jwtPayload.email,
    },
  });
  if (errPrisma) {
    return res.redirect(`/error?data=${encodeURI(errPrisma.message)}`);
  }
  if (!user) {
    return res.redirect(`/error?data=${encodeURI("No User")}`);
  }

  const payload = { id: user.id, nama: user.nama, role: user.role };
  const token = sign(payload, env.NEXTAUTH_SECRET, {});

  setCookie({ res }, "token", token, {
    path: "/"
  });

  return res.redirect("/");
  // return res.status(200).json({ data: "ok" });
}

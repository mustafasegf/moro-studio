import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { verify, decode, sign } from "jsonwebtoken";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import { destroyCookie, setCookie } from "nookies";
import { tryCatch, tryToCatch } from "~/utils/trycatch"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  destroyCookie({ res }, "token", {
    secure: env.NODE_ENV === "production",
    httpOnly: true,
    path: "/"
  });

  return res.redirect("/");

}
import { NextApiRequest, NextApiResponse } from "next";

import { env } from "~/env.mjs";
import { destroyCookie, setCookie } from "nookies";

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

import nodemailer from "nodemailer";
import { env } from "~/env.mjs";
export const transport = nodemailer.createTransport(env.EMAIL_SERVER);


import nodemailer from "nodemailer";
import { env } from "~/env.mjs";
export const email = nodemailer.createTransport(env.EMAIL_SERVER);

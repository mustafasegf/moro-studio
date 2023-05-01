import { sign } from "jsonwebtoken";
import { Transporter } from "nodemailer";
import { env } from "~/env.mjs";

export async function sendEmail(email: string, transport: Transporter) {
  const payload = { email };
  const token = sign(payload, env.NEXTAUTH_SECRET, {
    expiresIn: "1d",
  });

  const emailPayload = {
    url: `${env.NEXTAUTH_URL}/api/auth/login?token=${token}`,
    email,
    host: env.NEXTAUTH_URL,
  };

  return await transport.sendMail({
    from: `MoroStudio <${env.EMAIL_FROM}>`,
    to: email,
    subject: `Sign in to ${env.NEXTAUTH_URL}`,
    html: html(emailPayload),
    text: text(emailPayload),
  });
}

function text({ url, host }: Record<"url" | "host", string>) {
  return `Sign in to ${host}\n${url}\n\n`;
}

function html({ url, email, host }: Record<"url" | "host" | "email", string>) {
  const escapedEmail = email.replace(/\./g, "&#8203;.");
  const escapedHost = host.replace(/\./g, "&#8203;.");

  const backgroundColor = "#f9f9f9";
  const textColor = "#444444";
  const mainBackgroundColor = "#ffffff";
  const buttonBackgroundColor = "#346df1";
  const buttonBorderColor = "#346df1";
  const buttonTextColor = "#ffffff";

  return `
  <body style="background: ${backgroundColor};">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
          <strong>${escapedHost}</strong>
        </td>
      </tr>
    </table>
    <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
      <tr>
        <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
          Sign in as <strong>${escapedEmail}</strong>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${buttonBackgroundColor}"><a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">Sign in</a></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
          If you did not request this email you can safely ignore it.
        </td>
      </tr>
    </table>
  </body>
  `;
}

import S3 from "aws-sdk/clients/s3";
import { env } from "~/env.mjs";

export const s3 = new S3({
  apiVersion: "2006-03-01",
  region: env.AWS_REGION,
});

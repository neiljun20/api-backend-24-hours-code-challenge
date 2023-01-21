import { config } from "dotenv";
config();

export const {
  PORT,
  DB_HOST,
  SECRET_KEY,
  SENDGRID_API_KEY,
  SENDGRID_EMAIL
} = process.env;
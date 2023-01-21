import { config } from "dotenv";
config();

export const {
  PORT,
  DB_HOST,
  SECRET_KEY,
  SENDGRID_API_KEY,
  SENDGRID_EMAIL,
  PEXEL_API_KEY,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_NAME
} = process.env;
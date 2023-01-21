import { config } from "dotenv";
config();

export const { PORT, DB_HOST, SECRET_KEY } = process.env;
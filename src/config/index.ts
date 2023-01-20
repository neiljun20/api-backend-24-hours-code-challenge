import { config } from "dotenv";
config();

export const { PORT, DB_HOST } = process.env;
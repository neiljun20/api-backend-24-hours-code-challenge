import mongoose from "mongoose";
import { DB_HOST } from "../config";

const connectDB = async () => {
  try{
    mongoose.set("strictQuery", false);
    await mongoose.connect(String(DB_HOST));
    console.log("DB connected");
  } catch(error){
    console.error("Can't connect to DB", error);
    process.exit(1);
  }
};

export default connectDB;
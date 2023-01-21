import express, {Express} from "express";
import cookieParser from 'cookie-parser';
import router from "./routes/index";

export default class App{
  
  private server:Express;

  constructor(){
    this.server = express();
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(cookieParser());
  }

  public build = () => {
    this.server.use(router);
    return this.server;
  };
  
}
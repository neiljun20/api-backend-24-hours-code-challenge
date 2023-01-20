import express, {Express} from "express";
import router from "./routes/index";

export default class App{
  
  private server:Express;

  constructor(){
    this.server = express();
    this.server.use(express.json());
  }

  public build = () => {
    this.server.use(router);
    return this.server;
  };
  
}
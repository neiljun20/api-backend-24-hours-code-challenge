import express, {Express, Request, Response} from "express";
import router from "./routes/index";

export default class App{
  
  private server:Express;

  constructor(){
    this.server = express();
  }

  public build = () => {
    this.server.use(router);
    return this.server;
  };
  
}
import express, {Express, Request, Response} from "express";

export default class App{
  
  private server:Express;

  constructor(){
    this.server = express();
  }

  public build = () => {
  	this.server.get("/healthcheck", (req:Request, res:Response) => {
  		res.send({
  			"status": "ok"
  		});
  	});

  	return this.server;
  }
}
import express, {Express} from "express";
import cookieParser from "cookie-parser";
import router from "./routes/index";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

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

    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.server.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
  
    return this.server;
  };
  
}
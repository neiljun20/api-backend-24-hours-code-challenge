import { Router } from "express";
import UsersController from "../controllers/user.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import { createUserSchema } from "../schemas/user.schema";
import { Routes } from '../interfaces/routes.interface';

class UserRoutes implements Routes {
  public router = Router();
  public path = "/users";
  private usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, validationMiddleware(createUserSchema), this.usersController.createUser);
  }
}

export default UserRoutes;

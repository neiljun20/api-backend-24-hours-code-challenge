import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import authMiddleware from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
import AuthController from "../controllers/auth.controller";
import { loginUserSchema, signUpUserSchema, forgotPasswordSchema } from "../schemas/auth.schema";

class AuthRoute implements Routes {
  public path = "/";
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, validationMiddleware(signUpUserSchema), this.authController.signUp);
    this.router.post(`${this.path}login`, validationMiddleware(loginUserSchema), this.authController.logIn);
    this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
    this.router.post(`${this.path}forgotPassword`, validationMiddleware(forgotPasswordSchema), this.authController.forgotPassword);
  }
}

export default AuthRoute;

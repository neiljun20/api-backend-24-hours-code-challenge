import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import authMiddleware from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
import ImageController from "../controllers/image.controller";
import { loginUserSchema, signUpUserSchema, forgotPasswordSchema, resetPasswordSchema } from "../schemas/auth.schema";

class ImageRoute implements Routes {
  public path = "/images";
  public router = Router();
  public imageController = new ImageController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.imageController.images);
    this.router.get(`${this.path}/:id`, authMiddleware, this.imageController.imagesId);
    this.router.patch(`${this.path}/:id`, authMiddleware, this.imageController.update);
    this.router.post(`${this.path}`, authMiddleware, this.imageController.create);
  }
}

export default ImageRoute;

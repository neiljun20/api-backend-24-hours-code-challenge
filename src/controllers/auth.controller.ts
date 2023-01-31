import { NextFunction, Request, Response } from "express";
import { User } from "../interfaces/user.interface";
import AuthService from "../services/auth.service";

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData:User = req.body;
      userData.role = "user";
      userData.passwordResetToken = "";
      
      const signUpUserData:User = await this.authService.signUp(userData);

      res.status(201).json({ data: signUpUserData, message: "signup" });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData:User = req.body;
      const { cookie, findUser } = await this.authService.login(userData);

      res.setHeader("Set-Cookie", [cookie]);
      res.status(201).json({ data: findUser, message: "login" });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req:any, res: Response, next: NextFunction) => {
    try {
      const userData:User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader("Set-Cookie", ["Authorization=; Max-age=0"]);
      res.status(201).json({ data: logOutUserData, message: "logout" });
    } catch (error) {
      next(error);
    }
  };

  public forgotPassword = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const userData:User = req.body;
      const forgotPasswordUserData: User = await this.authService.forgotPassword(userData);

      res.status(201).json({ data: forgotPasswordUserData, message: "forgotPassword" });
    } catch (error) {
      next(error);
    }
  };

  public resetPassword = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const userData:User = req.body;
      const resetPasswordUserData: User = await this.authService.resetPassword(userData);

      res.status(201).json({ data: resetPasswordUserData, message: "resetPassword" });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;

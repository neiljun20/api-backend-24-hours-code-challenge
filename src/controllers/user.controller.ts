import { NextFunction, Request, Response } from "express";
import { User } from "../interfaces/user.interface";
import userService from "../services/user.service";

class UsersController {
  public userService = new userService();

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

      req.body['role'] = "user";
      const createUserData = await this.userService.createUser(req.body);
      if(createUserData.error){
        res.status(409).json({  message: createUserData.error });
      }
      res.status(201).json({ data: createUserData, message: "created" });

    } catch (error) {
      next(error);
    }
  };

}

export default UsersController;

import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { DataStoredInToken } from "../interfaces/auth.interface";
import userModel from "../models/user.model";

const authMiddleware = async (req:any, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies["Authorization"] || (req.header("Authorization") ? req.header("Authorization").split("Bearer ")[1] : null);

    if (Authorization) {
      const secretKey = String(SECRET_KEY);
      const verificationResponse = (await verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse._id;
      const findUser = await userModel.findById(userId);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new Error("Wrong authentication token"));
      }
    } else {
      next(new Error("Authentication token missing"));
    }
  } catch (error) {
    next(new Error("Wrong authentication token"));
  }
};

export default authMiddleware;

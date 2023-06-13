import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { User } from "../models/User.mode";
import { IUser } from "../types/user.type";

class UserMiddleware {
  public findAndTrow(field: keyof IUser) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const user = await User.findOne({ [field]: req.body[field] });
        if (user) {
          throw new ApiError("User with this email is already exist", 409);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public isUserExist<T>(field: keyof T) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const user = await User.findOne({ [field]: req.body[field] });
        if (!user) {
          throw new ApiError("User not found", 422);
        }
        res.locals.user = user;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const userMiddleware = new UserMiddleware();

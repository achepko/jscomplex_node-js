import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { userService } from "../services/user.service";
import { IUser } from "../types/user.type";
import {userMapper} from "../mappers/user.mapper";

class UserController {
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.findAll();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
  public async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const user = await userService.findById(req.params.userId);

      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
  public async updateById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const updatedUser = await userService.updateById(
        req.params.userId,
        req.body as IUser
      );
      return res.status(200).json(updatedUser);
    } catch (e) {
      next(e);
    }
  }
  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      await userService.deleteById(req.params.userId);
      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async uploadAvatar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { userId } = req.params;
      const avatar = req.files.avatar as UploadedFile;

      const user = await userService.uploadAvatar(userId, avatar);

      const response = userMapper.toResponse(user);

      return res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
  public async deleteAvatar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      await userService.deleteById(req.params.userId);
      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();

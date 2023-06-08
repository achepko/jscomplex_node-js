import { ApiError } from "../errors";
import { User } from "../models/User.mode";
import { userRepository } from "../repositories/user.repository";
import { IUser } from "../types/user.type";

class UserService {
  public async findAll(): Promise<IUser[]> {
    try {
      return User.find().select("-password");
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(data: IUser): Promise<IUser> {
    try {
      return userRepository.create(data);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async findById(id: string): Promise<IUser> {
    try {
      return User.findById(id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async updateById(id: string, data: IUser): Promise<IUser> {
    return userRepository.create(data);
  }
}

export const userService = new UserService();

import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { User } from "./models/User.mode";
import { IUser } from "./types/user.type";

const users = [
  {
    name: "Oleh",
    age: 20,
    gender: "male",
  },
  {
    name: "Anton",
    age: 10,
    gender: "male",
  },
  {
    name: "Inokentiy",
    age: 25,
    gender: "female",
  },
  {
    name: "Anastasiya",
    age: 15,
    gender: "female",
  },
  {
    name: "Cocos",
    age: 25,
    gender: "other",
  },
];

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
);

app.get(
  "/users/:id",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const user = await User.findById(req.params.id);

      return res.json(user);
    } catch (e) {
      console.log(e);
    }
  }
);

app.post(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const createdUser = await User.create(req.body);

      return res.status(201).json(createdUser);
    } catch (e) {
      console.log(e);
    }
  }
);

app.put(
  "/users/:id",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const { id } = req.params;
      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { returnDocument: "after" }
      );

      return res.status(200).json(updatedUser);
    } catch (e) {
      console.log(e);
    }
  }
);

app.delete(
  "/users/:id",
  async (req: Request, res: Response): Promise<Response<void>> => {
    try {
      const { id } = req.params;
      await User.deleteOne({ _id: id });

      return res.sendStatus(200);
    } catch (e) {
      console.log(e);
    }
  }
);
app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  console.log(`Server has started on PORT ${configs.PORT} 🥸`);
});

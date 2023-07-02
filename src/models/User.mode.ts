import { model, Schema } from "mongoose";

import { EGenders } from "../enums/user.enum";
import { EUserStatus } from "../enums/user-status.enum";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
      min: [1, "Minimum value for age is 1"],
      max: [199, "Maximum value for age is 199"],
    },
    gender: {
      type: String,
      enum: EGenders,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      // select: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      default: EUserStatus.NonActivated,
      enum: EUserStatus,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model("user", userSchema);

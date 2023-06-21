import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { ICredentials } from "../types/token.type";
import { IUser } from "../types/user.type";
import { UserValidator } from "../validators";
import {EActionTokenTypes} from "../enums/action.token.type-enum";

const router = Router();

router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.create),
  userMiddleware.findAndTrow("email"),
  authController.register
);
router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.login),
  userMiddleware.isUserExist<ICredentials>("email"),
  authController.login
);
router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);
router.post(
  "/forgot",
  commonMiddleware.isBodyValid(UserValidator.forgotPassword),
  userMiddleware.isUserExist<IUser>("email"),
  authController.forgotPassword
);

router.put(
  "/forgot/:token",
  commonMiddleware.isBodyValid(UserValidator.setForgotPassword),
  authMiddleware.checkActionToken(EActionTokenTypes.Forgot),
  authController.setForgotPassword
);

export const authRouter = router;

import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { ICredentials } from "../types/token.type";
import { UserValidator } from "../validators";

const router = Router();

router.post(
  "/register",
  commonMiddleware.idBodyValid(UserValidator.create),
  userMiddleware.findAndTrow("email"),
  authController.register
);
router.post(
  "/login",
  commonMiddleware.idBodyValid(UserValidator.login),
  userMiddleware.isUserExist<ICredentials>("email"),
  authController.login
);

export const authRouter = router;

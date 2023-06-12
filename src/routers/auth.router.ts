import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators";

const router = Router();

router.post(
  "/register",
  commonMiddleware.idBodyValid(UserValidator.create),
  authController.register
);

export const authRouter = router;

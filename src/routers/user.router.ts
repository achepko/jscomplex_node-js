import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators";

const router = Router();

router.get("/", userController.findAll);
router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.findById
);
router.put(
  "/:userId",
  commonMiddleware.idBodyValid(UserValidator.update),
  commonMiddleware.isIdValid("userId"),
  userController.updateById
);
router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.deleteById
);

export const userRouter = router;

import { Router } from "express";
import { signup, login, logout,shareUser } from "../controller/user.controller";
import { verifyToken } from "../middlewares/verifyToken.middleware";
const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/shareUser").get(verifyToken,shareUser);
router.route("/logout").get(verifyToken, logout);

export default router;
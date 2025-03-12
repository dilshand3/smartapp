import { Router } from "express";
import { createTodo, deleteTodo, editTodo, shareAllTodo, shareSingleTodo } from "../controller/Todo.controller";
import { verifyToken } from "../middlewares/verifyToken.middleware";
const router = Router();

router.route("/createTodo").post(verifyToken, createTodo);
router.route("/sharetodo/:Id").get(shareSingleTodo);
router.route("/edittodo/:Id").post(editTodo);
router.route("/deletetodo").post(deleteTodo);
router.route("/allTodo").get(verifyToken, shareAllTodo)

export default router;
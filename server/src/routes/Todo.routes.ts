import { Router } from "express";
import { createTodo, deleteTodo, editTodo, shareAllTodo, shareSingleTodo } from "../controller/Todo.controller";
const router = Router();

router.route("/createTodo").post(createTodo);
router.route("/sharetodo/:Id").get(shareSingleTodo);
router.route("/edittodo/:Id").post(editTodo);
router.route("/deletetodo").post(deleteTodo);
router.route("/allTodo").get(shareAllTodo)

export default router;
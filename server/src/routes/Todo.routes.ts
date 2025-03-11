import { Router } from "express";
import { createTodo, editTodo, shareSingleTodo } from "../controller/Todo.controller";
const router = Router();

router.route("/createTodo").post(createTodo);
router.route("/sharetodo/:Id").get(shareSingleTodo);
router.route("/edittodo/:Id").post(editTodo)

export default router;
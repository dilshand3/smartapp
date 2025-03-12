import { Request, Response } from "express";
import { Todo } from "../model/Todo.model";
import { AuthenticatedRequest } from "../middlewares/verifyToken.middleware";
import { User } from "../model/User.model";
interface ReqTodos {
    Title: string,
    Todos: string,
}

interface Res {
    success: boolean,
    message: string,
    data?: object
}

interface deleteTodos {
    Id: string
}

const createTodo = async (req: AuthenticatedRequest, res: Response<Res>): Promise<void> => {
    const { Title, Todos } = req.body;
    const userId = req.userId;

    if (!Title || !Todos) {
        res.status(400).json({ success: false, message: "All field required" });
        return;
    }
    const newTodo = await Todo.create({
        Title,
        Todos
    })

    if (!newTodo) {
        res.status(400).json({ success: false, message: "Todo didn't created" });
        return;
    }

    await User.findByIdAndUpdate(userId, { $push: { todos: newTodo._id } });

    res.status(200).json({
        success: true,
        message: "Todo found succesfully",
        data: newTodo
    })
}

const shareSingleTodo = async (req: Request<{ Id: string }, {}, ReqTodos>, res: Response<Res>): Promise<void> => {
    const { Id } = req.params;
    const existedTodo = await Todo.findById(Id)
    if (!existedTodo) {
        res.status(404).json({ success: false, message: "Todo didn't exist" });
        return;
    }

    res.status(200).json({
        success: true,
        message: "todo found succesfully",
        data: existedTodo
    })
}

const editTodo = async (req: Request<{ Id: string }, {}, ReqTodos>, res: Response<Res>): Promise<void> => {
    const { Id } = req.params;
    const { Title, Todos } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(Id,
        { Title, Todos },
        { new: true, runValidators: true }
    )

    if (!updatedTodo) {
        res.status(404).json({ success: false, message: "updatedTodo not found" });
        return;
    }

    res.status(200).json({
        success: true,
        message: "Todo updated succesfully",
        data: updatedTodo
    })
}

const deleteTodo = async (req: Request<deleteTodos>, res: Response<Res>): Promise<void> => {
    const { Id } = req.body;
    if (!Id) {
        res.status(400).json({ success: false, message: "Id required to delete Todo" });
        return
    }

    await Todo.findByIdAndDelete(Id);
    res.status(200).json({
        success: true,
        message: "Todo deleted succesfully"
    })
}

const shareAllTodo = async (req: AuthenticatedRequest, res: Response<Res>): Promise<void> => {
    const userId = req.userId;

    const user = await User.findById(userId).populate("todos");

    if (!user || !user.todos) {
        res.status(404).json({ success: false, message: "No todos found for this user" });
        return;
    }

    res.status(200).json({
        success: true,
        message: "Todos shared successfully",
        data: user.todos
    });
}


export { createTodo, shareSingleTodo, editTodo, deleteTodo, shareAllTodo }
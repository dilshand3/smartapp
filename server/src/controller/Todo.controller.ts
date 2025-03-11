import { Request, Response } from "express";
import { Todo } from "../model/Todo.model";

interface ReqTodos {
    Title: string,
    Todos: string,
}

interface Res {
    success: boolean,
    message: string,
    data?: object
}

const createTodo = async (req: Request<{}, {}, ReqTodos>, res: Response<Res>): Promise<void> => {
    const { Title, Todos } = req.body;
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


export { createTodo, shareSingleTodo, editTodo }
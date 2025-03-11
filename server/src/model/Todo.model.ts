import mongoose, { Schema } from "mongoose";

interface Todo {
    Title: string
    Todos: string
}

const TodoSchema = new Schema<Todo>({
    Title: {
        type: String,
        required: true
    },
    Todos: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Todo = mongoose.model("Todo", TodoSchema);
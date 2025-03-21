import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const api = import.meta.env.VITE_APIURL;

interface createTodo {
    Title: string;
    Todos: string;
}

interface createTodoResponse {
    success: boolean;
    message: string;
    data: object;
}

interface deleteTodo {
    Id: string;
}

interface deleteTodoResponse {
    success: boolean;
    message: string;
}

interface singletodoResonse {
    success: boolean;
    message: string;
    data?: {
        _id: string;
        Title: string;
        Todos: string;
    };
}

interface editTodoBody {
    Title: string;
    Todos: string;
}

export const TodoSlice = createApi({
    reducerPath: "TodoSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: api,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        createTodo: builder.mutation<createTodoResponse, createTodo>({
            query: (body) => ({
                url: "/api/createTodo",
                method: "POST",
                body: body,
            }),
        }),
        deleteTodo: builder.mutation<deleteTodoResponse, deleteTodo>({
            query: (body) => ({
                url: "/api/deletetodo",
                method: "POST",
                body: body,
            }),
        }),
        singletodos: builder.query<singletodoResonse, string>({
            query: (id) => ({
                url: `/api/sharetodo/${id}`,
                method: "GET",
            }),
        }),
        edittodos: builder.mutation<singletodoResonse, { id: string; body: editTodoBody }>({
            query: ({ id, body }) => ({
                url: `/api/edittodo/${id}`,
                method: "POST",
                body: body,
            }),
        }),
    }),
});

export const {
    useCreateTodoMutation,
    useDeleteTodoMutation,
    useLazySingletodosQuery,
    useEdittodosMutation,
} = TodoSlice;

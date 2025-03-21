import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const api = import.meta.env.VITE_APIURL;

interface AuthResponse {
    token: string;
    user: {
        id: string;
        username: string;
        email: string;
    };
}

interface LoginRequest {
    username: string;
    password: string;
}

interface SignupRequest {
    username: string;
    email: string;
    password: string;
}

export interface TodoType {
    _id: string;
    Title: string;
    Todos: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface CheckUser {
    success: boolean,
    message: string,
    data?: {
        username: string,
        email: string,
        todos: TodoType[],
        urls: [],
        _id: string,
        updatedAt: any,
        active: boolean
    }
}

export const AuthSlice = createApi({
    reducerPath: "AuthSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: api,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: "/api/login",
                method: "POST",
                body: credentials,
            }),
        }),
        signup: builder.mutation<AuthResponse, SignupRequest>({
            query: (userData) => ({
                url: "/api/signup",
                method: "POST",
                body: userData,
            }),
        }),
        checkUser: builder.query<CheckUser, void>({
            query: () => ({
                url: "/api/shareUser",
                method: "GET"
            })
        }),
        logout: builder.query<CheckUser, void>({
            query: () => ({
                url: "/api/logout",
                method: "GET"
            })
        })
    }),
});

export const { useLoginMutation, useSignupMutation, useCheckUserQuery, useLazyLogoutQuery } = AuthSlice;

import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./AuthSlice/AuthSlice";
import { UrlSlice } from "./UrlSlice/UrlSlice";
import { TodoSlice } from "./TodoSlice/TodoSlice";

export const store = configureStore({
    reducer: {
        [AuthSlice.reducerPath]: AuthSlice.reducer,
        [UrlSlice.reducerPath]: UrlSlice.reducer,
        [TodoSlice.reducerPath]: TodoSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            AuthSlice.middleware,
            UrlSlice.middleware,
            TodoSlice.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

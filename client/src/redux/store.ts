import { configureStore } from "@reduxjs/toolkit";
const test: any = "dilshan"

export const store = configureStore({
    reducer: {
        counter: test,
    },
});

// RootState & AppDispatch types export karein
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
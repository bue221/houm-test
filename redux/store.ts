import { configureStore } from "@reduxjs/toolkit";
import { api } from "services/api.service";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

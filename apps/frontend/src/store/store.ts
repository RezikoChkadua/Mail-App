import { configureStore } from "@reduxjs/toolkit";
import mailReducer from "./slices/mailSlice";
import recepientRecuder from "./slices/recipientSlice";

export const store = configureStore({
  reducer: {
    mail: mailReducer,
    recepient: recepientRecuder,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

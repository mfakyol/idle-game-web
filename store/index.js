import reduxLogger from "redux-logger";
import gameSlice from "./gameSlice";
import { configureStore } from "@reduxjs/toolkit";

const disableLogger = process.env.NODE_ENV === "production" || true;

const store = configureStore({
  reducer: {
    game: gameSlice,
  },
  devTools: process.env.NODE_ENV != "production",

  middleware: (getDefaultMiddleware) => (disableLogger ? getDefaultMiddleware() : getDefaultMiddleware().concat(reduxLogger)),
});

export default store;

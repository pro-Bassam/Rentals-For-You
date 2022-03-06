import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import toast from "./middleware/toast";

const store = configureStore({
  reducer,
  middleware: [
    ...getDefaultMiddleware(),
    logger({ distination: "console" }),
    toast,
  ],
});
export default store;

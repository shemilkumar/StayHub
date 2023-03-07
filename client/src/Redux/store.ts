import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slicers/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./Slicers/homeSlice";
import userReducer from "./Slicers/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    homes: homeReducer,
  },
});

export default store;
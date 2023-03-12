import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./Slicers/homeSlice";
import bestSellersReducer from "./Slicers/bestSellersSlice";
import userReducer from "./Slicers/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    homes: homeReducer,
    bestSellers: bestSellersReducer,
  },
});

export default store;
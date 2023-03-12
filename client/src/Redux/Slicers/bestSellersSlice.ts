import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HomeModel } from "../../Constants/modelTypes";

export interface AllBestSellersState{
  bestSellers: HomeModel[]
}

const initialState: AllBestSellersState = {
  bestSellers: []
};

const bestSellersSlice = createSlice({
  name: 'bestSellers',
  initialState,
  reducers: {
    setAllBestSellers: (state:AllBestSellersState, action: PayloadAction<HomeModel[]>) =>{
      state.bestSellers = action.payload;
    }
  }
});

export const { setAllBestSellers } = bestSellersSlice.actions;
export default bestSellersSlice.reducer;


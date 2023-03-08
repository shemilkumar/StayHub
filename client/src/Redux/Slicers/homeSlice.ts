import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HomeModel } from "../../Constants/modelTypes";

export interface AllHomeState{
  allHomes: HomeModel[]
}

const initialState: AllHomeState = {
  allHomes: []
};

const homeSlice = createSlice({
  name: 'homes',
  initialState,
  reducers: {
    setAllHomes : (state: AllHomeState, action: PayloadAction<HomeModel[]>) =>{
      state.allHomes = action.payload;
    }
  }
});

export const { setAllHomes } = homeSlice.actions;
export default homeSlice.reducer;


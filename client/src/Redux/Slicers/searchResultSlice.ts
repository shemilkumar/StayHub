import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HomeModel } from "../../Constants/modelTypes";

interface SearchResult {
  results : HomeModel[]
};

const initialState: SearchResult = {
  results : []
};

const searchResultSlice = createSlice({
  name: 'searchResult',
  initialState,
  reducers: {
    setAllSearchResult : (state: SearchResult, action: PayloadAction<HomeModel[]>) =>{
      state.results = action.payload;
    }
  }
});

export const { setAllSearchResult } = searchResultSlice.actions;
export default searchResultSlice.reducer;
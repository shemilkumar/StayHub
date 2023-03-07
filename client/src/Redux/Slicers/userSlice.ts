import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from '../../Constants/modelTypes';

export interface UserInitialState{
  value : User
}

const initialState: UserInitialState = {
  value: { 
    name : '',
    email: '',
    role: '',
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoggin : (state : UserInitialState, action : PayloadAction<User>) =>{
      state.value = action.payload;
    }
  }
});

export const {userLoggin} = userSlice.actions;

export default userSlice.reducer;
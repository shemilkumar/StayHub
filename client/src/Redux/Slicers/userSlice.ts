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
    photo: ''
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData : (state : UserInitialState, action : PayloadAction<User>) =>{
      state.value = action.payload;
    }
  }
});

export const {setUserData} = userSlice.actions;

export default userSlice.reducer;
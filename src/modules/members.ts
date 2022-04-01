import { createSlice, PayloadAction , createReducer } from "@reduxjs/toolkit";
//action type
const USERADD = "ADD" as const;

export interface IPicture {
  large: string;
  medium: string;
  thumbnail: string;
}
export interface IName {
  first: string;
  last: string;
  title: string;
}
export interface IUser {
  email: string;
  gender: string;
  name: IName;
  nat: string;
  picture: IPicture;
}



interface IState {
  user: IUser[];
  approveUser: IUser[];
}

const initialState:IState = {
  user: [],
  approveUser: []
};

export const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    addUser(state, action:PayloadAction<IUser>){
      state.approveUser.push(action.payload);

    },
    addAllUser(state, action:PayloadAction<IUser[]>){
      state.user = action.payload;
    },
    deleteUser(state,action:PayloadAction<IUser>){
      state.user = state.user.filter((v)=>v.email !==action.payload.email)
    }
  },

});


const { reducer, actions } = userSlice;
export const { addUser,addAllUser,deleteUser} = actions;
export default reducer;
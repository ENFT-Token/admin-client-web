import { createSlice, PayloadAction , createReducer } from "@reduxjs/toolkit";
//action type
//const USERADD = "ADD" as const;

//@@@@@@@ 가상 데이터 interface @@@@@@@
// export interface IPicture {
//   large: string;
//   medium: string;
//   thumbnail: string;
// }
// export interface IName {
//   first: string;
//   last: string;
//   title: string;
// }
// export interface IUser {
//   email: string;
//   gender: string;
//   name: IName;
//   nat: string;
//   picture: IPicture;
// }

export interface IUser{
  nickname : string;
  location : string;
  sex : string;
  profile : IProfile;
}
export interface IProfile{
  data:string;
  type:any;
}

export interface IApprove{
  address:string;
  requestDay:string;
  requestPlace:string;
  user:IUser;
  
}


interface IState {
  user: IApprove[];
  approvedUser: IApprove[];
}

const initialState:IState = {
  user: [],
  approvedUser: []
};

export const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    addUser(state, action:PayloadAction<IApprove>){
      state.approvedUser.push(action.payload);

    },
    addAllUser(state, action:PayloadAction<IApprove[]>){
      state.user = action.payload;
    },
    deleteUser(state,action:PayloadAction<IApprove>){
      state.user = state.user.filter((v)=>v.address !==action.payload.address)
    }
  },

});


const { reducer, actions } = userSlice;
export const { addUser,addAllUser,deleteUser} = actions;
export default reducer;
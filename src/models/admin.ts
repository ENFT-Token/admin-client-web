import { createSlice, PayloadAction, createReducer } from "@reduxjs/toolkit";


//admin : id, password, nickname, phone number, email
//company : company, address, company number, ceo

export interface IAdmin {
  access_token: string;
  address: string; 
  email: string; 
  location: string; 
  nickname:string;
  phone:string;
  place: string; 
  privateKey: string;
  status: string;
  //회원가입하고 post할 것
  //이메일
  //헬스장 주소
  //헬스장 지점명
  //nickname
}

interface IState {
  adminInfo: IAdmin | null;
}
const initialState: IState = {
  adminInfo: null ,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    addInfo(state, action: PayloadAction<IAdmin>) {
      state.adminInfo = (action.payload);
    },
  },
});

const { reducer, actions } = adminSlice;
export const { addInfo } = actions;
export default reducer;

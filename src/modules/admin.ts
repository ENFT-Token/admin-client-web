import { createSlice, PayloadAction, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

//admin : id, password, nickname, phone number, email
//company : company, address, company number, ceo

export interface IAdmin {
  id: string;
  password: string;
  nickname: string;
  phoneNum: string;
}
export interface ICompany extends IAdmin {
  email: string;
  companyName: string;
  location: string;
}

interface IState {
  adminInfo: IAdmin[];
}
const initialState: IState = {
  adminInfo: [],
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    addInfo(state, action: PayloadAction<ICompany>) {
      state.adminInfo.push(action.payload);
    },
  },
});

const { reducer, actions } = adminSlice;
export const { addInfo } = actions;
export default reducer;

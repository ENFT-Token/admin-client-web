import { createSlice, PayloadAction, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

//admin : id, password, nickname, phone number, email
//company : company, address, company number, ceo

export interface IAdmin {
  access_token: string;
  address: string;
  email: string;
  location: string;
  place: string;
  privateKey: string;
  status: string;
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

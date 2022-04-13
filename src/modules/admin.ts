import { createSlice, PayloadAction, createReducer } from "@reduxjs/toolkit";

//admin : id, password, nickname, phone number, email
//company : company, address, company number, ceo

export interface IAdmin {
  access_token: string;
  email: string;
  location: string;
  place: string;
  address: string;
}
// export interface ICompany{
// }

interface IState {
  adminInfo: IAdmin | null;
}
const initialState: IState = {
  adminInfo: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    addInfo(state, action: PayloadAction<IAdmin>) {
      state.adminInfo = action.payload;
    },
  },
});

const { reducer, actions } = adminSlice;
export const { addInfo } = actions;
export default reducer;

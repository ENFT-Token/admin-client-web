import { createSlice, PayloadAction, createReducer } from "@reduxjs/toolkit";

//admin : id, password, nickname, phone number, email
//company : company, address, company number, ceo

export interface IAdmin {
  access_token: string;
  address: string;
  email: string;
  location: string;
  nickname: string;
  phone: string;
  place: string;
  privateKey: string;
  status: string;
  cover_img: string;
  //회원가입하고 post할 것
  //이메일
  //헬스장 주소
  //헬스장 지점명
  //nickname
}

interface IPriceInfo {
  month: number;
  klay: number;
}

interface IState {
  adminInfo: IAdmin | null;
  priceInfo: IPriceInfo[];
}

const initialState: IState = {
  adminInfo: null,
  priceInfo: [],
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    addInfo(state, action: PayloadAction<IAdmin>) {
      state.adminInfo = action.payload;
    },
    setPriceInfo(state, action: PayloadAction<IPriceInfo[]>) {
      state.priceInfo = action.payload;
    },
  },
});

const { reducer, actions } = adminSlice;
export const { addInfo, setPriceInfo } = actions;
export default reducer;

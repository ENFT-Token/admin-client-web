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


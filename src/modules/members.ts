import { createSlice, createAction, createReducer } from "@reduxjs/toolkit";
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
 // email: "",
  // gender: "",
  // name: { first: "", last: "", title: "" },
  // nat: "",
  // picture: { large: "", medium: "", thumbnail: "" },
const initialState: IUser[] = [];

export const userAdd = createAction(USERADD, (userData) => userData);

export default function members() {
  return 0;
}

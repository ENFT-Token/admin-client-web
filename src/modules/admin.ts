import { createSlice, PayloadAction , createReducer } from "@reduxjs/toolkit";

//admin : id, password, nickname, phone number, email
//company : company, address, company number, ceo 

export interface IAdmin{
    id : string;
    password : string;
    nickname : string;
    phoneNum : string;
    email : string;
    companyName : string;
    address : string;
    companyPhoneNum : string;
    ceoName : string;
}
// export interface ICompany{
// }

interface IState{
    adminInfo : IAdmin[];
}
const initialState:IState={
    adminInfo:[]
};

export const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        addInfo(state,action:PayloadAction<IAdmin>){
            state.adminInfo.push(action.payload);
        }
    },
});

const {reducer, actions} = adminSlice;
export const {addInfo} = actions;
export default reducer;

import React, { useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";

import styled from "styled-components";
import {
    BrowserRouter,
    Link,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import {IUserInfoProps} from "./components-type";
import {useSelector} from "react-redux";
import {Rootstate} from "../models";
import {SERVER_URL} from "../confing";
import UserInfo from "./UserInfo";

const StyledHeaderBar = styled.div`
  position: fixed;
  width: calc(100% - 345px);
  height: 120px;
  z-index: 5;
  background: #fff;
  margin-left: 345px;
`;

const StyledSearchBar = styled.div`
  float:left;
  width: 491px;
  height: 70px;
  border-radius: 40px;
  background: #fafafa;
  display: flex;
  margin: 25px;
  img {
    margin: 22px;
  }
  
  input[type='text'] {
    border: none;
    outline: none;
    background: #fafafa;
    font-size: 16px;
    width:80%;
  }
`;

function SearchBar() {
    return <StyledSearchBar>
                <img src={"/svg/search.svg"} />
        <input type={"text"} placeholder={"Search Wallet"}/>
    </StyledSearchBar>
}



const StyleProfile = styled.div`
  display: flex;
  margin-top: 15px;
  float: right;
  cursor: pointer;
  margin-bottom: 13px;
  margin-right: 20px;
  padding: 15px;
  border-radius: 10px;
  svg {
    margin-left: 30px;
    margin-top: 20px;
    margin-right: 8px;
  }

  &:hover {
    background: #e9e9e9;
  }

`

function SmallProfile({ src, place }: { src: string, place: string }) {
    return (
        <StyleProfile>
            <UserInfo src={src} name={place}  subname={"Super Admin"}/>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 15 8">
                <path id="arrow" d="M15,0,7.5,8,0,0Z" fill="#c4c4c4"/>
            </svg>
        </StyleProfile>
    )
}

export default function HeaderBar() {
    const admin = useSelector((store: Rootstate) => store.admin.adminInfo);
    const location = useLocation();

    return (
        <StyledHeaderBar>
            <SearchBar />
           <SmallProfile src={`http://${SERVER_URL}${admin?.cover_img}`} place={admin?.place ?? ""}/>
        </StyledHeaderBar>
    );
}

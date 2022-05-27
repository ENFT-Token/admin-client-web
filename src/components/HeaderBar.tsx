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

const StyledHeaderBar = styled.div`
  position: fixed;
  width:100%;
  height: 120px;
  z-index: 5;
  background: #fff;
`;


const StyleUserInfo = styled.div`
  margin-top: 15px;
  float: right;
  display: flex;
  margin-bottom: 13px;
  cursor: pointer;
  margin-right: 20px;
  padding: 15px;
  border-radius: 10px;

  img {
    width: 57px;
    height: 57px;
    border-radius: 10px;
    margin-right: 24px;
  }

  .place {
    color: #000000;
    font-size: 16px;
    margin-bottom: 3px;
  }

  .role {
    color: #8F8F8F;
    font-size: 14px;
  }

  svg {
    margin-left: 30px;
    margin-top: 20px;
    margin-right: 8px;
  }

  &:hover {
    background: #e9e9e9;
  }
`;


function SmallProfile({ src, place }: { src: string, place: string }) {
    return (
        <StyleUserInfo>
            <div className="icon_wrapper">
                <img src={src} />
            </div>
            <div>
                <div className="place">{place}</div>
                <div className="role">Super Admin</div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 15 8">
                <path id="arrow" d="M15,0,7.5,8,0,0Z" fill="#c4c4c4"/>
            </svg>
        </StyleUserInfo>
    )
}

export default function HeaderBar() {
    const admin = useSelector((store: Rootstate) => store.admin.adminInfo);
    const location = useLocation();

    return (
        <StyledHeaderBar>
           <SmallProfile src={`http://${SERVER_URL}${admin?.cover_img}`} place={admin?.place ?? ""}/>
        </StyledHeaderBar>
    );
}

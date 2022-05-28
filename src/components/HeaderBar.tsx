import React, {MouseEventHandler, useEffect, useRef, useState} from "react";
import { Layout, Menu, Breadcrumb } from "antd";

import styled from "styled-components";
import {
    BrowserRouter,
    Link,
    Route,
    Routes,
    useLocation, useNavigate,
} from "react-router-dom";
import {IUserInfoProps} from "./components-type";
import {useSelector} from "react-redux";
import {Rootstate} from "../models";
import {SERVER_URL} from "../confing";
import UserInfo from "./UserInfo";
import AlramIcon from "./AlramIcon";
import jwt_decode from "jwt-decode";
import {addInfo} from "../models/admin";
import store from "../models/store";
import {toast} from "react-toastify";


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

const StyledHeaderBar = styled.div`
  position: fixed;
  width: calc(100% - 345px);
  height: 120px;
  z-index: 5;
  background: #fff;
  margin-left: 345px;


  .user_info {
    position: absolute;
    border-radius: 10px;
    top: 110px;
    right: 50px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    width: 200px;
    background: #fff;
    
    div {
      cursor: pointer;
      padding: 20px;
      text-align: center;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      
      &:hover {
        color: rgba(0,0,0,0.5);        
      }
      &:last-child {
        border-bottom: none;
      }
    }

    .timer {
      cursor: default;

      &:hover {
        color: black;
      }
    }
  }
`;



function SmallProfile({ src, place, onClick }: { src: string, place: string,onClick?:MouseEventHandler<HTMLDivElement>  }) {
    return (
        <StyleProfile onClick={onClick}>
            <UserInfo src={src} name={place}  subname={"Super Admin"}/>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 15 8">
                <path id="arrow" d="M15,0,7.5,8,0,0Z" fill="#c4c4c4"/>
            </svg>
        </StyleProfile>
    )
}


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


function LoginTimer() {
    const [remain,setRemain] = useState<{
        h: string;
        m: string;
        s: string;
    } | null>(null)
    const timeRef = useRef<NodeJS.Timer | null>(null);
    useEffect(() => {
        const loginLocal = window.localStorage.getItem("login");
        if (loginLocal) {
            const data = JSON.parse(loginLocal);

            if (data?.access_token) {
                const _decoded: any = jwt_decode(data?.access_token);
                const expiredData = _decoded.exp * 1000;
                timeRef.current = setInterval(() => {
                    const diffTime = Math.abs(expiredData - new Date().getTime());

                    const hour = Math.floor(Math.abs(diffTime / (1000 * 60 * 60)));
                    const min = Math.floor(Math.abs(diffTime / (1000 * 60))) - (hour * 60);
                    const sec = Math.floor(Math.abs(diffTime / (1000))) - (hour * 3600 + min * 60);

                    setRemain({
                        h: `${hour >= 10 ? hour : "0" + hour}`,
                        m: `${min >= 10 ? min : "0" + min}`,
                        s: `${sec >= 10 ? sec : "0" + sec}`,
                    })

                    if (new Date() > new Date(expiredData)) {
                        store.dispatch(addInfo(null));
                        delete localStorage["login"];
                        toast.error("로그인 만료. 재로그인 해주세요.");
                    } else {
                        store.dispatch(addInfo(data)); // 로그인 데이터 유지
                    }
                },1000);
            }
        }
        return () => {
            if(timeRef.current) {
                clearInterval(timeRef.current);
            }
        }
    }, []);

    return (
        <>
        <div className={"timer"}>
            <p>로그인 만료 시간</p>
            {remain ? <>{remain.h}시 {remain.m}분 {remain.s}초</> : "-"}
        </div>
        </>
    )

}



export default function HeaderBar() {
    const admin = useSelector((store: Rootstate) => store.admin.adminInfo);
    const navigate = useNavigate();
    const [isMenu,setMenu] = useState(false);

    return (
        <StyledHeaderBar>
            {admin && (
                <>
                    <SearchBar />
                    <div>
                    <SmallProfile src={`http://${SERVER_URL}${admin?.cover_img}`} place={admin?.place ?? ""} onClick={() => setMenu(!isMenu)}/>
                        {isMenu && <div className={"user_info"}>
                            <LoginTimer />
                            <div onClick={() => {
                                store.dispatch(addInfo(null));
                                delete localStorage['login'];
                            }}>
                                로그아웃
                            </div>
                    </div>}
                    </div>
                    <div style={{float:'right',marginTop:"30px",marginRight:"62px"}}>
                        <AlramIcon src={"/svg/memo.svg"} count={2} onClick={() =>navigate("/memo")}/>
                    </div>
                </>
            )}

        </StyledHeaderBar>
    );
}

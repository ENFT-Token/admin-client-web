import React, { useEffect, useState } from "react";

import styled from "styled-components";
import {
    Link,
    useLocation,
} from "react-router-dom";
import {useSelector} from "react-redux";
import {Rootstate} from "../models";

const StyledSideBar = styled.div`
  position: fixed;
  z-index: 10;
  width: 345px;
  height: 100vh;
  background: #ffffff;
  box-shadow: 18px 4px 35px #00000005;
  .logo {
    img {
      margin-left: 71px;
      margin-top: 35px;
      width: 130px;
    }
    position: relative;
    .hamburger {
      position: absolute;
      top: 43px;
      right: 33px;
      cursor: pointer;
      div {
        width: 26px;
        height: 3px;
        background: #202020;
        border-radius: 8px;
        margin-bottom: 5px;
      }
    }
  }

  .menu {
    margin-top: 76px;

    .menuItem {
      display: block;
      height: 50px;
      font-weight: bold;
      line-height: 40px;
      font-size: 16px;
      padding-left: 112px;
      letter-spacing: 0px;
      opacity: 1;
      margin-bottom: 14px;
      cursor: pointer;
      color: #1f2026;

      &::after {
        content: "";
        transform: translateX(30px);
        transition: 0.2s;
        opacity: 0;
        overflow: hidden;
      }
      &:hover {
        color: #1f2026b7;
        &::after {
          background: #c0d335;
          border-radius: 25px;
          width: 6px;
          content: "";
          float: right;
          height: 49px;
          opacity: 1;
          display: block;
          transform: translateX(0px);
        }
      }

      &.select {
        color: #c0d437;

        &::after {
          background: #c0d335;
          border-radius: 25px;
          width: 6px;
          content: "";
          float: right;
          height: 49px;
          opacity: 1;
          display: block;
          transform: translateX(0px);
        }
      }
      &.select:hover {
        color: #bfd4379b;
      }
    }
  }

  .footer {
    position: absolute;
    left: 43px;
    font-size: 13px;
    bottom: 30px;
    text-align: center;
    color: #a5a5a5;
  }
`;
export default function SideBar() {
    const location = useLocation();
    const admin = useSelector((store: Rootstate) => store.admin.adminInfo);

    return (
        <StyledSideBar>
            <div className="logo">
                <Link to="/">
                    <img src="/svg/logo.svg" />
                </Link>
                <div className="hamburger">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className="menu">
                {admin ? (
                    <>
                        <Link
                            to="/"
                            className={`menuItem ${location.pathname === "/" ? "select" : ""}`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/price_info"
                            className={`menuItem ${
                                location.pathname === "/price_info" ? "select" : ""
                            }`}
                        >
                            Setting
                        </Link>
                        <Link
                            to="/members"
                            className={`menuItem ${
                                location.pathname === "/members" ? "select" : ""
                            }`}
                        >
                            Members
                        </Link>
                        <Link
                            to="/approve"
                            className={`menuItem ${
                                location.pathname === "/approve" ? "select" : ""
                            }`}
                        >
                            Approve
                        </Link>
                        <Link
                            to="/checkin"
                            className={`menuItem ${
                                location.pathname === "/checkin" ? "select" : ""
                            }`}
                        >
                            Check In
                        </Link>
                        <Link
                            to="/profit"
                            className={`menuItem ${
                                location.pathname === "/profit" ? "select" : ""
                            }`}
                        >
                            Profit
                        </Link>
                        <Link
                            to="/memo"
                            className={`menuItem ${
                                location.pathname === "/memo" ? "select" : ""
                            }`}
                        >
                            Memo
                        </Link>
                    </>
                ) :  <Link
                    to="/login"
                    className={`menuItem ${
                        location.pathname === "/login" ? "select" : ""
                    }`}
                >
                    Sign up & Login
                </Link>}
                <div className="footer">Copyright © Designed & Developed by ENFT</div>
            </div>
        </StyledSideBar>
    );
}

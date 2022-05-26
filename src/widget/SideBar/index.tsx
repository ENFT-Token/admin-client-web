import React, { useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";

import styled from "styled-components";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

const StyledSideBar = styled.div`
  position: fixed;
  z-index: 10;
  width: 345px;
  height: 100vh;
  background: #ffffff;
  box-shadow: 18px 4px 35px #00000015;
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
      right: 13px;
      cursor: pointer;
      width: 46px;
      height: 46px;
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
  const [click, setClick] = useState(false);

  const closeMobileMenu = () => setClick(false);
  const handleClick = () => setClick(!click);
  return (
    <StyledSideBar>
      <div className="logo">
        <img src="/svg/logo.svg" />
        <div className="hamburger">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="menu">
        <Link to="/" className="menuItem select">
          Home
        </Link>
        <Link to="/price_info" className="menuItem">
          Setting
        </Link>
        <Link to="/members" className="menuItem">
          Members
        </Link>
        <Link to="/approve" className="menuItem">
          Approve
        </Link>
        <Link to="/checkin" className="menuItem">
          Check In
        </Link>
        <Link to="/profit" className="menuItem">
          Profit
        </Link>
        <Link to="/memo" className="menuItem">
          Memo
        </Link>
        <Link to="/login" className="menuItem">
          Sign up & Login
        </Link>

        <div className="footer">Copyright © Designed & Developed by ENFT</div>
      </div>
      {/* <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ENFT
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link
              to="/price_info"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              PRICE SETTING
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/members" className="nav-links" onClick={closeMobileMenu}>
              MEMBERS
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/approve" className="nav-links" onClick={closeMobileMenu}>
              APPROVE
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/checkin" className="nav-links" onClick={closeMobileMenu}>
              CHECK IN
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profit" className="nav-links" onClick={closeMobileMenu}>
              PROFIT
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/memo" className="nav-links" onClick={closeMobileMenu}>
              MEMO
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/login"
              className="nav-links-mobile"
              onClick={closeMobileMenu}
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div> */}
    </StyledSideBar>
  );
}

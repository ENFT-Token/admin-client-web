import React, { useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";

import styled from "styled-components";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import "./Navbar.css";
export default function Navbar() {
  const [click, setClick] = useState(false);

  const closeMobileMenu = () => setClick(false);
  const handleClick = () => setClick(!click);
  return (
    <div className="navbar">
      <div className="navbar-container">
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
      </div>
    </div>
  );
}

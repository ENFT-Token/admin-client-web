import React, { useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import "antd/dist/antd.css";

import styled from "styled-components";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import MainPage from "./page/MainPage";

import MemoPage from "./page/MemoPage";
import ProfitPage from "./page/ProfitPage";
import LoginPage from "./page/LoginPage";
import MembersPage from "./page/MembersPage";
import RegisterPage from "./page/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import { addInfo } from "./models/admin";
import { Rootstate } from "./models";
import CheckInPage from "./page/CheckInPage";
import ApprovePage from "./page/ApprovePage";
import './index.css';
import Navbar from "./widget/Navbar/Navbar";
export default function App2() {

    const dispatch = useDispatch();
    const admin = useSelector((store: Rootstate) => store.admin.adminInfo);
  
    useEffect(() => {
      const loginLocal = window.localStorage.getItem("login");
      if (!admin) {
        console.log("loginLocal", JSON.parse(loginLocal as string));
        dispatch(addInfo(JSON.parse(loginLocal as string)));
      }
    }, []);
  return (
    <div className="App">
         <BrowserRouter>
            <Navbar/>
            <Routes>
                  <Route path="/login" element={<LoginPage />}></Route>
                  <Route path="/" element={<MainPage />}></Route>
                  <Route path="/members" element={<MembersPage />}></Route>
                  <Route path="/approve" element={<ApprovePage />}></Route>
                  <Route path="/profit" element={<ProfitPage />}></Route>
                  <Route path="/memo" element={<MemoPage />}></Route>
                  <Route path="/register" element={<RegisterPage />}></Route>
                  <Route path="/checkin" element={<CheckInPage />}></Route>
                </Routes>
         </BrowserRouter>



    </div>
  )
}

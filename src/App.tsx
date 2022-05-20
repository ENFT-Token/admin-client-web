import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";

import styled from "styled-components";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import MainPage from "./page/MainPage";

import MemoPage from "./page/MemoPage";
import ProfitPage from "./page/ProfitPage";
import MembersPage from "./page/MembersPage";
import LoginPage from "./page/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { addInfo } from "./models/admin";
import { Rootstate } from "./models";
import CheckInPage from "./page/CheckInPage";
import ApprovePage from "./page/ApprovePage";
import "./index.css";
import Navbar from "./widget/Navbar/Navbar";
import "./App.css";
import PriceInfoPage from "./page/PriceInfoPage";
import jwt_decode from "jwt-decode";

const Layout = styled.div`
  height: calc(100vh - 80px);
  // background:#6EB08F;
  background: #fff;
`;
export default function App2() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 로그인 체킹. (만료시간 체크)
    const loginLocal = window.localStorage.getItem("login");
    console.log("loginLocal", loginLocal);

    if (loginLocal) {
      const data = JSON.parse(loginLocal);

      if (data?.access_token) {
        const _decoded: any = jwt_decode(data?.access_token);
        const expiredData = new Date(_decoded.exp * 1000);
        if (new Date() > expiredData) {
          alert("로그인 만료. 재로그인 해주세요.");
          delete localStorage["login"];
        } else {
          dispatch(addInfo(data)); // 로그인 데이터 유지
        }
      }
    }
  }, []);
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Navbar />
          <Layout>
            <Routes>
              <Route path="/" element={<MainPage />}></Route>
              <Route path="/members" element={<MembersPage />}></Route>
              <Route path="/price_info" element={<PriceInfoPage />}></Route>
              <Route path="/approve" element={<ApprovePage />}></Route>
              <Route path="/profit" element={<ProfitPage />}></Route>
              <Route path="/memo" element={<MemoPage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/checkin" element={<CheckInPage />}></Route>
            </Routes>
          </Layout>
        </BrowserRouter>
      </div>
    </div>
  );
}

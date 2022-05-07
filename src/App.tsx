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


const { Header, Content, Footer } = Layout;


function App() {
  const dispatch = useDispatch();
  const admin = useSelector((store:Rootstate)=> store.admin.adminInfo);
  
  useEffect(()=>{
    const loginLocal = window.localStorage.getItem('login');
    if(!admin){
      console.log("loginLocal",JSON.parse(loginLocal as string))
      dispatch(addInfo(JSON.parse(loginLocal as string)))
    }
  },[])
  
  return (
    <div className="App">

{/********** Header-bar **********/}

      <BrowserRouter>
      
        <Layout>
        
          <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["0"]}>
              <Menu.Item key="1"> <Link to="/home"> MAIN </Link> </Menu.Item>
              <Menu.Item key="2"> <Link to="/members"> MEMBERS </Link></Menu.Item>
              <Menu.Item key="3"> <Link to="/approve"> APPROVE </Link></Menu.Item>
              <Menu.Item key="4"> <Link to="/checkin"> CHECK IN </Link></Menu.Item>
              <Menu.Item key="5"> <Link to="/profit"> PROFIT </Link> </Menu.Item>
              <Menu.Item key="6"> <Link to="/memo"> MEMO </Link></Menu.Item>
              
            </Menu>
          </Header>
          <Contents className="site-layout">
            <div className="site-layout-background">
              <Routes>
                <Route path="/" element={<LoginPage/>}></Route>  
                <Route path="/home" element={<MainPage />}></Route>
                <Route path="/members" element={<MembersPage />}></Route>
                <Route path="/approve" element={<ApprovePage />}></Route>
                <Route path="/profit" element={<ProfitPage />}></Route>
                <Route path="/memo" element={<MemoPage />}></Route>
                <Route path="/register" element={<RegisterPage />}></Route>
                <Route path="/checkin" element={<CheckInPage />}></Route>
              </Routes>
            </div>
          </Contents>
        </Layout>
      </BrowserRouter>
{/********** Header-bar **********/}
    </div>
  );
}
const Contents = styled(Content)`
  .site-layout-background {
    background: #fff;
    height: 100vh;
    padding: 24px;
    min-height: 380px;
  }
  .site-layout {
    padding: 0 50px;
    margin-top: 64px;
  }
`;
export default App;

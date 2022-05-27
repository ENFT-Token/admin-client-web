import React, { useEffect } from "react";
import { Layout } from "antd";
import styled from "styled-components";
import "./index.css";

import GridLayout from "react-grid-layout";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ProfileWidget from "../../widget/ProfileWidget";
import MemoWidget from "../../widget/MemoWidget";
import { Rootstate } from "../../models";
import { useSelector } from "react-redux";
import MemberWidget from "../../widget/ApproveWidget";
import CheckCount from "../../widget/CheckCountWidget";
import Alarm from "../../widget/AlarmWidget";

import { MdChecklist } from "react-icons/md";
import Footer from "../../widget/Footer/Footer";
import ListWidget from "../../widget/ListWidget";

const ResponsiveGridLayout = WidthProvider(Responsive);
export default function MainPage() {
  const admin = useSelector((store: Rootstate) => store.admin.adminInfo);
  const layout = [
    { i: "todayCheckIn", x: 0, y: 0, w: 3, h: 3, isResizable: false, static: true},
    { i: "checkin", x: 3, y: 0, w: 3, h: 3, isResizable: false, static: true},
    { i: "approve", x: 0, y: 6, w: 3, h: 7},
    { i: "member", x: 3, y: 6, w: 3, h: 7},
    { i: "memo", x: 8, y: 6, w: 6, h: 4},
    { i: "profile", x: 8, y: 0, w: 6, h: 6, isResizable: false,static: true },
  ];

  return (
    <div className="container">
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 12, xs: 8, xxs: 2 }}
        rowHeight={60}
        width={1500}
        margin={[20, 20]}
      >
        <div key="profile" className="widget">
          <ProfileWidget />
        </div>
        <div key="checkin" className="widget">
          checkin
        </div>

        <div key="todayCheckIn" className="widget">
        today checkin
        </div>
        <div key="approve" className="widget">
        approve
        </div>
        <div key="member" className="widget">
          member
        </div>

        <div key="memo" className="widget">
          memo
        </div>
        {/*<div key="현재 회원들" className="widget">*/}
        {/*  <ListWidget title="승인 요청 리스트" />*/}
        {/*</div>*/}
        {/*<div key="현재" className="widget" id="current_checkin">*/}
        {/*  <div id="checkinText">*/}
        {/*    하루 누적 이용자 수 : x 명*/}
        {/*    <CheckCount />*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div key="현재" className="widget" id="today_checkin">*/}
        {/*  <div id="checkinText">*/}
        {/*    하루 누적 이용자 수 : x 명*/}
        {/*    <CheckCount />*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div key="알림" className="widget" id="alarm">*/}
        {/*  <div id="alarmText">*/}
        {/*    <h1 id="alarmHeader">*/}
        {/*      알림*/}
        {/*      <MdChecklist style={{ marginLeft: "15px" }} />*/}
        {/*    </h1>*/}
        {/*    <div id="alarmBody">*/}
        {/*      <Alarm />*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div key="관리자 메모" className="widget" id="memo">*/}
        {/*  <MemoWidget />*/}
        {/*</div>*/}
        {/*<div key="접속 중인 회원들" className="widget">*/}
        {/*  접속중인 회원들리스트 : 소켓이용*/}
        {/*</div>*/}
      </ResponsiveGridLayout>

      {/* <Footer/> */}
    </div>
  );
}

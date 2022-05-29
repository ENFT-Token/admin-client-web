import React, {useEffect, useMemo} from "react";
import "./index.css";

import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ProfileWidget from "../../widget/ProfileWidget";
import MemoWidget from "../../widget/MemoWidget";
import { Rootstate } from "../../models";
import { useSelector } from "react-redux";
import ListWidget from "../../widget/ListWidget";
import CountWidget from "../../widget/CountWidget";
import {useNavigate} from "react-router-dom";
import {useQueries, useQuery} from "react-query";
import moment from "moment";

const ResponsiveGridLayout = WidthProvider(Responsive);
export default function MainPage() {
  const navigate = useNavigate();

  const admin = useSelector((store: Rootstate) => store.admin.adminInfo);

  if(!localStorage['login']) {
    navigate("/login");
  }

  console.log(admin);
  const layout = [
    { i: "todayCheckIn", x: 0, y: 0, w: 3, h: 2, isResizable: false, static: true},
    { i: "checkin", x: 3, y: 0, w: 3, h: 2, isResizable: false, static: true},
    { i: "approve", x: 0, y: 5, w: 3, h: 8},
    { i: "member", x: 3, y: 5, w: 3, h: 8},
    { i: "memo", x: 8, y: 6, w: 6, h: 4},
    { i: "profile", x: 8, y: 0, w: 6, h: 6, isResizable: false,static: true },
  ];

  const {data: approveList} = useQuery<Record<string,any>[]>("approveList");
  const {data: checkList} = useQuery<Record<string,any>[]>("check");
  const {data: todayCount} = useQuery<number>("todayCount");


  const approveData = useMemo(() => {
    return approveList?.map(approve => ({
        src:approve.user.profile,
        name: approve.user.nickname,
        subname: `Request ${approve.requestDay} day`
    })) ?? [];
  }, [approveList]);


  const checkData = useMemo(() => {
    return checkList?.map(check => ({
      src:check.profile,
      name: check.nickname,
      subname: `CheckIn ${moment(check.updateAt).format("hh:mm:ss")}`
    })) ?? [];
  }, [checkList]);


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
          <CountWidget count={checkData.length} title={"현재 이용자 수"}  onClick={() => navigate("/checkin")}/>
        </div>

        <div key="todayCheckIn" className="widget">
          <CountWidget count={todayCount ?? 0} title={"오늘 이용자 수"}/>
        </div>
        <div key="approve" className="widget">
          <ListWidget title={"승인 요청 유저 리스트"} items={approveData}/>
        </div>
        <div key="member" className="widget">
          <ListWidget title={"접속중인 회원 리스트"} items={checkData}/>
        </div>

        <div key="memo" className="widget">
          <MemoWidget />
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

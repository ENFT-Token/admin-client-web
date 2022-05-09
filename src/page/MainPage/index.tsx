import React from "react";
import { Layout } from "antd";
import styled from "styled-components";
import "./index.css";

import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import InfoWidget from "../../widget/InfoWidget";
import MemoWidget from "../../widget/MemoWidget";
import { Rootstate } from "../../models";
import { useSelector } from "react-redux";
export default function MainPage() {
  const admin = useSelector((store: Rootstate) => store.admin.adminInfo);
  const layout = [
    { i: "관리자 정보", x: 8, y: 0, w: 3, h: 6 },
    { i: "헬스장 이름", x: 4, y: 0, w: 4, h: 2, minW: 2, maxW: 4 },
    { i: "현재 회원들", x: 4, y: 0, w: 4, h: 4 },
    { i: "광고1", x: 8, y: 0, w: 3, h: 2 },
    { i: "광고2", x: 8, y: 0, w: 3, h: 2 },
    { i: "관리자 메모", x: 4, y: 0, w: 4, h: 4 },
    { i: "할일", x: 1, y: 0, w: 3, h: 3 },
    { i: "접속 중인 회원들", x: 1, y: 0, w: 3, h: 4 },
    { i: "현재", x: 1, y: 0, w: 3, h: 3 },
  ];

  return (
    <div className="container">
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1500}
        margin={[30, 30]}
      >
        <div key="관리자 정보" style={{ background: "red" }}>
          <InfoWidget />
        </div>
        <div key="헬스장 이름" style={{ background: "orange" }}>
          {admin?.place}
        </div>
        <div key="현재 회원들" style={{ background: "blue" }}>
          현재 회원들
        </div>
        <div key="광고1" style={{ background: "gray" }}>
          광고1
        </div>
        <div key="광고2" style={{ background: "gray" }}>
          광고2
        </div>
        <div key="현재" style={{ background: "yellow" }}>
          현재 이용자 수 및 누적 이용자 수{" "}
        </div>
        <div key="할일" style={{ background: "green" }}>
          메모가 @개 있습니다.
          <br />
          현재 승인 요청한 유저가 @명입니다.
        </div>
        <div key="관리자 메모" style={{ background: "yellow" }}>
          <MemoWidget />
        </div>
        <div key="접속 중인 회원들" style={{ background: "yellow" }}>
          접속중인 회원들리스트
        </div>
      </GridLayout>
    </div>
  );
}

import React from "react";
import { Layout } from "antd";
import styled from "styled-components";
import "./index.css";

import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import InfoWidget from '../../widget/InfoWidget';
import MemoWidget from '../../widget/MemoWidget';
import { Rootstate } from '../../models';
import { useSelector } from 'react-redux';
import MemberWidget from '../../widget/MemberWidget';
import CheckCount from "../../widget/CheckCountWidget";
import Alarm from "../../widget/AlarmWidget";


export default function MainPage() {
  const admin = useSelector((store: Rootstate) => store.admin.adminInfo);
  const {a,b}={a:0,b:0};
  const layout = [
    { i: "현재", x: 0, y: 0, w: 3, h: 3+b,isResizable: false },
    { i: "헬스장 이름", x: 3, y: 0, w: 5, h: 2, minW: 2, maxW: 4 ,isResizable: false},
    { i: "관리자 정보", x: 8, y: 0, w: 4, h: 6 ,isResizable: false},
   
    { i: "알림", x: 0, y: 0, w: 3, h: 3,isResizable: false },
    { i: "현재 회원들", x: 3, y: 0, w: 5, h: 4 ,isResizable: false},


    { i: "접속 중인 회원들", x: 0, y: 0, w: 3+a, h: 4+b ,isResizable: false},
    { i: "관리자 메모", x: 3, y: 0, w: 5, h: 4 ,isResizable: false},
    { i: "광고1", x: 8, y: 0, w: 4, h: 2 ,isResizable: false},
    { i: "광고2", x: 8, y: 0, w: 4, h: 2 ,isResizable: false},
    
    
    
    
    
  ];

  return (
    <div className="container">
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1500}
        margin={[25, 25]}

      >
       
        <div key="관리자 정보" className="widget" >
          <InfoWidget />
        </div>
        <div key="헬스장 이름" className="widget"  >
          <h1>{admin?.place}</h1>
        </div>
        <div key="현재 회원들" className="widget">
          <MemberWidget/>
        </div>
        <div key="광고1" className="widget">광고1</div>
        <div key="광고2" className="widget">광고2</div>
        <div key="현재" className="widget" id="checkin">
          하루 누적 이용자 수 : x
          <CheckCount/> 
          </div>
        <div key="알림" className="widget" >
          <h1>알림</h1>
          <Alarm/>
        </div>
        <div key="관리자 메모" className="widget" >
          <MemoWidget />
        </div>
        <div key="접속 중인 회원들" className="widget" >
          접속중인 회원들리스트 : 소켓이용
          </div>
      
      </GridLayout>
    </div>
  );
}



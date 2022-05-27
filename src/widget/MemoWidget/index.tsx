import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { IoChevronForward } from "react-icons/io5";
import AlramIcon from "../../components/AlramIcon";
import {useNavigate} from "react-router-dom";
import { IMemo } from "../../page/MemoPage";
import moment from "moment";

const StyleMemo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
    padding: 30px 30px 30px 30px;
   .line {
     cursor: pointer;
     color: #202020;
     font-weight: 500;
     display: flex;
     align-items: center;
     
     div {
       margin-right: 5px;
     }
     .dashed {
       flex: 1;
       height: 1px;
       border-top: 2px dashed #C2C2C2;
     }
   }
`;


const StyleMemoItem = styled.div`
  display: flex;
  margin-bottom: 10px;
  .timestamp {
    display: flex;
    align-items: center;
    .ago {
      color: #202020;
      margin-right: 40px;
    }
    .bar {
      border-radius: 5px;
      display: inline-block;
      background: #E8E8E8;
      width: 7px;
      height: 51px;
      margin-right: 40px;
      content:"";
    }
  }
  .memo {
    .body {
      font-size: 18px;
      font-weight: bold;
    }
    .date {
      color: #A5A5A5;
    }
  }
  
`;

interface IMemoItemProps {
  timestamp: number;
  value: string;
}

function MemoItem({timestamp,value} : IMemoItemProps) {
  return <StyleMemoItem>
    <div className={"timestamp"}>
      <div className={"ago"}>
        2m ago
      </div>
      <div className={"bar"}/>
    </div>
    <div className={"memo"}>
      <div className={"body"}>
        {value}
      </div>
      <div className={"date"}>
        {moment(timestamp).format("yyyy-MM-ss HH:MM:SS")}
      </div>
    </div>
  </StyleMemoItem>
}


export default function MemoWidget() {
  const navigate = useNavigate();
  const [memoList,setMemoList] = useState<IMemo[]>([]);
  useEffect(() => {
    try {
      let memo: IMemo[] = [];
      if (!localStorage["memo"]) {
        localStorage["memo"] = JSON.stringify([]);
        memo = [];
      } else {
        memo = JSON.parse(localStorage["memo"]);
      }

      setMemoList(memo);
    }
    catch(e) {
      localStorage["memo"] = JSON.stringify([]);
      setMemoList([]);
    }
  }, []);

  return (
    <StyleMemo>
        <div className="line" onClick={() => navigate("/memo")}>
          <div style={{fontSize:'16px'}}>MEMO</div>
          <AlramIcon src={"/svg/memo.svg"} count={memoList.length} />
          <div className={"dashed"}/>
        </div>
      <div style={{marginTop:'20px',overflow:'auto'}}>
        {memoList.map((memo,idx) =>   <MemoItem value={memo.value} key={`memo-${idx}`} timestamp={memo.timestamp} />)}
      </div>
    </StyleMemo>
  );
}

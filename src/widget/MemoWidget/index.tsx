import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { IoChevronForward } from "react-icons/io5";
interface IMemo {
  id: string;
  name: string;
  text: string;
  createdAt: string;
}

export default function MemoWidget() {
  // const [list, setList] = useState<IMemo[]>([]);
  // useEffect(()=>{
  //   const bodyString = window.localStorage.getItem('body');
  //   setList(JSON.parse(bodyString as string));
  // },[])
  const list = useMemo(() => {
    const bodyString = window.localStorage.getItem("memo");
    return JSON.parse(bodyString as string).list;
  }, []);

  return (
    <div>
      <List>
        <div className="memoTitle">
          <span>메모</span>
        </div>
        <hr />

        <ul className="ul">
          {list?.map((v: IMemo) => (
            <li><IoChevronForward style={{ marginRight: "10px" }} />{v.text}</li>
          ))}
        </ul>
      </List>

    </div>
  );
}

const List = styled.div`
  .memoTitle{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size:25px;
   

  }
  span{
    border-radius: 5px;   
    padding:3px 20px 3px 20px;
    margin-top:5px;
    background-color: rgba(255,255,255,0.3);
  }
  hr{
        margin-top:5px;
        background-color:green;
        height:5px;
        border:0;
        opacity:30%;
    }
  li{
    font-size:30px;
    padding: 5px 0px 5px 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid #efefef;
    font-size: 15px;
  }
`
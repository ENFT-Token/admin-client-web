import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Rootstate } from "../../models";
import { FcCheckmark } from "react-icons/fc";
import styled from "styled-components";
export default function Alarm() {
  const list = useMemo(() => {
    let bodyString = window.localStorage.getItem("memo");
    if (!bodyString) {
      const tempObjBody = JSON.stringify({ num: 0, list: [] });
      window.localStorage.setItem("memo", tempObjBody);
      bodyString = tempObjBody;
    }
    return JSON.parse(bodyString as string).list.length;
  }, []);
  const userCount = useSelector(
    (store: Rootstate) => store.members.approvedUser.length
  );

  return (
    <Form>
      <div>
        <FcCheckmark style={{ marginRight: "15px" }} />
        현재 관리자 메모가 <Text>{list} 개</Text> 있습니다
      </div>
      <div>
        <FcCheckmark style={{ marginRight: "15px" }} />
        현재 승인 요청한 유저가 <Text>{userCount} 명</Text> 입니다.
      </div>
    </Form>
  );
}

const Form = styled.div`
  div {
    margin-bottom: 20px;
  }
`;
const Text = styled.span`
  color: white;
  border: 10px;
  border-radius: 5px;
  background-color: #009416;
  padding: 5px 10px;
`;

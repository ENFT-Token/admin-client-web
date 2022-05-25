import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SERVER_URL } from "../../confing";
import { IApprove } from "../../models/members";
import { RequestAuth } from "../../models/Request";

export default function MemberWidget() {
  const [list, setList] = useState<any>([]);

  return (
    <Form>
      <TitleContainer>
        <Title>현재 승인된 유저들</Title>
      </TitleContainer>
      <hr />
      {list.map((v: IApprove) => (
        <li>
          {v.user.profile} {v.user.nickname}
          {v.user.sex}
        </li>
      ))}
    </Form>
  );
}

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const Title = styled.span`
  border-radius: 5px;
  font-size: 25px;

  padding: 5px 20px 5px 20px;
  margin-top: 5px;
  background-color: rgba(255, 255, 255, 0.3);
`;

const Form = styled.div`
  hr {
    margin-top: 5px;
    background-color: green;
    height: 5px;
    border: 0;
    opacity: 30%;
  }
`;

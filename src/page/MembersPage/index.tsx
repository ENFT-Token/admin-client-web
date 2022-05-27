import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../models";
import axios from "axios";
import { SERVER_URL } from "../../confing";
import styled from "styled-components";
import Table from "../../widget/TableWidget";
import { Button } from "antd";
import { RequestAuth } from "../../models/Request";

interface IListData {
  //렌더링계속되므로 함수밖에 작성
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
}

export default function MembersPage() {
  const arvUser = useSelector((store: Rootstate) => store.members.approvedUser);
  const [listData, setListData] = useState<IListData[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await RequestAuth("GET", "/admin/member");
        console.log(response.data);
      } catch (e) {
        console.log("error", e);
      }
    };
    fetch();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "프로필",
        accessor: "profile",
      },
      {
        Header: "닉네임",
        accessor: "nickname",
      },
      {
        Header: "성별",
        accessor: "sex",
      },
      {
        Header: "만료일",
        accessor: "requestDay",
      },
      {
        Header: "지갑 주소",
        accessor: "address",
      },
      {
        Header: "버튼",
        accessor: "button",
      },
    ],
    []
  );

  const temp = useMemo(
    () => [
      {
        nickname: "member",
        sex: "남자",
        requestDay: 27,
        address: "0x21232nbnj2j2pnijo2203123223n2n32n32j3kd",
        button: (
          <ButtonWrapper>
            <Button id="btn1" type="primary" ghost>
              승인하기
            </Button>
            <Button id="btn2" type="primary" danger>
              거절하기
            </Button>
          </ButtonWrapper>
        ),
      },
      { nickname: "member", sex: "남자", requestDay: 27, address: "member" },
      { nickname: "member", sex: "남자", requestDay: 27, address: "member" },
    ],
    []
  );

  if (!arvUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <Table columns={columns} data={temp} />
      </div>
    </div>
  );
}

const ButtonWrapper = styled.div`
  #btn1 {
    margin-right: 10px;
  }
`;

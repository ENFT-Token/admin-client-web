import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../models";
import axios from "axios";
import { SERVER_URL } from "../../confing";
import styled from "styled-components";
import Table from "../../widget/TableWidget";
import { Button } from "antd";

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
  const getMembers = async () => {
    try {
      const response = await axios.get(
        `http://${SERVER_URL}/admin/memberAddress`
      );
    } catch (e) {
      console.log("error", e);
    }
  };
  useEffect(() => {
    getMembers();
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
      <StylesTable>
        <Table columns={columns} data={temp} pagination />
      </StylesTable>
    </div>
  );
}

const ButtonWrapper = styled.div`
  #btn1 {
    margin-right: 10px;
  }
`;

export const StylesTable = styled.div`
  padding: 1rem;
  width: 100%;
  table {
    width: 100%;
    text-align: center;
    border-spacing: 0;
    border: 2px solid black;
    tr {
      :last-child {
        td {
          /* border-bottom: 0; */
        }
      }
    }
  }
  th,
  td {
    margin: 0;
    /* padding-right: 1rem; */
    padding: 20px;
    border-bottom: 2px solid black;
    border-right: 2px solid black;

    :last-child {
      /* border-right: 0; */
    }
  }
  .pagination {
    padding: 0.5rem;
  }
`;

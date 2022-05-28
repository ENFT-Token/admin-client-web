import React, { useEffect, useMemo, useState } from "react";
import {  useSelector } from "react-redux";
import { Rootstate } from "../../models";
import { SERVER_URL } from "../../confing";
import Table, { Title } from "../../widget/TableWidget";
import { RequestAuth } from "../../models/Request";
import { Profile } from "../ApprovePage";
import {useQuery} from "react-query";

export interface IListData {
  //렌더링계속되므로 함수밖에 작성
  address: string;
  location: string;
  nickname: string;
  profile: string;
  sex: string;
}

export default function MembersPage() {
  const {data: members} = useQuery<Record<string, string>[]>("memberList");

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
        Header: "만료일",
        accessor: "requestDay",
      },
      {
        Header: "성별",
        accessor: "sex",
      },
      {
        Header: "지갑 주소",
        accessor: "address",
      },
  
    ],
    []
  );

  const data = useMemo(
    () =>
        members?.map((v) => {
      return{
        profile : (<Profile  width="60" height="60" src={`http://${SERVER_URL}${v.profile}`}></Profile>),
        nickname: v.nickname,
        //requestDay: v.requsetDay,
        sex: v.sex,
        address: v.address,
      }
      }) ?? [],
    [members]
  );

  if (!members) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Title>Members list</Title>
      <div>
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
}



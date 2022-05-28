import React, { useEffect, useMemo, useState } from 'react'
import { SERVER_URL } from '../../confing';
import { RequestAuth } from '../../models/Request';
import Table, { Title } from '../../widget/TableWidget';
import { Profile } from '../ApprovePage';
import moment from "moment";
import {useQuery} from "react-query";
interface ICheckList{
  address :string;
  profile :string;
  location :string;
  sex :string;
  nickname :string;
  updateAt :string;
  createAt :string;
  privateKey :string;
}

export default function CheckIn()  {
    const {data: checkList} = useQuery<Record<string, string>[]>("check");

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
        Header: "입장 시간",
        accessor: "checktime",
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
        checkList?.map((v) => {
      return{
        profile : (<Profile  width="60" height="60" src={`http://${SERVER_URL}${v.profile}`}></Profile>),
        nickname: v.nickname,
        checktime: moment(v.updateAt).format("hh시 mm분"),
        sex: v.sex,
        address: v.address,
      }
      }) ?? [],
    [checkList]
  );
  return (
    

    <div>
      <Title>Members checking in to the GYM</Title>
       <Table columns={columns} data={data} />
    </div>
    
  )
}

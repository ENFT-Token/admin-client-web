import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SERVER_URL } from "../../confing";
import { Rootstate } from "../../models";
import { addAllUser, addUser, deleteUser } from "../../models/members";
import styled from "styled-components";

import Table, { Title } from "../../widget/TableWidget";
import { RequestAuth } from "../../models/Request";
import { toast } from "react-toastify";
import { arrayBuffer } from "stream/consumers";
import Button from "../../components/Button";

export interface IApproveUser {
  profile: string;
  nickname: string;
  sex: string;
  requestDay: number;
  address: string;
}
export default function ApprovePage() {
  const requestUser = useSelector((store: Rootstate) => store.members.user);
  const admin = useSelector((store: Rootstate) => store.admin.adminInfo);
  const dispatch = useDispatch();
  const appendData = async () => {
    try {
      // const response = await axios.get(`http://${SERVER_URL}/admin/approve/list`,
      //     {
      //         headers: { "Authorization": `Bearer ${admin?.access_token}` }
      //     });

      const response = await RequestAuth("GET", "/admin/approve/list");
      const info = response.data;
      console.log("dd", response);
      dispatch(addAllUser(info));
      //message.success(`${response.data.results.length} more users loaded!`);
    } catch (e) {
      toast.error("승인 실패");

      console.log("Error", e);
    }
  };

  useEffect(() => {
    if (!admin) return;
    appendData();
  }, [admin]);

  const onClickApprove = async (address: string) => {
    //승인하기

    const approvedUser = requestUser.find((data) => data.address === address); //승인하기 버튼 누른 유저정보

    try {
      const response = await RequestAuth("POST", "/admin/approve/complete", {
        address: approvedUser?.address,
        requestDay: approvedUser?.requestDay,
        requestPlace: approvedUser?.requestPlace,
      });
      if (response.status === 201) {
        if (approvedUser) {
          dispatch(addUser(approvedUser));
          dispatch(deleteUser(approvedUser));
        }
      }
    } catch (e: any) {
      console.log(e);
      toast.error("승인 실패");
    }
  };
    const onClickReject = (address: string) => {
    //거절하기

    const approvedUser = requestUser.find((data) => data.address === address); //승인하기 버튼 누른 유저정보
    if (approvedUser) {
      dispatch(deleteUser(approvedUser));
    }
    RequestAuth("POST", "/admin/approve/reject", {
      address: approvedUser?.address,
      requestDay: approvedUser?.requestDay,
      requestPlace: approvedUser?.requestPlace,
    });
  };

  //@@@@@ react-table@@@@@

  let arr:any=[]
  let i=0;
  for(let i=0; i<125; i++){
    arr.push({ 
      profile: <img  width="50" height="50" style={{borderRadius:"30%"}}src={"http://13.209.200.101/public/d8031c82-ce27-4709-87e9-c4b32f2d6431.png"}></img>,
    nickname: "sdsdwdwdw",
    sex: "남자",
    requestDay: i,
    address: "0x21232nbnj2j2pnijo2203123223n2n32n32j3kd",
    button: 
      <ButtonWrapper>
        <Button id="btn1" type={"green"} width={85} height={32} value={"승인하기"}></Button>
        <Button type={"black"} width={85} height={32} value={"거절하기"}></Button>
        
      </ButtonWrapper>})
   
  };
  
  const columns = useMemo(() => [
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
    {
      Header: "",
      accessor: "button",
    },
  ], []);
  const temp = useMemo(
    () => arr,
    []
  );

  const data = useMemo(
    () =>
      requestUser.map((v) => ({
  
        profile : (<Profile  width="60" height="60" src={`http://${SERVER_URL}${v.user.profile}`}></Profile>),
        nickname: v.user.nickname,
        requestDay: v.requestDay,
        sex: v.user.sex,
        address: v.address,
        button: (
          <ButtonWrapper>
            <Button type={"green"} width={85} height={32} value={"승인하기"}
              onClick={() => onClickReject(v.address)} />
            <Button id="btn1"type={"black"} width={85} height={32} value={"거절하기"}
              onClick={() => onClickApprove(v.address)} />
          </ButtonWrapper>
        ),
      })),
    [requestUser]
  );

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  return (
    <div>
      <Title>Approval requests list</Title>
    <div>
      <Table columns={columns} data={temp} />
    </div>
    </div>
  );
}
export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  #btn1{
    margin-right: 10px;
  }
`;

export const Profile = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 30%;
`
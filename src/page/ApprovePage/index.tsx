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
import {useQuery} from "react-query";
import queryClient from "../../queries";
import ConfirmModal from "../../components/Modal";

export interface IApproveUser {
  profile: string;
  nickname: string;
  sex: string;
  requestDay: number;
  address: string;
}
export default function ApprovePage() {

  const {data: approveList} = useQuery<Record<string, any>[]>("approveList");

  const [isModal,setModal] = useState({
    content: "",
    open: false,
    func: () => {},
  });
  const onClickApprove = async (address: string) => {
    //승인하기

    const approvedUser = approveList?.find((data) => data.address === address); //승인하기 버튼 누른 유저정보

    try {
      const response = await RequestAuth("POST", "/admin/approve/complete", {
        address: approvedUser?.address,
        requestDay: approvedUser?.requestDay,
        requestPlace: approvedUser?.requestPlace,
      });
      if (response.status === 201) {
        toast("승인 성공");
        queryClient.invalidateQueries(["approveList"]);
      }
    } catch (e: any) {
      console.log(e);
      toast.error("승인 실패");
    }
  };
    const onClickReject = async (address: string) => {
    //거절하기
    const approvedUser = approveList?.find((data) => data.address === address); //승인하기 버튼 누른 유저정보
    const response = await RequestAuth("POST", "/admin/approve/reject", {
      address: approvedUser?.address,
      requestDay: approvedUser?.requestDay,
      requestPlace: approvedUser?.requestPlace,
    });
    if(response.status === 201) {
      toast("거절 성공");
      setModal({
        ...isModal,
        open:false,
      })
      queryClient.invalidateQueries(["approveList"]);
    }
  };

  //@@@@@ react-table@@@@@
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



  const data = useMemo(
    () =>
      approveList?.map((v) => ({
  
        profile : (<Profile  width="60" height="60" src={`http://${SERVER_URL}${v.user.profile}`}></Profile>),
        nickname: v.user.nickname,
        requestDay: v.requestDay,
        sex: v.user.sex,
        address: v.address,
        button: (
          <ButtonWrapper>
            <Button type={"green"} width={85} height={32} value={"승인하기"}
              onClick={() => onClickApprove(v.address)} />
            <Button id="btn1"type={"black"} width={85} height={32} value={"거절하기"}
              onClick={() => setModal({
                content: "거절",
                func: () => onClickReject(v.address),
                open:true
              })} />
          </ButtonWrapper>
        ),
      })) ?? [],
    [approveList]
  );

  return (
    <div>
      <ConfirmModal open={isModal.open} onClose={() => setModal({
        ...isModal,
        open:false
      })} content={isModal.content === "승인" ? "정말로 승인하시겠습니까 ?" : "정말로 승인을 거절하시겠습니까 ?"} yesLabel={isModal.content} onYes={isModal.func}/>
      <Title>Approval requests list</Title>
    <div>
      <Table columns={columns} data={data} />
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
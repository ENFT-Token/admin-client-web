import React, { useEffect, useRef,useState } from "react";
import { List, message, Avatar, Button } from "antd";
import VirtualList from "rc-virtual-list";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUser, addAllUser, deleteUser, IUser } from "../../models/members";
import { Rootstate } from "../../models";
import styled from "styled-components";
import { SERVER_URL } from "../../confing";
import Lists from 'rc-virtual-list';
import { isMetaProperty } from "typescript";
import ApprovePost from "./ApprovePost";
export default function ApprovePage() {
  /////redux///////////
  const requestUser = useSelector((store: Rootstate) => store.members.user);
  const admin = useSelector((store: Rootstate) => store.admin.adminInfo);
  const dispatch = useDispatch();

  const fakeDataUrl =
    "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo";
  const ContainerHeight = 500;

  const onClickApprove = (address: string) => { //승인하기

    const approvedUser = requestUser.find((data) => data.address === address); //승인하기 버튼 누른 유저정보
    if (approvedUser) {
      dispatch(addUser(approvedUser));
      dispatch(deleteUser(approvedUser));
    }
   

  };

  const onClickReject = (address: string) => { //거절하기

    const approvedUser = requestUser.find((data) => data.address === address); //승인하기 버튼 누른 유저정보
    if (approvedUser) {
      dispatch(deleteUser(approvedUser));
    }
  };

  const appendData = async () => {
    try {
      const response = await axios.get(`http://${SERVER_URL}/admin/approve/list`,
        {
          headers: { "Authorization": `Bearer ${admin?.access_token}` }
        });
      const info = response.data
      dispatch(addAllUser(info));
      //message.success(`${response.data.results.length} more users loaded!`);

    } catch (e) {
      console.log("Error", e);
    }
  };

  useEffect(() => {
    if (!admin) return;

    appendData();
  }, [admin]);

  const onScroll = (e: any) => {
    if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {
      appendData();
    }
  };


  return (
    <div>


      <div>Customers who requested approval</div>
      {/* <Lists data={[0, 1, 2]} height={200} itemHeight={30} itemKey="id">
  {index => <div>{index}</div>}
</Lists>; */}
      {requestUser.map(v => (<div>{v.user.location} {v.user.nickname}  {v.user.sex}</div>))}
      <List>
        <VirtualList
          data={requestUser}
          height={ContainerHeight}
          itemHeight={47}
          itemKey="address"
          onScroll={onScroll}
        >
          {(item) => (
            <List.Item key={item.address}>
              <List.Item.Meta
                title={item.address}
                description={item.requestDay}
              />
              <ButtonWrapper>
                <Button id="btn1" type="primary" ghost onClick={() => onClickApprove(item.address)}>승인하기</Button>
                <Button id="btn2" type="primary" danger ghost onClick={() => onClickReject(item.address)}>거절하기</Button>
              </ButtonWrapper>
            </List.Item>


            //@@@@@@@ fakedata list @@@@@@@
            // <List.Item key={item.email}>
            //   <List.Item.Meta
            //     avatar={<Avatar src={item.picture.large} />}
            //     title={<a href="https://ant.design">{item.name.last}</a>}
            //     description={item.email}
            //   />
            //   <ButtonWrapper>
            //     <Button id="btn1" type="primary" ghost onClick={() => onClickApprove(item.email)}>승인하기</Button>
            //     <Button id="btn2" type="primary" danger ghost onClick={() => onClickReject(item.email)}>거절하기</Button>
            //   </ButtonWrapper>
            // </List.Item>
          )}
        </VirtualList>
      </List>
    </div>
  );
}

const ButtonWrapper = styled.div`
   #btn1{

     margin-right:10px;
   }
`
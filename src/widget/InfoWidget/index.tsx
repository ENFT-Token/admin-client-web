import React, { useEffect } from 'react'
import { CgProfile } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Rootstate } from '../../models';
import "./index.css";
export default function InfoWidget() {
  const admin = useSelector((store: Rootstate) => store.admin.adminInfo);
  return (
    <div className='containerInfo'>
      <div className='headerInfo'>
        <CgProfile className="profile" size="85" />
        <div>관리자</div>
      </div>
      <div className="bodyInfo">
        <div className="nickname info">안녕하세요 {admin?.nickname}님</div>
        <div className="location info"><Header>헬스장 주소</Header>{admin?.location}</div>
        <div className="phone info"><Header>헬스장 번호</Header>{admin?.phone}</div>
        <div className="walletAddress info"><Header>{admin?.nickname} 님의 지갑 주소</Header>{admin?.address}</div>
      </div>
      <table>
     
      </table>
    </div>
  )
}

const Header = styled.span`
   color:rgb(148, 143, 143);
   margin-right: 30px;
`

 
  


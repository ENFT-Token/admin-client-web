import React, { useEffect } from 'react'
import { CgProfile } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import { Rootstate } from '../../models';
export default function InfoWidget() {
  const admin = useSelector((store: Rootstate) => store.admin.adminInfo);
  return (
    <div>
      <CgProfile className="profile" size="70"/>
      <div className="nickname info">안녕하세요 {admin?.nickname}님</div>
      <div className="location info">헬스장 주소 : {admin?.location}</div>
      <div className="phone info">헬스장 번호 : {admin?.phone}</div>
      <div className="walletAddress info">{admin?.nickname} 님의 지갑 주소 : {admin?.address}</div>
    </div>
  )
}

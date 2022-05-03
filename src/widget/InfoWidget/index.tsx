import React, { useEffect } from 'react'
import { CgProfile } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import { Rootstate } from '../../models';
export default function InfoWidget() {
  const admin = useSelector((store: Rootstate) => store.admin.adminInfo);
  useEffect(()=>{
    console.log(admin)
  },[])
  return (
    <div>
      <CgProfile className="profile" size="70"/>

    </div>
  )
}

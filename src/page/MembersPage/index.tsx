import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Rootstate } from '../../modules';

export default function MembersPage() {
  const user = useSelector((store: Rootstate) => store.members.approveUser);
  //const dispatch = useDispatch();
  console.log("members page : ",user);


  if(!user){
    return(<div>Loading...</div>)
  }
  return (
    <div>MembersPage
        <div>{user.map(v=><div>{v.email}</div>)}</div>
    </div>
    
  )
}

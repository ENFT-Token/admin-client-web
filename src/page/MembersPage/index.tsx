import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Rootstate } from '../../modules';

export default function MembersPage() {
  const ArvUser = useSelector((store: Rootstate) => store.members.approveUser);



  if(!ArvUser){
    return(<div>Loading...</div>)
  }
  return (
    <div>MembersPage
        <div>{ArvUser.map(v=><div>{v.email}</div>)}</div>
    </div>
    
  )
}

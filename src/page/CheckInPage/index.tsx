import React, { useEffect, useMemo, useState } from 'react'
import { SERVER_URL } from '../../confing';
import { RequestAuth } from '../../models/Request';
import Table, { Title } from '../../widget/TableWidget';
import { Profile } from '../ApprovePage';
import { IListData } from '../MembersPage';


export default function CheckIn()  {
  const [checkList,setCheckList] = useState<IListData[]>([]);
  useEffect(()=>{
    const fetch = async ()=>{
      try{
        const response = await RequestAuth("GET","/check/count");
        setCheckList(response.data)
        console.log("response",response.data)
      }
      catch(e){
        
      }
    }
    fetch();
  },[])
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
    checkList.map((v) => {
      return{
        profile : (<Profile  width="60" height="60" src={`http://${SERVER_URL}${v.profile}`}></Profile>),
        nickname: v.nickname,
        //requestDay: v.,
        sex: v.sex,
        address: v.address,
      }
      }),
    [checkList]
  );
  return (
    

    <div>
      <Title>Members checking in to the GYM</Title>
       <Table columns={columns} data={data} />
    </div>
    
  )
}

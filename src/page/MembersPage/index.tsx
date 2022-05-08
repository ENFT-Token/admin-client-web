import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../models";
import { List, Avatar, Space } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import axios from "axios";
import { SERVER_URL } from "../../confing";



interface IListData{ //렌더링계속되므로 함수밖에 작성
  href:string;
  title:string;
  avatar:string;
  description:string;
  content:string;
}



export default function MembersPage() {
  const arvUser = useSelector((store: Rootstate) => store.members.approvedUser);
  const [listData, setListData] = useState<IListData[]>([]);
  const getMembers = async () => {
    try{
      const response = await axios.get(`http://${SERVER_URL}/admin/memberAddress`)
    }
    catch(e){
      console.log("error",e);
    }
  }
  useEffect(()=>{
    getMembers();
  },[])
  // useEffect(() => {
  //   setListData(arvUser.map(v => ({
  //     href: "https://ant.design",
  //     title: `${v.name.last}`,
  //     avatar: `${v.picture.medium}`,
  //     description: `${v.gender}`,
  //     content: `${v.email}`,
  //   })))
  // }, [arvUser]);
  
  // useEffect(() => {
  //   console.log(listData);
  // }, [listData]);

  if (!arvUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>

    </div>
  );
}

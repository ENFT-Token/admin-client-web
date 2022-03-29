import React, { useState, useEffect } from "react";
import { List, message, Avatar } from "antd";
import VirtualList from "rc-virtual-list";
import axios from "axios";

export default function ApprovePage() {

  const fakeDataUrl =
    "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo";
  const ContainerHeight = 500;

  const [data, setData] = useState<any[]>([]); //승인요청하는 유저들(useState로 관리)

  const onClickApprove =(email:string) =>{
    //승인버튼 누르면 유저는 (승인된)회원 페이지로 이동(redux)
    //일단 삭제만 구현
    const approvedUser=data.filter((data) => data.email === email); //승인하기 버튼 누른 유저정보
    setData(data.filter((data) => data.email !== email)); //승인후 유저 재구성
  }
  const onClickReject=(email:string)=>{
    //거절하면 리스트에서 삭제.
    setData(data.filter((data) => data.email !== email)); 
  }
  const appendData = async () => {
    try {
      const response = await axios(fakeDataUrl);
      setData(data.concat(response.data.results))
      message.success(`${response.data.results.length} more users loaded!`);
      console.log(data)
    } catch {
      console.log("Error");
    }
  };

  useEffect(() => {
    appendData();
  }, []);
  
  const onScroll = (e: any) => {
    if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {
      appendData();
    }
  };

  return (
    <List>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {(item) => (
          <List.Item key={item.email}>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">
                {item.name.last}</a>}
              description={item.email}
            />

            
            <button onClick={()=>onClickApprove(item.email)}>승인하기</button>
            <button onClick={()=>onClickReject(item.email)}>거절하기</button>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
}

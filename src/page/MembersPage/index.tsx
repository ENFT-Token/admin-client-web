import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { List, Avatar, Space } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";

// const IconText = ({ icon, text }:any) => (
//   <Space>
//     {React.createElement(icon)}
//     {text}
//   </Space>
// );

interface IListData {
  //렌더링계속되므로 함수밖에 작성
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
}

export default function MembersPage() {
  const arvUser = useSelector((store: RootState) => store.members.approveUser);
  const [listData, setListData] = useState<IListData[]>([]);

  useEffect(() => {
    setListData(
      arvUser.map((v) => ({
        href: "https://ant.design",
        title: `${v.name.last}`,
        avatar: `${v.picture.medium}`,
        description: `${v.gender}`,
        content: `${v.email}`,
      }))
    );
  }, [arvUser]);

  // useEffect(() => {
  //   console.log(listData);
  // }, [listData]);

  if (!arvUser) {
    return <div>Loading...</div>;
  }

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log("page : ", page);
        },
        pageSize: 10,
      }}
      dataSource={listData}
      footer={
        <div>
          <b>ant design</b> footer part
        </div>
      }
      renderItem={(item: any) => (
        <List.Item
          key={item.title}
          extra={
            <img
              width={200}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<a href={item.href}>{item.title}</a>}
            description={item.description}
          />
          {item.content}
        </List.Item>
      )}
    />
  );
}

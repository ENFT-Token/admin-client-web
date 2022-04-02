import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Rootstate } from '../../modules';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const listData:any = [];

for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

// const IconText = ({ icon, text }:any) => (
//   <Space>
//     {React.createElement(icon)}
//     {text}
//   </Space>
// );
export default function MembersPage() {
  const arvUser = useSelector((store: Rootstate) => store.members.approveUser);

 
  if(!arvUser){
    return(<div>Loading...</div>)
  }



  return (
    <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log("page : ",page);
      },
      pageSize: 10,
    }}
    dataSource={listData}
    footer={
      <div>
        <b>ant design</b> footer part
      </div>
    }
    renderItem={(item:any) => (
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
    
  )
}

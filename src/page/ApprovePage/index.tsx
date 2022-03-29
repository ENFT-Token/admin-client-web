import React, { useState, useEffect } from "react";
import { List, message, Avatar } from "antd";
import VirtualList from "rc-virtual-list";
import axios from "axios";

export default function ApprovePage() {
  const fakeDataUrl =
    "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo";
  const ContainerHeight = 500;

  const [data, setData] = useState<any[]>([]);
  

  // const appendData = () => {
  //   fetch(fakeDataUrl)
  //     .then(res =>(res.json()))
  //     .then(body => {
  //       setData(data.concat(body.results));
  //       message.success(`${body.results.length} more items loaded!`);
  //     });
  // };

  const appendData = async () => {
    try {
      const response = await axios(fakeDataUrl);
      setData(data.concat(response.data.results))
      message.success(`${response.data.results.length} more items loaded!`);
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
              title={<a href="https://ant.design">{item.name.last}</a>}
              description={item.email}
            />
            <div>Content</div>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
}

import { Table, Badge, Menu, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';





export default function NestedTable(){

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'text', dataIndex: 'text', key: 'upgradeNum' },
    { title: 'Creator', dataIndex: 'creator', key: 'creator' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      name: 'Screem',
      text: 'iOsdsdsdsdsdsdsdsdssssssssssssssssdsdsdsdsdsdsdsdS',
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
    });
  }

  return (
    <Table
      className="components-table-demo-nested"
      columns={columns}
      dataSource={data}
    />
  );
}

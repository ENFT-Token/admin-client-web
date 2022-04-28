import { Table, Input, Button, Popconfirm } from 'antd';
import { useState,useRef } from 'react'




export default function NestedTable() {
  const [memoList, setMemoList] = useState([] as any);
  const [inputBody, setInputBody] = useState([] as any);
  const [inputHead, setInputHead] = useState([] as any);
  const date = new Date();
  //input 
  const { TextArea } = Input;
  const num = useRef(1);
  const onChangeBody = (e: any) => {
    setInputBody(e.target.value);
  };
  const onChangeHead = (e: any) => {
    setInputHead(e.target.value);
  };
  const OnClickBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (inputBody && inputHead) {
      setMemoList([
        ...memoList,
        {
          id : num.current++,
          name: inputHead,
          text: inputBody,
          createdAt: date.toString().substr(0,25),
        },
      ]);
      setInputHead("");
      setInputBody("");
    }
  }
  const handleDelete =(id:number)=>{
    setMemoList([
      ...memoList.filter((v:any)=>v.id !== id)
    ])
  }
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'text', dataIndex: 'text', key: 'upgradeNum' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Action',dataIndex: 'id', key: 'operation', render: (id : number) => 
    <Popconfirm title="삭제하시겠습니까?" onConfirm={() => handleDelete(id)}> 
    <Button danger ghost>Delete</Button>  
    </Popconfirm>
    },
  ];

  return (
    <div>
      <Table
        className="components-table-demo-nested"
        columns={columns}
        dataSource={memoList}
      />
      <Input placeholder="작성자 이름" onChange={onChangeHead} value={inputHead}/>
      <TextArea placeholder="내용" 
      value={inputBody} showCount maxLength={100} autoSize={{ minRows: 5, maxRows: 5 }} onChange={onChangeBody} />
      
      <Button onClick={OnClickBtn}>확인</Button>
      
    </div >
  );
}





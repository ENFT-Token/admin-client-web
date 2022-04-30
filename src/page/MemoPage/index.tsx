import { Table, Input, Button, Popconfirm } from 'antd';
import { useState,useRef, useEffect } from 'react'


export default function NestedTable() {
  const [memoList, setMemoList] = useState([] as any);
  const [inputBody, setInputBody] = useState([] as any);
  const [inputHead, setInputHead] = useState([] as any);
  const [localMemoList, setlocalMemoList] = useState([] as any);
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

  useEffect(()=>{
    const bodyString = window.localStorage.getItem('body');
    setMemoList(JSON.parse(bodyString as string))
  },[])

  useEffect(()=>{
    const tempObjBody = JSON.stringify(memoList);
    window.localStorage.setItem('body',tempObjBody);
    const bodyString = window.localStorage.getItem('body');
    console.log(window.localStorage.getItem('body'))
    setlocalMemoList(JSON.parse(bodyString as string));
  },[memoList])
 
  return (
    <div>
      <Table
        className="components-table-demo-nested"
        columns={columns}
        dataSource={localMemoList}
      />
      <Input placeholder="작성자 이름" onChange={onChangeHead} value={inputHead}/>
      <TextArea placeholder="내용" 
      value={inputBody} showCount maxLength={100} autoSize={{ minRows: 5, maxRows: 5 }} onChange={onChangeBody} />
      
      <Button onClick={OnClickBtn}>확인</Button>
      
    </div >
  );
}





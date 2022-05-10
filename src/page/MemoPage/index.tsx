import { Table, Input, Button, Popconfirm } from 'antd';
import { useState, useRef, useEffect } from 'react'


export default function NestedTable() {
  const [inputBody, setInputBody] = useState("");
  const [inputHead, setInputHead] = useState("");
  const [localMemoList, setlocalMemoList] = useState([] as any);
  const date = new Date();
  //input 
  const { TextArea } = Input;
  let num = useRef(1);
  const onChangeBody = (e: any) => {
    setInputBody(e.target.value);
  };
  const onChangeHead = (e: any) => {
    setInputHead(e.target.value);
  };
  const OnClickBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (inputBody && inputHead) {
      const addMemoList = [
        ...localMemoList,
        {
          id: num.current++,
          name: inputHead,
          text: inputBody,
          createdAt: date.toString().substr(0, 25),
        },
      ];

      setlocalMemoList(addMemoList); 
      setInputHead("");
      setInputBody("");
      const tempObjBody = JSON.stringify({num:num.current,list:addMemoList});
      window.localStorage.setItem('memo', tempObjBody);
    }
  }
  const handleDelete = (id: number) => {
    const addMemoList = localMemoList.filter((v: any) => v.id !== id)
    setlocalMemoList(addMemoList);
    num.current--;
    const tempObjBody = JSON.stringify({num:num.current,list:addMemoList});
    window.localStorage.setItem('memo', tempObjBody);

  }
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'text', dataIndex: 'text', key: 'upgradeNum' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: 'Action', dataIndex: 'id', key: 'operation', render: (id: number) =>
        <Popconfirm title="삭제하시겠습니까?" onConfirm={() => handleDelete(id)}>
          <Button danger ghost>Delete</Button>
        </Popconfirm>
    },
  ];

  useEffect(() => {
    let memo = (JSON.parse(window.localStorage.getItem('memo') as string))
    if(memo==null){
      const tempObjBody = JSON.stringify({num:0,list:[]});
      window.localStorage.setItem('memo', tempObjBody);
      memo = (JSON.parse(window.localStorage.getItem('memo') as string))

    }
    setlocalMemoList(memo.list)
    const numStorage = memo.num;
    num.current = numStorage
  }, [])



  return (
    <div>
      <Table
        className="components-table-demo-nested"
        columns={columns}
        dataSource={localMemoList}
        scroll={{ y: 350 }}
      />
      <Input placeholder="작성자 이름" onChange={onChangeHead} value={inputHead} />
      <TextArea placeholder="내용"
        value={inputBody} showCount maxLength={100} autoSize={{ minRows: 5, maxRows: 5 }} onChange={onChangeBody} />

      <Button onClick={OnClickBtn}>확인</Button>

    </div >
  );
}





import TextArea from "antd/lib/input/TextArea";
import React, {useState, useRef, useEffect, useMemo} from "react";
import Table from "../../widget/TableWidget";
import Button from "../../components/Button";
import moment from "moment";
import styled from "styled-components";

export interface IMemo {
  timestamp: number;
  value: string;
}


const StyleMemo = styled.div`
    display: flex;

    height: 100%;
  .content {
    flex: 1;
    padding:20px;
    &.text{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
`;

export default function MemoPage() {
  const [inputBody, setInputBody] = useState("");
  const [memoList,setMemoList] = useState<IMemo[]>([]);
  useEffect(() => {
      try {
          let memo: IMemo[] = [];
          if (!localStorage["memo"]) {
              localStorage["memo"] = JSON.stringify([]);
              memo = [];
          } else {
              memo = JSON.parse(localStorage["memo"]);
          }

          setMemoList(memo);
      }
      catch(e) {
          localStorage["memo"] = JSON.stringify([]);
          setMemoList([]);
      }
  }, []);

  const handleSave = () => {
      if(!inputBody) return;
        const _data = [...memoList, {
            timestamp: (new Date()).getTime(),
            value: inputBody,
        }];
      localStorage["memo"] = JSON.stringify(_data);
      setMemoList(_data);
      setInputBody("");
  }

    const handleDelete = (idx: number) => {
       const _data = memoList.filter((f,i) => i !== idx);
        localStorage["memo"] = JSON.stringify(_data);
        setMemoList(_data);
    }


    const columns = useMemo(
      () => [
        {
          Header: "날짜",
          accessor: "timestamp",
        },
        {
          Header: "내용",
          accessor: "value",
        },
        {
          Header: "관리",
          accessor: "run",
        },
      ],[]
  );


  return (
    <StyleMemo>
        <div className={"content text"}>
            <TextArea
                placeholder="내용"
                value={inputBody}
                showCount
                maxLength={100}
                rows={10}
                style={{height:"100%"}}
                onChange={(e) => setInputBody(e.target.value)}
            />
        <Button type={"blue"} onClick={handleSave} value={"저장"} width={"100%"} height={50} style={{marginTop:"40px",marginBottom:"40px"}} />
        </div>
        <div className={"content"}>
      <Table
          columns={columns}
          data={memoList.map((memo, idx) => ({
              timestamp: moment(memo.timestamp).format("yyyy-MM-DD hh:mm:ss"),
              value: memo.value,
              run:<Button onClick={() => handleDelete(idx)} type={"green"} value={"완료"} width={100} height={30} />,
          }))}
      />
        </div>
    </StyleMemo>
  );
}


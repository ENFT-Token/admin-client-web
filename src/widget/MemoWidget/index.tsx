import React, { useEffect, useMemo, useState } from 'react'

interface IMemo {
  id: string;
  name: string;
  text: string;
  createdAt: string
}

export default function MemoWidget() {
  // const [list, setList] = useState<IMemo[]>([]);
  // useEffect(()=>{
  //   const bodyString = window.localStorage.getItem('body');
  //   setList(JSON.parse(bodyString as string));
  // },[])
  const list = useMemo(()=>{
    const bodyString = window.localStorage.getItem('body');
    return JSON.parse(bodyString as string);
  },[])

  return (
    <div>
      <h1>관리자 메모</h1>
      {list.map((v:IMemo) => (
        <li>
          {v.text}
        </li>
      ))}

    </div>
  )
}

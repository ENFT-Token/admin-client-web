import React, { useEffect, useState } from 'react'

interface IMemo {
  id: string;
  name: string;
  text: string;
  createdAt: string
}

export default function MemoWidget() {
  const [list, setList] = useState<IMemo[]>([]);
 
  useEffect(()=>{
    const bodyString = window.localStorage.getItem('body');
    setList(JSON.parse(bodyString as string));
  },[])

  return (
    <div>
      {list.map((v) => (
        <li>
          {v.text}
        </li>
      ))}

    </div>
  )
}

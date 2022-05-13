import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import { Rootstate } from '../../models';
import { FcCheckmark } from "react-icons/fc";
import styled from 'styled-components';
export default function Alarm() {
    const list = useMemo(() => {
        const bodyString = window.localStorage.getItem("memo");
        return JSON.parse(bodyString as string).list.length;
    }, []);
    const userCount = useSelector((store: Rootstate) => store.members.approvedUser.length)

    return (
        <div>
            <div><FcCheckmark style={{ marginRight: "15px" }} />현재 관리자 메모가 <Text>{list} 개</Text> 있습니다</div>
            <div><FcCheckmark style={{ marginRight: "15px" }} />현재 승인 요청한 유저가 <Text>{userCount} 명</Text> 입니다.</div>
        </div>
    )
}




const Text = styled.span`
        color:white;
        border:10px;
        border-radius: 5px;
        background-color: #009416;
        padding:5px 10px;
`

import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import { Rootstate } from '../../models';

export default function Alarm() {
    const list = useMemo(() => {
        const bodyString = window.localStorage.getItem("memo");
        return JSON.parse(bodyString as string).list.length;
    }, []);
    const userCount = useSelector((store: Rootstate) => store.members.approvedUser.length)

    return (
        <div>
            <div>현재 관리자 메모가 {list}개 있습니다</div>
            <div>현재 승인 요청한 유저가 {userCount}명입니다.</div>
        </div>
    )
}

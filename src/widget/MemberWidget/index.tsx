import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../confing'
import { IApprove } from '../../models/members'

export default function MemberWidget() {
    const [list, setList] = useState<any>([])
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://${SERVER_URL}/admin/memberAddress`)
                setList(response.data)
            }
            catch (e) {
                console.log("error", e);
            }
            fetch();
        }
    }, [])
    return (
        <div>
            <h1>현재 승인된 유저들</h1>
            {list.map((v: IApprove) => (
                <li>
                    {v.user.profile} {v.user.nickname}{v.user.sex}
                </li>
            ))}
        </div>
    )
}

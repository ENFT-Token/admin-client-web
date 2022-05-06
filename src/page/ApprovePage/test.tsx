import axios from 'axios';
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SERVER_URL } from '../../confing';
import { Rootstate } from '../../models';
import { addAllUser } from '../../models/members';
import styled from "styled-components";

export default function ArrovePage() {
    const requestUser = useSelector((store: Rootstate) => store.members.user);
    const admin = useSelector((store: Rootstate) => store.admin.adminInfo);
    const dispatch = useDispatch();
    const appendData = async () => {
        try {
            const response = await axios.get(`http://${SERVER_URL}/admin/approve/list`,
                {
                    headers: { "Authorization": `Bearer ${admin?.access_token}` }
                });
            const info = response.data
            dispatch(addAllUser(info));
            //message.success(`${response.data.results.length} more users loaded!`);

        } catch (e) {
            console.log("Error", e);
        }
    };

    useEffect(() => {
        if (!admin) return;
        appendData();
    }, [admin]);



    //@@@@@ react-table@@@@@
    const columnData = [
        {
            Header: '닉네임',
            accessor: 'nickname'
        },
        {
            Header: '성별',
            accessor: 'sex'
        },
        {
            Header: '만료일',
            accessor: 'requestDay'
        },
        {
            Header: '지갑 주소',
            accessor: 'address'
        }
    ];
    const columns = useMemo(() => columnData, []);


    return (
        <div>test</div>
    )
}



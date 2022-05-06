import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SERVER_URL } from '../../confing';
import { Rootstate } from '../../models';
import { addAllUser } from '../../models/members';
import styled from "styled-components";
import { usePagination, useTable } from 'react-table'


export interface IApproveUser{
    nickname:string;
    sex: string;
    requestDay: number;
    address: string;
}
const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

function Table({ columns, data }: any) {
    const {
        getTableProps, //table head
        getTableBodyProps, //table body
        headerGroups, // header 부분에 들어갈 data 담고있음.
        prepareRow, //각각의 data들을 한 줄씩 묶음으로 가공
        rows, //전달한 data를 받는 곳

        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } =
        useTable(
            {
                columns,
                data,
                initialState: { pageIndex: 2 },
            },
            usePagination
        )

    return (
        <div>
            <pre>
                <code>
                    {
                        JSON.stringify({
                            pageIndex,
                            pageSize,
                            pageCount,
                            canNextPage,
                            canPreviousPage,
                        },
                            null,
                            2
                        )}
                </code>
            </pre>

            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    )
}



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
    

    const data = useMemo(() => requestUser.map(v => ({
        "nickname": v.user.nickname,
        "sex": v.user.sex,
        "requestDay": v.requestDay,
        "address": v.address
    })), [requestUser])
    
    useEffect(()=>{
        console.log("data",data)
    },[data])


    return (
        <Styles>
            <Table columns={columns} data={data} />
        </Styles>

    )
}



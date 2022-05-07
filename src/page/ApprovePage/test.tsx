import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SERVER_URL } from '../../confing';
import { Rootstate } from '../../models';
import { addAllUser, addUser, deleteUser } from '../../models/members';
import styled from "styled-components";
import { usePagination, useTable } from 'react-table'
import { Button } from "antd";

export interface IApproveUser {
    nickname: string;
    sex: string;
    requestDay: number;
    address: string;
}
const Styles = styled.div`
  padding: 1rem;

  table {
    width:100%;
    text-align: center;
    border-spacing: 0;
    border: 1px solid black;
   tr{
    :last-child {
        td {
          border-bottom: 0;
        }
      }
   }
  }
  th, td{
      margin:0;
      padding-right: 1rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      
      :last-child {
        border-right: 0;
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
                initialState: { pageIndex: 0 },
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
                            1
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
            <div className="pagination">
                <button onClick={()=> gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={()=> previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={()=> nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={()=> gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex+1} of {pageOptions.length}
                    </strong>
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style = {{width : '100px'}}
                        >
                    </input>
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e =>{
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40,50].map(pageSize =>(
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
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

    const onClickApprove = (address: string) => { //승인하기

        const approvedUser = requestUser.find((data) => data.address === address); //승인하기 버튼 누른 유저정보
        if (approvedUser) {
            dispatch(addUser(approvedUser));
            dispatch(deleteUser(approvedUser));
        }

    };

    const onClickReject = (address: string) => { //거절하기

        const approvedUser = requestUser.find((data) => data.address === address); //승인하기 버튼 누른 유저정보
        if (approvedUser) {
            dispatch(deleteUser(approvedUser));
        }
    };

    //@@@@@ react-table@@@@@
    const columnData = [
        // {
        //     Header:'프로필',
        //     accessor:'profile'
        // },
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
        },
        {
            Header: '버튼',
            accessor: 'button'
        }
    ];
    const columns = useMemo(() => columnData, []);


    const data = useMemo(() => requestUser.map(v => ({
        // "profile" : v.user.profile,
        "nickname": v.user.nickname,
        "sex": v.user.sex,
        "requestDay": v.requestDay,
        "address": v.address,
        "button": (
            <ButtonWrapper>
                <Button id="btn1" type="primary" ghost onClick={() => onClickApprove(v.address)}>승인하기</Button>
                <Button id="btn2" type="primary" danger ghost onClick={() => onClickReject(v.address)}>거절하기</Button>
            </ButtonWrapper>)
    })), [requestUser])

    useEffect(() => {
        console.log("data", data)
    }, [data])


    return (
        <Styles>
            <Table columns={columns} data={data} />
        </Styles>

    )
}
const ButtonWrapper = styled.div`

    #btn1{
    margin-right:10px;
    }
`

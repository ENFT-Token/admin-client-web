import React, { useEffect, useState } from "react";
import { usePagination, useTable, } from "react-table";
import styled from "styled-components";

import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";
const LIST_NUM = 6;
export default function Table({ columns, data, pagination }: any) {
  const {
    getTableProps, //table head
    getTableBodyProps, //table body
    headerGroups, // header 부분에 들어갈 data 담고있음.
    prepareRow, //각각의 data들을 한 줄씩 묶음으로 가공
    page, //전달한 data를 받는 곳

    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 6 },
    },
    usePagination
  );
    const [ pageNum,setPageNum] = useState(0);

    useEffect(()=>{
      console.log("num",pageNum,pageCount,pageIndex)
    },[])
  return (
    <div>
      <div>
      {/* <pre>
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
            </pre> */}

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((page: any) => {
            prepareRow(page);
            return (
              <tr {...page.getRowProps()}>
                {page.cells.map((cell: any) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
     </div>


     <div className="total">dd</div>
        <Paginations>
        
          <div className="buttonWrap">
            <IoIosArrowBack className="arrow"  onClick={() => setPageNum((v) => (Math.max(0, v - 1)))} >{"<"}</IoIosArrowBack>
            <span id="buttonList">
              {pageOptions.filter(v => {
                if (pageNum === 0)
                  return 0 <= v && v <= LIST_NUM - 1
                else {
                  return (pageNum * LIST_NUM) - 1 < v && v <= (LIST_NUM * (pageNum + 1)) - 1
                } 
              })
                .map((v) => (<button className={`btnEach ${pageIndex === v ? "select" : "" }`} onClick={(() => gotoPage(v))}>{v + 1}</button>))
              }
            </span>
            <IoIosArrowForward className="arrow" onClick={() => setPageNum((v) => (Math.min(Math.floor(pageCount / LIST_NUM), v + 1)))}>{">"}</IoIosArrowForward>
          </div>
        </Paginations>

    </div>
  );
}
const Paginations = styled.div`

  &{
  display: flex;
  justify-content: center;
  margin-top:50px;
  }
  .buttonWrap{
  display: flex;
  align-items: center;
  
}
  .arrow{
    background-color:#f9f9f9;
    border-radius: 10px;
    text-align: center;
    margin-left:20px;
    margin-right:20px;
    cursor: pointer; 

    border: 1px solid #C2C2C2;
    width:35px;
    height:35px;
    color:#6418c3;
  }

  #buttonList{
  background-color:#f9f9f9;
  border:1px solid rgba(117,147,170,0.4);
  border-radius: 10px;

   
    .btnEach{
      background-color:#f9f9f9;
      width:45px;
      height:35px;
      border:none;
      border-radius: 10px;
      cursor: pointer; 
      font-size: 15px;
      text-align: center;



      &.select{
        color: white;
        font-weight: 700;
        background: #1879C3 0% 0% no-repeat padding-box;
      }
  }
  .btnEach:hover{
      background: #1879C3 0% 0% no-repeat padding-box;
    transition: 0.2s;
    color:white;
    box-shadow: 0px 7px 16px #00000024;
    }
  }
`



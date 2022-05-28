import React, { useEffect, useState } from "react";
import { Column, usePagination, useTable, } from "react-table";
import styled from "styled-components";

import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";
const LIST_NUM = 6;

type ColumnType = "Header" | "accessor";
export interface ITableProps {
  columns:Record<ColumnType, string>[]; 
  data:any;
}

const StyleTable = styled.table`
  box-shadow : 1px 1px 3px 1px rgb(0 0 0 / 0.2);
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border-radius: 15px;


  text-align: center;
  width: 100%;

  border-spacing: 0;

  th { //head
    margin: 0;
    padding: 20px;
    border-bottom: 2px solid rgba(214, 215, 217,0.5);


    :last-child {
      border-right: 0;
    }
  }
  td{ // body
    padding: 25px;
    border-bottom: 1px solid rgba(214, 215, 217,0.5);
    height:50px;
  }


`;

export default function Table({ columns, data } : ITableProps) {
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
    <div style={{
        padding: "1.5rem",
        width: "100%",
    }}>
      <TableForm>
     

      <StyleTable {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="tableBody"{...getTableBodyProps()}>
          {page.map((_page) => {
            prepareRow(_page);
            return (
              <tr className="trBody"{..._page.getRowProps()}>
                {_page.cells.map((cell) => (
                  <td className="tdBody" {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </StyleTable>
     </TableForm>


     <div className="totalCount" style={{float:"right", fontSize:"20px", marginTop:"5px"}}>Total Count : {data.length}</div>
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
const TableForm  = styled.div`
  /* .trBody:hover{
    box-shadow : 3px 2px 2px 1px rgb(0 0 0 / 0.2);
    transition: 0.3s;
  } */
`
const Paginations = styled.div`

  &{
  display: flex;
  justify-content: center;
  margin-top:20px;
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


export const Title  = styled.h1`
  font-size:30px;
  margin:10px 0 0 40px;
` 
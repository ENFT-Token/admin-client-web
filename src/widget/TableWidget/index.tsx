import React, { useEffect, useState } from "react";
import { usePagination, useTable, } from "react-table";
import styled from "styled-components";
import Pagination from "@material-ui/lab/Pagination";

const MAX_PAGE_NUM = 5;
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
      initialState: { pageIndex: 0,pageSize:5},
    },
    usePagination
  );
    const [ pageNum,setPageNum] = useState(1);


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
     { (
        <div className="pagination">


          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <span>
            | Go to page:{" "}
            {/* <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            ></input> */}
          </span>
          {/* <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select> */}
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button>
          <button onClick={() => setPageNum((v)=>Math.max(0,v-1))} disabled={!canPreviousPage}>{"<"}</button>
          {pageOptions.filter(v=>v<=MAX_PAGE_NUM*pageNum && MAX_PAGE_NUM*(pageNum-1)<v)
          .map((v) =>(<button onClick={(()=>gotoPage(v))}>{v}</button>))
          }
          <button onClick={() => setPageNum((v)=>Math.min(pageCount/5,v+1))} disabled={!canNextPage}>{">"}</button>
          <button onClick={() => gotoPage(pageCount - 1)}disabled={!canNextPage}>{">>"}</button>
        </div>
      )}
    </div>
  );
}

// const Pagination = styled(pagination)`
  
// `
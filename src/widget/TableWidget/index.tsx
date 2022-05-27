import React, { useEffect, useState } from "react";
import { usePagination, useTable, } from "react-table";

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
    const [ pageNum,setPageNum] = useState(1);

  useEffect(() => {
    console.log("pageOptions", pageOptions.filter(v => {
      if (pageNum === 0)
        return 0 <= v && v <= LIST_NUM - 1
      else {
        return (pageNum * LIST_NUM) - 1 < v && v <= (LIST_NUM * (pageNum + 1)) - 1
      }
    }))



    console.log("pageNum", pageNum, pageCount);

  }, [pageNum])
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
          <div>
            <button className="arrow" onClick={() => setPageNum((v) => (Math.max(0, v - 1)))} >{"<"}</button>
            <span id="buttonList">
              {pageOptions.filter(v => {
                if (pageNum === 0)
                  return 0 <= v && v <= LIST_NUM - 1
                else {
                  return (pageNum * LIST_NUM) - 1 < v && v <= (LIST_NUM * (pageNum + 1)) - 1
                } 
              })
                .map((v) => (<button id="btnEach" onClick={(() => gotoPage(v))}>{v + 1}</button>))
              }
            </span>
            <button className="arrow" onClick={() => setPageNum((v) => (Math.min(Math.ceil(pageCount / LIST_NUM), v + 1)))} >{">"}</button>
          </div>
        </div>
      )}
    </div>
  );
}



const ButtonWrap = styled.div`

  *{
  
    background-color: white;
  }
  .arrow{
    border:1px solid rgba(117,147,170,0.4);
    border-radius: 10px;
    width:45px;
    height:35px;
    margin:10px;
    font-size: 15px;
    
    
  
  }

  #buttonList{
  border:1px solid rgba(117,147,170,0.4);
  border-radius: 10px;
  padding-top:8px;
  padding-bottom:8px;
  
    #btnEach:hover{
    background-color:rgba(132,166,208);
    transition: 0.2s;
    }
    #btnEach{
      width:45px;
      height:35px;
      border:none;
      border-radius: 10px;
      cursor: pointer; 
      font-size: 15px;
      text-align: center;
  }
  }
 

  

`


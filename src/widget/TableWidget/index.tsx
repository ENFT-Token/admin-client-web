import React from 'react'
import { usePagination, useTable } from 'react-table';

export default function Table({ columns, data }: any) {
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
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {page.map((page:any) => {
                        prepareRow(page);
                        return (
                            <tr {...page.getRowProps()}>
                                {page.cells.map((cell:any) => (
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
                    {[5,10, 20, 30, 40,50].map(pageSize =>(
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>

    )
}
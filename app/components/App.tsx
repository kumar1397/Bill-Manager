/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTable } from "react-table";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FilterandAdd from "./FilternAdd";
import "../styles.css";
import { deleteBill } from "../redux/actions";
import { Link } from "@tanstack/react-location";
import { columnInfo } from "../data";

// Define the Bill type
interface Bill {
  id: string;
  name: string;
  [key: string]: any;
}

export default function App() {
  const billInfo: Bill[] = useSelector((state: { bills: Bill[] }) => state.bills);

  const [currBills, setCurrBills] = useState<Bill[]>(billInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrBills(billInfo);
  }, [billInfo]);

  const data = React.useMemo(() => currBills, [currBills]);

  const columns = React.useMemo(
    () => [
      ...columnInfo,
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }: { row: any }) => (
          <div>
            <Link to={`editbill/${row.values.id}`}>
              <button value={row.values.name}>Edit</button>
            </Link>
            <button
              value={row.values.name}
              onClick={() => dispatch(deleteBill({ id: row.values.id }))}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [dispatch] // Include dispatch in the dependency array
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <>
      <div style={{ padding: "10px" }}>
        <FilterandAdd setCurrBills={setCurrBills} />
        <table {...getTableProps()} style={{ width: "100%" }}>
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={`headerGroup-${index}`}>
                {headerGroup.headers.map((column, colIndex) => (
                  <th
                    {...column.getHeaderProps()}
                    key={`column-${colIndex}`}
                    style={{
                      background: "aliceblue",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={`row-${rowIndex}`}>
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      {...cell.getCellProps()}
                      key={`cell-${rowIndex}-${cellIndex}`}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

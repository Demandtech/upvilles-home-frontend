import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";

import { TableColumnType, Tenant, TableRowsType } from "../../types/common";
import Dropdown from "../ui/Dropdown";

export default function MyTable({
  columns,
  rows,
}: {
  columns: Partial<TableColumnType>[];
  rows: Partial<TableRowsType>[];
}) {
  const renderCell = React.useCallback(
    (user: (typeof rows)[0], columnKey: React.Key, id: string | undefined) => {
      const cellValue = user[columnKey as keyof Tenant];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Dropdown rowId={id} />
            </div>
          );
        case "status":
          return (
            <div className="flex items-center gap-2">
              <div
                className={`border-2 h-4 w-4 rounded-full ${
                  typeof cellValue === "string" && cellValue === "Completed"
                    ? "bg-[#00D285] border-[#e2f7e4]"
                    : cellValue === "Overdue"
                    ? "bg-[#ff3b30] border-[#f7e8e2]"
                    : cellValue === "Scheduled"
                    ? "bg-[#007AFF] border-[#E3F4FD]"
                    : ""
                }`}
              ></div>
              {cellValue}
            </div>
          );
        default:
          return cellValue;
      }
    },
    [rows, columns]
  );

  return (
    <Table
      aria-label="Data table"
      isHeaderSticky
      classNames={{
        wrapper:
          "overflow-auto max-h-[335px] p-0 rounded-md shadow-none scrollbar-hide",
        thead: "[&>tr]:first:shadow-none",
      }}
    >
      <TableHeader className="" columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={
              column.uid === "actions" || column.uid === "unit_number"
                ? "center"
                : "start"
            }
            allowsSorting={column.sortable}
            className="bg-[#F3FBFF] rounded-none text-default shadow-none"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No tenant found"} items={rows}>
        {(item) => (
          <TableRow
            className={` border-b-2 border-[#F0F2F5] bg-[#FBFEFF] hover:bg-primary-50 transition-all duration-300 ease-linear`}
            key={item._id}
          >
            {(columnKey) => (
              <TableCell className="text-nowrap">
                {renderCell(item, columnKey, item._id)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

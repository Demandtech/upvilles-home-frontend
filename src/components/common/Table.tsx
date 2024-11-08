import React from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	SortDescriptor,
} from "@nextui-org/table";
import { TableColumnType } from "../../types/common";
import Dropdown from "../ui/Dropdown";
import { Tenant } from "../../types/tenant";
import { Spinner } from "@nextui-org/spinner";
import { Pagination } from "@nextui-org/pagination";
import moment from "moment";

interface TableProps {
	columns: Partial<TableColumnType>[];
	rows: Partial<Tenant>[];
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
	onView: (id: string) => void;
	isLoading?: boolean;
	page: number;
	setPage: (arg: number) => void;
	totalPage: number;
	setSortBy: (args: { column: string; direction: string }) => void;
}

export default function MyTable({
	columns,
	rows,
	onEdit,
	onDelete,
	onView,
	isLoading,
	page,
	setPage,
	totalPage,
	setSortBy,
}: TableProps) {
	const renderCell = React.useCallback(
		(item: (typeof rows)[0], columnKey: React.Key, id: string) => {
			const cellValue = item[columnKey as keyof Tenant];

			switch (columnKey) {
				case "actions":
					return (
						<div className="relative flex justify-center items-center gap-2">
							<Dropdown
								rowId={id}
								onDeleteClick={onDelete}
								onEditClick={onEdit}
								onViewClick={onView}
							/>
						</div>
					);
				case "status":
					return (
						<div className="flex items-center gap-2">
							<div
								className={`border-2 h-5 w-5 shadow-sm rounded-full ${
									typeof cellValue === "string" && cellValue === "completed"
										? "bg-[#00D285] border-[#e2f7e4]"
										: cellValue === "overdue"
										? "bg-[#ff3b30] border-[#f7e8e2]"
										: cellValue === "schedule"
										? "bg-[#007AFF] border-[#E3F4FD]"
										: ""
								}`}
							></div>
							{(cellValue as string) === "schedule"
								? "Upcoming"
								: cellValue.toString()}
						</div>
					);
				case "start_date":
					return moment(cellValue).format("MMMM DD, YYYY");
				case "end_date":
					return moment(cellValue).format();
				case "schedule_date":
					return moment(cellValue).format("MMMM DD, YYYY");
				default:
					return cellValue;
			}
		},
		[rows, columns]
	);

	return (
		<Table
			selectionMode="single"
			aria-label="Data table"
			isHeaderSticky
			bottomContent={
				totalPage > 0 && (
					<div className="flex w-full py-4 justify-center left-0 sticky bottom-0 bg-white">
						<Pagination
							isCompact
							showControls
							showShadow
							color="primary"
							page={page}
							total={totalPage}
							onChange={(page) => setPage(page)}
							size="sm"
						/>
					</div>
				)
			}
			onSortChange={(val: SortDescriptor) =>
				setSortBy({
					column: val.column as string,
					direction: val.direction as string,
				})
			}
			classNames={{
				wrapper:
					"overflow-auto h-full maxh-[500px]  p-0 rounded-md shadow-none scrollbar-hide",
				thead: "[&>tr]:first:shadow-none",
			}}
		>
			<TableHeader className="" columns={columns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={
							column.uid === "actions" || column.uid === "assigned_unit"
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
			<TableBody
				isLoading={isLoading}
				emptyContent="data is empty"
				loadingContent={<Spinner label="Loading.." />}
				items={rows}
			>
				{(item) => (
					<TableRow
						className={` border-b-2 border-[#F0F2F5] bg-[#FBFEFF]`}
						key={item._id}
					>
						{(columnKey) => (
							<TableCell className="text-nowrap capitalize">
								{renderCell(item, columnKey, item._id as string)}
							</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}

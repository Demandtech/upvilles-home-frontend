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
import { formatNaira } from "../../utils/formatCurrency";

interface TableProps {
	columns: Partial<TableColumnType>[];
	rows: Partial<Tenant>[];
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
	onView?: (id: string) => void;
	isLoading?: boolean;
	page?: number;
	setPage?: (arg: number) => void;
	totalPage?: number;
	setSortBy?: (args: { column: string; direction: string }) => void;
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
								className={`border-3 h-4 w-4 shadow-sm rounded-full ${
									typeof cellValue === "string" && cellValue === "completed"
										? "bg-[#00D285] border-[#e2f7e4]"
										: cellValue === "overdue"
										? "bg-[#ff3b30] border-[#f7e8e2]"
										: cellValue === "schedule"
										? "bg-[#007AFF] border-[#E3F4FD]"
										: cellValue === "pending"
										? "bg-[#FF9500] border-[#F7E8E2DB]"
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
				case "maintenance_fee":
					return formatNaira(cellValue);
				case "balance":
					return cellValue ? (
						formatNaira(cellValue)
					) : (
						<p className="font-bold text-2xl pl-5">&#45;</p>
					);
				case "rent_paid":
					return formatNaira(cellValue);
				case "property":
					return cellValue?.title;
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
				totalPage && totalPage > 1 ? (
					<div className="flex w-full py-3  justify-center left-0">
						<Pagination
							isCompact
							showControls
							showShadow
							color="primary"
							page={page}
							total={totalPage}
							onChange={(page) => setPage && setPage(page)}
							size="sm"
						/>
					</div>
				) : null
			}
			onSortChange={(val: SortDescriptor) => {
				if (setSortBy && val) {
					setSortBy({
						column: val.column as string,
						direction: val.direction as string,
					});
				}
			}}
			classNames={{
				wrapper:
					"overflow-auto min-h-[500px] gap-0 p-0 rounded-md shadow-none scrollbar-hide bg-lightBg",
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
						className="bg-[#F3FBFF] !rounded-r-none !rounded-l-none text-default shadow-none"
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody
				isLoading={isLoading}
				emptyContent="No data to display!"
				loadingContent={<Spinner label="Loading.." />}
				items={rows ? rows : []}
			>
				{(item) => (
					<TableRow
						className={` bg-[#FBFEFF] border-b-4 border-transparent`}
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

import React from "react";
import { Button } from "@nextui-org/button";
import {
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	DropdownItem,
} from "@nextui-org/dropdown";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from "@nextui-org/table";
import { VerticalDotsIcon } from "../svgs";
import { columns, tenants } from "./data";

type Tenant = (typeof tenants)[0];

export default function InfiniteTable() {
	const renderCell = React.useCallback((user: Tenant, columnKey: React.Key) => {
		const cellValue = user[columnKey as keyof Tenant];

		switch (columnKey) {
			case "actions":
				return (
					<div className="relative flex justify-center items-center gap-2">
						<Dropdown>
							<DropdownTrigger>
								<Button isIconOnly size="sm" variant="light">
									<VerticalDotsIcon className="text-default-300" />
								</Button>
							</DropdownTrigger>
							<DropdownMenu color="primary">
								<DropdownItem>View</DropdownItem>
								<DropdownItem>Edit</DropdownItem>
								<DropdownItem>Delete</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
				);
			default:
				return cellValue;
		}
	}, []);

	return (
		<Table
			aria-label="Tenant table"
			isHeaderSticky
			// bottomContent={bottomContent}
			// bottomContentPlacement="outside"
			classNames={{
				wrapper: "overflow-auto max-h-[339px] p-0 rounded-md shadow-none scrollbar-hide",
				thead: "[&>tr]:first:shadow-none",
			}}
			// selectedKeys={selectedKeys}
			// selectionMode="multiple"
			// sortDescriptor={sortDescriptor}
			// topContent={topContent}
			// topContentPlacement="outside"
			// onSelectionChange={setSelectedKeys}
			// onSortChange={setSortDescriptor}
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
			<TableBody emptyContent={"No tenant found"} items={tenants}>
				{(item) => (
					<TableRow
						className="border-b border-[#F0F2F5] bg-[#FBFEFF]"
						key={item.id}
					>
						{(columnKey) => (
							<TableCell className="text-nowrap">
								{renderCell(item, columnKey)}
							</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}

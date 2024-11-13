import { Button } from "@nextui-org/button";
import { VerticalDotsIcon } from "../svgs";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/dropdown";

const AddTenant = ({
	onViewClick,
	onEditClick,
	onDeleteClick,
	rowId,
}: {
	onViewClick?: (id: string) => void;
	onEditClick?: (id: string) => void;
	onDeleteClick?: (id: string) => void;
	rowId: string;
}) => {
	return (
		<div className="relative">
			<Dropdown>
				<DropdownTrigger>
					<Button variant="flat" isIconOnly>
						<VerticalDotsIcon className="text-[#344054] rotate-90" />
					</Button>
				</DropdownTrigger>
				<DropdownMenu color="primary">
					{onViewClick ? (
						<DropdownItem onPress={() => !!onViewClick && onViewClick(rowId)}>
							View
						</DropdownItem>
					) : (
						<DropdownItem></DropdownItem>
					)}
					<DropdownItem onPress={() => !!onEditClick && onEditClick(rowId)}>
						Edit
					</DropdownItem>
					<DropdownItem onPress={() => !!onDeleteClick && onDeleteClick(rowId)}>
						Delete
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
	);
};

export default AddTenant;

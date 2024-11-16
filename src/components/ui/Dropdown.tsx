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
	const dropdownItems = [
		{ text: "Edit", method: onEditClick },
		{ text: "Delete", method: onDeleteClick },
	];

	if (onViewClick) {
		dropdownItems.unshift({ text: "View", method: onViewClick });
	}
	return (
		<div className="relative">
			<Dropdown>
				<DropdownTrigger>
					<Button variant="flat" isIconOnly>
						<VerticalDotsIcon className="text-[#344054] rotate-90" />
					</Button>
				</DropdownTrigger>
				<DropdownMenu color="primary">
					{dropdownItems.map((drop, index) => {
						return (
							<DropdownItem
								onPress={() => drop.method && drop.method(rowId)}
								key={index}
							>
								{drop.text}
							</DropdownItem>
						);
					})}
				</DropdownMenu>
			</Dropdown>
		</div>
	);
};

export default AddTenant;

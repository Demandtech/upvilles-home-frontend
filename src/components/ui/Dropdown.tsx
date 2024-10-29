import {
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { VerticalDotsIcon } from "../svgs";

export default function MyDropwown() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <VerticalDotsIcon className="text-default-300" />
      </DropdownTrigger>
      <DropdownMenu color="primary">
        <DropdownItem>View</DropdownItem>
        <DropdownItem>Edit</DropdownItem>
        <DropdownItem>Delete</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

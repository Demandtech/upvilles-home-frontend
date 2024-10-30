import Table from "../../common/Table";
import { PlusIcon } from "../../svgs";
import Button from "../../ui/Button";

const columns = [
  { name: "NAME", uid: "name", sortable: true },
  { name: "Unit Number", uid: "unit_number", sortable: true },
  { name: "Contact", uid: "contact" },
  { name: "Move in Date", uid: "move_in_date", sortable: true },
  { name: "Actions", uid: "actions" },
];

const tenants = [
  {
    _id: "1",
    name: "Mrs Taiwo Aderibigbe",
    unit_number: 4,
    contact: "08180715932",
    move_in_date: "Novemeber 15, 2024",
    // actions: "",
  },
  {
    _id: "2",
    name: "Shola Ayeni Samuel",
    unit_number: 3,
    contact: "08109 2876 11",
    move_in_date: "December 22, 2024",
    // actions: "",
  },
  {
    _id: "3",
    name: "Temilade Jackson B. ",
    unit_number: 1,
    contact: "09080715948",
    move_in_date: "August 20, 2024",
    // actions: "",
  },
  {
    _id: "4",
    name: "Chinwe Maxwell Belinda",
    unit_number: 5,
    contact: "07092100183",
    move_in_date: "October 10, 2025",
    // actions: "",
  },
  {
    _id: "5",
    name: "Mrs Taiwo Aderibigbe",
    unit_number: 4,
    contact: "08180715932",
    move_in_date: "Novemeber 15, 2024",
    // actions: "",
  },
  {
    _id: "6",
    name: "Shola Ayeni Samuel",
    unit_number: 3,
    contact: "08109 2876 11",
    move_in_date: "December 22, 2024",
    // actions: "---",
  },
  {
    id: "7",
    name: "Temilade Jackson B. ",
    unit_number: 1,
    contact: "09080715948",
    move_in_date: "August 20, 2024",
    // actions: "",
  },
  {
    _id: "8",
    name: "Chinwe Maxwell Belinda",
    unit_number: 5,
    contact: "07092100183",
    move_in_date: "October 10, 2025",
    // actions: "",
  },
];

const BottomWrapper = () => {
  return (
    <div className="w-full bg-lightBg py-8 px-4 rounded-xl" id="tenant-section">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="font-bold sm:font-lg">Tenant Information</p>
        </div>
        <div>
          <Button
            startContent={<PlusIcon size={20} />}
            type="button"
            color="primary"
            size="md"
            className="rounded-sm ml-auto"
          >
            Add Tenant
          </Button>
        </div>
      </div>
      <Table columns={columns} rows={tenants} />
    </div>
  );
};

export default BottomWrapper;

import { useNavigate } from "react-router-dom";
import Table from "../../common/Table";
import { PlusIcon } from "../../svgs";
import Button from "../../ui/Button";

const columns = [
  { name: "NAME", uid: "name", sortable: true },
  { name: "Last Maintenance Date", uid: "last_men_date", sortable: true },
  { name: "Upcoming Maintenance Dates", uid: "upcoming_date", sortable: true },
  { name: "Assigned Technicians", uid: "assigned_techs", sortable: true },
  { name: "Status", uid: "status" },
  { name: "Actions", uid: "actions" },
];

const tenants = [
  {
    _id: "1",
    name: "Completed",
    last_men_date: "October 12, 2024",
    upcoming_date: "December 15, 2024",
    assigned_techs: "Benjamin Spencer",
    status: "Completed" as "completed" | "schedule" | "overdue",
  },
  {
    _id: "2",
    name: "Elevator",
    last_men_date: "October 12, 2024",
    upcoming_date: "December 15, 2024",
    assigned_techs: "Benjamin Spencer",
    status: "Overdue" as "completed" | "schedule" | "overdue",
  },
  {
    _id: "3",
    name: "Air Condition",
    last_men_date: "June 15, 2024",
    upcoming_date: "December 15, 2024",
    assigned_techs: "Benjamin Spencer",
    status: "Scheduled" as "completed" | "schedule" | "overdue",
  },
  {
    _id: "4",
    name: "Elevator",
    last_men_date: "October 12, 2024",
    upcoming_date: "December 15, 2024",
    assigned_techs: "Benjamin Spencer",
    status: "Scheduled" as "completed" | "schedule" | "overdue",
  },
  {
    _id: "5",
    name: "Elevator",
    last_men_date: "October 12, 2024",
    upcoming_date: "December 15, 2024",
    assigned_techs: "Benjamin Spencer",
    status: "Completed" as "completed" | "schedule" | "overdue",
  },
  {
    _id: "6",
    name: "Elevator",
    last_men_date: "October 12, 2024",
    upcoming_date: "December 15, 2024",
    assigned_techs: "Benjamin Spencer",
    status: "Completed" as "completed" | "schedule" | "overdue",
  },
  {
    _id: "7",
    name: "Elevator",
    last_men_date: "October 12, 2024",
    upcoming_date: "December 15, 2024",
    assigned_techs: "Benjamin Spencer",
    status: "Scheduled" as "completed" | "schedule" | "overdue",
  },
  {
    _id: "8",
    name: "Elevator",
    last_men_date: "October 12, 2024",
    upcoming_date: "December 15, 2024",
    assigned_techs: "Benjamin Spencer",
    status: "Completed" as "completed" | "schedule" | "overdue",
  },
];

function Schedule() {
  const navigate = useNavigate();
  return (
    <div className="w-full  py-10 px-6 rounded-xl" id="tenant-section">
      <div className="bg-lightBg p-5 rounded-lg">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="font-bold sm:font-lg text-nowrap">
              Maintenance Schedule
            </p>
          </div>
          <div>
            <Button
              startContent={<PlusIcon size={20} />}
              type="button"
              color="primary"
              size="md"
              className="rounded-sm ml-auto"
              onClick={() => navigate("/dashboard/maintenance/manage")}
            >
              Create <span className="hidden sm:block"> Maintenance Task</span>
            </Button>
          </div>
        </div>
        <Table columns={columns} rows={tenants} />
      </div>
    </div>
  );
}

export default Schedule;

import { MaintenanceType } from "../../../types/maintenance";
import Table from "../../common/Table";

const columns = [
  { name: "Facility Name", uid: "facility", sortable: true },
  { name: "Property", uid: "property", sortable: true },
  {
    name: "Schedule Date",
    uid: "schedule_date",
    sortable: true,
  },
  { name: "Assigned Technicians", uid: "technician", sortable: true },
  { name: "Maintenance Fee", uid: "maintenance_fee", sortable: true },
];

function MaintenanceReport({
  maintenances,
  rowLoading,
  setPage,
  setSortBy,
  totalPage,
  page,
}: {
  maintenances: MaintenanceType[];
  rowLoading: boolean;
  setPage: (number: number) => void;
  setSortBy: (args: { column: string; direction: string }) => void;
  page: number;
  totalPage: number;
}) {
  return (
    <div className="bg-lightBg/80 p-5 shadow-lg shadow-default-100 rounded-[20px]">
      <h4 className="font-semibold pb-4 text-lg md:text-xl text-nowrap">
        Maintenance Report{" "}
      </h4>

      <Table
        isLoading={rowLoading}
        columns={columns}
        setPage={setPage}
        rows={maintenances}
        setSortBy={setSortBy}
        totalPage={totalPage}
        page={page}
      />
    </div>
  );
}

export default MaintenanceReport;

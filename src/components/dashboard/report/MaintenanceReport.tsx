
import { MaintenanceType } from "../../../types/maintenance";
import Table from "../../common/Table";

const columns = [
	{ name: "Facility Name", uid: "facility", sortable: true },
	{ name: "Maintenance Type", uid: "type", sortable: true },
	{
		name: "Upcoming Maintenance Dates",
		uid: "upcoming_maintenance_date",
		sortable: true,
	},
	{ name: "Assigned Technicians", uid: "technician", sortable: true },
	{ name: "Maintenance Fee", uid: "maintenance_fee", sortable: true },
];

function MaintenanceReport({
	maintenances,
	rowLoading,
}: {
	maintenances: MaintenanceType[];
	rowLoading: boolean;
}) {
	return (
		<div className="bg-lightBg/80 p-5 shadow-lg shadow-default-100 rounded-[20px]">
			<h4 className="font-semibold pb-4 text-lg md:text-xl text-nowrap">
				Maintenance Report{" "}
			</h4>
		
			<Table columns={columns} rows={maintenances} isLoading={rowLoading} />
		
		</div>
	);
}

export default MaintenanceReport;

import { useNavigate } from "react-router-dom";
import Table from "../../common/Table";
import { PlusIcon } from "../../svgs";
import Button from "../../ui/Button";
import { MaintenanceType } from "../../../types/maintenance";

const columns = [
	{ name: "NAME", uid: "name", sortable: true },
	{ name: "Last Maintenance Date", uid: "last_men_date", sortable: true },
	{ name: "Upcoming Maintenance Dates", uid: "upcoming_date", sortable: true },
	{ name: "Assigned Technicians", uid: "assigned_techs", sortable: true },
	{ name: "Status", uid: "status" },
	{ name: "Actions", uid: "actions" },
];

function Schedule({
	maintenance,
	totalPage,
	page,
	setSortBy,
	setPage,
	isLoading,
}: {
	maintenance: MaintenanceType[];
	page: number;
	setPage: (arg: number) => void;
	totalPage: number;
	setSortBy: (args: { column: string; direction: string }) => void;
	isLoading: boolean;
}) {
	const navigate = useNavigate();

	const viewMaintenance = (id: string) => {
		console.log("View Tenant", id);
		navigate(`/dashboard/maintenance/${id}`);
	};
	const deleteMaintenance = (id: string) => {
		console.log("Deleting Tenant", id);
	};
	const editMaintenance = (id: string) => {
		console.log("Editing Tenant", id);
		navigate(`/dashboard/maintenance/update/${id}`);
	};

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
							onClick={() => navigate("/dashboard/maintenance/add")}
						>
							Create <span className="hidden sm:block"> Maintenance Task</span>
						</Button>
					</div>
				</div>
				<Table
					onDelete={deleteMaintenance}
					onEdit={editMaintenance}
					onView={viewMaintenance}
					columns={columns}
					rows={maintenance}
					page={page}
					setPage={setPage}
					setSortBy={setSortBy}
					totalPage={totalPage}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
}

export default Schedule;

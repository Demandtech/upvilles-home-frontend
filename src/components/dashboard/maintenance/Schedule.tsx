import { useNavigate } from "react-router-dom";
import Table from "../../common/Table";
import { PlusIcon } from "../../svgs";
import Button from "../../ui/Button";
import { MaintenanceType } from "../../../types/maintenance";
import { CustomModal } from "../../ui/Modal";
import DeleteMaintenanceModal from "./DeleteMaintenanceModal";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { useState } from "react";

const columns = [
	{ name: "NAME", uid: "facility", sortable: true },
	// { name: "Last Maintenance Date", uid: "last_men_date", sortable: true },
	{ name: "Upcoming Maintenance Dates", uid: "schedule_date", sortable: true },
	{ name: "Assigned Technicians", uid: "technician", sortable: true },
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
	const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
	const [currentId, setCurrentId] = useState("");

	const viewMaintenance = (id: string) =>
		navigate(`/dashboard/maintenance/${id}`);

	const deleteMaintenance = (id: string) => {
		setCurrentId(id);
		onOpen();
	};

	const editMaintenance = (id: string) =>
		navigate(`/dashboard/maintenance/update/${id}`);

	return (
		<div className="w-full px-3 md:px-5" id="tenant-section">
			<div className="bg-lightBg p-5 rounded-lg shadow-sm">
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
			<CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
				<DeleteMaintenanceModal id={currentId} onClose={onClose} />
			</CustomModal>
		</div>
	);
}

export default Schedule;

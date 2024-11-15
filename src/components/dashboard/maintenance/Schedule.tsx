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
	{ name: "Name", uid: "facility", sortable: true },
	{ name: "Property/Unit", uid: "property", sortable: true },
	{ name: "Schedule Maintenance Dates", uid: "schedule_date", sortable: true },
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
	isCreateDisabled,
}: {
	maintenance: MaintenanceType[];
	page: number;
	setPage: (arg: number) => void;
	totalPage: number;
	setSortBy: (args: { column: string; direction: string }) => void;
	isLoading: boolean;
	isCreateDisabled: boolean;
}) {
	const navigate = useNavigate();
	const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
	const [currentId, setCurrentId] = useState("");

	const deleteMaintenance = (id: string) => {
		setCurrentId(id);
		onOpen();
	};

	const editMaintenance = (id: string) =>
		navigate(`/dashboard/maintenances/update/${id}`);

	return (
		<div className="w-full pb-10 px-3 md:px-5" id="tenant-section">
			<div className="bg-lightBg p-5 rounded-lg shadow-lg shadow-default-100">
				<div className="flex items-center gap-2 justify-between mb-5">
					<div>
						<p className="font-semibold text-lg md:text-xl text-nowrap">
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
							onClick={() => navigate("/dashboard/maintenances/add")}
							disabled={isCreateDisabled}
						>
							Create <span className="hidden sm:block"> Maintenance Task</span>
						</Button>
					</div>
				</div>
				<Table
					onDelete={deleteMaintenance}
					onEdit={editMaintenance}
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

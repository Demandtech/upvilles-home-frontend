import { useNavigate } from "react-router-dom";
import Table from "../../../common/Table";
import { PlusIcon } from "../../../svgs";
import Button from "../../../ui/Button";
import { Tenant } from "../../../../types/tenant";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { CustomModal } from "../../../ui/Modal";
import DeleteTenantModal from "../../tenant/DeleteTenantModal";
import { useState } from "react";

const columns = [
	{ name: "NAME", uid: "name", sortable: true },
	{ name: "Unit Number", uid: "assigned_unit", sortable: true },
	{ name: "Phone", uid: "phone" },
	{ name: "Move in Date", uid: "start_date", sortable: true },
	{ name: "Actions", uid: "actions" },
];

const BottomWrapper = ({
	tenants,
	isLoading,
	page,
	setPage,
	totalPage,
	setSortBy,
}: {
	tenants: Tenant[];
	isLoading?: boolean;
	page: number;
	setPage: (arg: number) => void;
	totalPage: number;
	setSortBy: (args: { column: string; direction: string }) => void;
}) => {
	const navigate = useNavigate();
	const { onClose, onOpenChange, isOpen, onOpen } = useDisclosure();
	const [tenantId, setTenantId] = useState("");

	const viewTenant = (id: string) => {
		setTenantId(id);
		navigate(`/dashboard/tenants/${id}`);
	};
	const deleteTenant = (id: string) => {
		setTenantId(id);
		onOpen();
	};
	const editTenant = (id: string) => {
		setTenantId(id);
		navigate(`/dashboard/tenants/edit/${id}`);
	};

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
						onClick={() => navigate("/dashboard/tenants/add")}
					>
						Add Tenant
					</Button>
				</div>
			</div>
			<Table
				onDelete={deleteTenant}
				onEdit={editTenant}
				onView={viewTenant}
				columns={columns}
				rows={tenants}
				isLoading={isLoading}
				page={page}
				setPage={setPage}
				totalPage={totalPage}
				setSortBy={setSortBy}
			/>

			<CustomModal onOpenChange={onOpenChange} isOpen={isOpen}>
				<DeleteTenantModal id={tenantId} onClose={onClose} />
			</CustomModal>
		</div>
	);
};

export default BottomWrapper;

import { useDispatch } from "react-redux";
import { setTitle } from "../../../redux/slices/app";
import { useEffect } from "react";
import MaintenanceForm from "../../../components/dashboard/maintenance/MaintenanceForm";
import { Helmet } from "react-helmet-async";
import { MaintenanceFormState } from "../../../types/forms";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { CustomModal } from "../../../components/ui/Modal";
import SuccessModal from "../../../components/common/SuccessModal";

export default function UpdateMaintenance() {
	const dispatch = useDispatch();
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

	useEffect(() => {
		dispatch(setTitle({ title: "Update Maintenance", showIcon: true }));
	}, []);

	const onFormSubmit = (data: MaintenanceFormState) => {
		onOpen();
		console.log(data);
	};

	return (
		<div className="bg-lightBg h-[calc(100dvh-70px)] w-full lg:h-[calc(100dvh-86px)] p-3 lg:p-5">
			<Helmet>
				<title>Upvillehomes | Update Maintenance - Dashboard</title>
			</Helmet>
			<div className="bg-white rounded-md shadow-lg shadow-dark py-5 px-5 lg:px-10 h-full w-full overflow-auto scrollbar-hide">
				<MaintenanceForm onFormSubmit={onFormSubmit} isLoading={false} />
			</div>
			<CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
				<SuccessModal
					message="Maintenance Schedule updated successfully"
					title="Successful!"
					onClose={onClose}
					buttonLabel="Done"
				/>
			</CustomModal>
		</div>
	);
}

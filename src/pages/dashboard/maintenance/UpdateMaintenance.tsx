import { useDispatch } from "react-redux";
import { setTitle } from "../../../redux/slices/app";
import { useEffect } from "react";
import MaintenanceForm from "../../../components/dashboard/maintenance/MaintenanceForm";
import { Helmet } from "react-helmet-async";
import { MaintenanceFormState } from "../../../types/forms";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { CustomModal } from "../../../components/ui/Modal";
import SuccessModal from "../../../components/common/SuccessModal";
import { toast } from "../../../../configs/services";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { AxiosError } from "axios";
import { setMaintenanceDetails } from "../../../redux/slices/maintenance";
import { formatCurrency } from "../../../utils/formatCurrency";
import {
	singleMaintenance,
	updateMaintenance,
} from "../../../helper/apis/maintenanceApi";

export default function UpdateMaintenance() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

	const successModalHandler = () => {
		onClose();
		navigate(-1);
	};
	const {
		data: singleMaintenanceData,
		isSuccess,
		isLoading,
	} = useQuery({
		queryKey: ["single_maintenance", id],
		queryFn: () => singleMaintenance(id as string),
		enabled: !!id,
	});

	const mutation = useMutation({
		mutationKey: ["update_maintenance", id],
		mutationFn: (newMaintenanceData: MaintenanceFormState) =>
			updateMaintenance(id as string, newMaintenanceData),
		onSuccess: () => {
			onOpen();
			queryClient.invalidateQueries({ queryKey: ["maintenances"] });
			queryClient.invalidateQueries({ queryKey: ["single_maintenance"] });
		},
		onError: (error: AxiosError) => {
			if (error.response?.data) {
				toast.error((error.response?.data as { message: string }).message);
			}
		},
	});

	useEffect(() => {
		dispatch(setTitle({ title: "Update Maintenance", showIcon: true }));
	}, []);

	useEffect(() => {
		if (isSuccess && singleMaintenanceData) {
			dispatch(setMaintenanceDetails(singleMaintenanceData.data));
		}
	}, [isSuccess, singleMaintenance]);

	const onFormSubmit = (data: MaintenanceFormState) => mutation.mutate(data);

	return (
		<div className="bg-lightBg h-[calc(100dvh-126px)] w-full lg:h-[calc(100dvh-86px)] p-3 lg:p-5">
			<Helmet>
				<title>Upvillehomes | Update Maintenance - Dashboard</title>
			</Helmet>
			<div className="bg-white rounded-md shadow-lg shadow-dark py-5 px-5 lg:px-10 h-full w-full overflow-auto scrollbar-hide">
				<MaintenanceForm
					isPageLoading={isLoading}
					editedId={id}
					onFormSubmit={onFormSubmit}
					isLoading={mutation.isPending}
					formDefaultValue={{
						facility: singleMaintenanceData?.data.facility,
						status: singleMaintenanceData?.data.status,
						maintenance_fee: formatCurrency(
							singleMaintenanceData?.data.maintenance_fee
						),
						technician: singleMaintenanceData?.data.technician,
						property: singleMaintenanceData?.data.property,

						schedule_date: moment(
							singleMaintenanceData?.data.schedule_date
						).format("YYYY-MM-DD") as unknown as Date,
					}}
				/>
			</div>
			<CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
				<SuccessModal
					message="Maintenance Schedule updated successfully"
					title="Successful!"
					onClose={successModalHandler}
					buttonLabel="Done"
				/>
			</CustomModal>
		</div>
	);
}

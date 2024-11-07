import { useEffect, useState } from "react";
import { setTitle } from "../../../redux/slices/app";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import TenantForm from "../../../components/dashboard/tenant/TenantForm";
import { tenantSchema } from "../../../utils/schemas/tenant";
import { TenantFormState } from "../../../types/forms";
import { CustomModal } from "../../../components/ui/Modal";
import { useDisclosure } from "@nextui-org/use-disclosure";
import SuccessModal from "../../../components/common/SuccessModal";
import { useParams } from "react-router-dom";
import {
	useQuery,
	UseQueryOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import useTenant from "../../../hooks/useTenant";
import moment from "moment";
import { toast } from "../../../../configs/services";

export default function EditTenant() {
	const dispatch = useDispatch();
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const [formKey, setFormKey] = useState(Date.now());
	const { singleTenantHandler, updateTenantHandler } = useTenant();
	const { id } = useParams();
	const queryClient = useQueryClient();

	useEffect(() => {
		dispatch(setTitle({ showIcon: true, title: "Edit Tenant" }));
	}, []);

	const handleEditTenant = (data: TenantFormState) => {
		mutation.mutate(data);
	};

	const successModalHandler = () => {
		setFormKey(Date.now());

		onClose();
	};

	const { data: editTenant } = useQuery<AxiosResponse, Error>({
		queryKey: ["single_tenant", id],
		queryFn: () => singleTenantHandler(id as string),
		enabled: !!id,
	} as UseQueryOptions<AxiosResponse, Error>);

	const mutation = useMutation({
		mutationFn: async (data: TenantFormState) =>
			updateTenantHandler(id as string, data),
		onSuccess: () => {
			onOpen();
			queryClient.invalidateQueries({ queryKey: ["tenants"] });
			queryClient.invalidateQueries({ queryKey: ["single_tenant"] });
		},
		onError: (error: AxiosError) => {
			if (error.response?.data) {
				toast.error((error.response.data as { message: string }).message);
			}
			toast.error("An error occured, please try again later!");
		},
	});

	if (!editTenant) return;

	return (
		<div className="bg-lightBg p-3 lg:p-5 h-[calc(100dvh-70px)] lg:h-[calc(100dvh-86px)]">
			<Helmet>
				<title>Upvillehomes | Add Tenant</title>
			</Helmet>
			<div className="bg-white rounded-md shadow-lg shadow-dark p-3 lg:p-5 h-full w-full overflow-auto scrollbar-thin scrollbar-rounded">
				<TenantForm
					key={formKey}
					formDefaultValue={{
						name: editTenant?.data.name as string,
						assigned_property: editTenant?.data.assigned_property as string,
						assigned_unit: editTenant?.data.assigned_unit,
						phone: editTenant?.data.phone,
						start_date: moment(editTenant.data.start_date).format("YYYY-MM-DD"),
						end_date: moment(editTenant?.data.end_date).format("YYYY-MM-DD"),
					}}
					schema={tenantSchema}
					onSubmit={handleEditTenant}
					isLoading={mutation.isPending}
					id={id as string}
				/>
			</div>
			<CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
				<SuccessModal
					title="Successful!"
					message="Tenant information has been successfully updated"
					onClose={successModalHandler}
					buttonLabel="Done"
				/>
			</CustomModal>
		</div>
	);
}

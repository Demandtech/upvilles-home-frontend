import { useEffect, useState } from "react";
import { setTitle } from "../../../redux/slices/app";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { tenantSchema } from "../../../utils/schemas/tenant";
import { RootState } from "../../../redux/store";
import { TenantFormState } from "../../../types/forms";
import { resetTenantForm } from "../../../redux/slices/forms/tenantForm";
import { CustomModal } from "../../../components/ui/Modal";
import { useDisclosure } from "@nextui-org/use-disclosure";
import SuccessModal from "../../../components/common/SuccessModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "../../../../configs/services";
import useTenant from "../../../hooks/useTenant";
import TenantForm from "../../../components/dashboard/tenant/TenantForm";
import { useNavigate, useParams } from "react-router-dom";

const AddTenant = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const formData = useSelector((state: RootState) => state.tenantForm);
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const [formKey, setFormKey] = useState(new Date().toISOString());
	const { addTenantHandler } = useTenant();
	const { current_property } = useParams();

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (variables: TenantFormState) => {
			return await addTenantHandler(variables);
		},
		onSuccess: (data: AxiosResponse) => {
			console.log(data.data);
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
			queryClient.invalidateQueries({
				queryKey: ["property_tenant", data.data.assigned_property],
			});
			onOpen();
		},
		onError: (error: AxiosError) => {
			if (error.response?.data) {
				return toast.error(
					(error.response.data as { message: string }).message
				);
			}
			toast.error("An error occured, please try again");
		},
	});

	const handleAddTenant = (data: TenantFormState) => mutation.mutate(data);

	const successModalHandler = () => {
		dispatch(resetTenantForm());
		setFormKey(new Date().toISOString());
		onClose();
		navigate(
			`/dashboard/properties/${mutation.data?.data.assigned_property._id}`
		);
	};

	useEffect(() => {
		dispatch(setTitle({ showIcon: true, title: "Add Tenant" }));
	}, []);

	return (
		<div className="bg-lightBg p-3 lg:p-5 h-[calc(100dvh-70px)] lg:h-[calc(100dvh-86px)]">
			<Helmet>
				<title>Upvillehomes | Add Tenant</title>
			</Helmet>
			<div className="bg-white rounded-md shadow-lg shadow-dark p-3 lg:p-5 h-full w-full overflow-auto scrollbar-thin scrollbar-rounded">
				<TenantForm
					key={formKey}
					formDefaultValue={{
						...formData,
						assigned_property: current_property as string,
						start_date: formData.start_date,
						end_date: formData.end_date,
					}}
					schema={tenantSchema}
					onSubmit={handleAddTenant}
					isLoading={mutation.isPending}
					id=""
				/>
			</div>
			<CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
				<SuccessModal
					title="Successful!"
					message="Tenant information has been successfully added"
					onClose={successModalHandler}
					buttonLabel="Go to Dashboard"
				/>
			</CustomModal>
		</div>
	);
};

export default AddTenant;

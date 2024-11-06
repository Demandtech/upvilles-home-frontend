import PropertyForm from "../../../components/dashboard/property/PropertyForm";
import { useEffect } from "react";
import { setTitle } from "../../../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";
import { addPropertySchema } from "../../../utils/schemas/properties";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useProperty from "../../../hooks/useProperty";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { CustomModal } from "../../../components/ui/Modal";
import { ManagePropertyFormState } from "../../../types/forms";
import { RootState } from "../../../redux/store";
import { resetPropertyForm } from "../../../redux/slices/forms/propertyForm";
import { Helmet } from "react-helmet-async";
import { AxiosError } from "axios";
import { toast } from "../../../../configs/services";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../../components/common/SuccessModal";

function AddProperty() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { addProperty } = useProperty();
	const queryClient = useQueryClient();
	const initialState = useSelector((state: RootState) => state.propertyForm);
	const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

	const mutation = useMutation({
		mutationFn: async (variables: FormData) => {
			return await addProperty(variables);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["properties"] });
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
			onOpen();
			return;
		},
		onError: (error: AxiosError) => {
			if (error.response?.data) {
				return toast.error(
					(error.response.data as { message: string }).message
				);
			}
			return toast.error("An error occured, please try again");
		},
	});

	const handleAddProperty = (data: ManagePropertyFormState) => {
		const formData = new FormData();

		Object.entries(data).forEach(([key, val]) => {
			if (key === "images") {
				Array.from(val).forEach((file) => {
					if (file instanceof File) {
						formData.append("images", file);
					}
				});
			} else if (val !== undefined) {
				formData.append(key, val);
			}
		});

		mutation.mutate(formData);
	};

	const handleModalClose = () => {
		dispatch(resetPropertyForm());
		onClose();
		navigate(-1);
	};

	useEffect(() => {
		dispatch(setTitle({ showIcon: true, title: "Add Property" }));
	}, []);

	return (
		<div className="h-[calc(100dvh-70px)] w-full lg:h-[calc(100dvh-86px)] p-3 lg:p-5">
			<Helmet>
				<title>Upvillehomes | Add Property - Dashboard</title>
			</Helmet>
			<div className="rounded-md shadow-lg shadow-dark py-5 px-5 lg:px-10 h-full w-full">
				<PropertyForm
					schema={addPropertySchema}
					onFormSubmit={handleAddProperty}
					isLoading={mutation.isPending}
					formDefaultValue={initialState}
				/>
				<CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
					<SuccessModal
						title="Successful!"
						message="Property Added successfully"
						buttonLabel="Done"
						onClose={handleModalClose}
					/>
				</CustomModal>
			</div>{" "}
		</div>
	);
}

export default AddProperty;

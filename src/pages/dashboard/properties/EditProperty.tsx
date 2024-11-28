import { useNavigate, useParams } from "react-router-dom";
import PropertyForm from "../../../components/dashboard/property/PropertyForm";
import { useEffect } from "react";
import { setTitle } from "../../../redux/slices/app";
import { useDispatch } from "react-redux";
import { propertySchema } from "../../../utils/schemas/properties";
import {
	useQuery,
	useMutation,
	useQueryClient,
	UseQueryOptions,
} from "@tanstack/react-query";
import useProperty from "../../../hooks/useProperty";
import { AxiosError, AxiosResponse } from "axios";
import { CustomModal } from "../../../components/ui/Modal";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { PropertyFormState } from "../../../types/forms";
import { Helmet } from "react-helmet-async";
import { toast } from "../../../../configs/services";
import { resetPropertyForm } from "../../../redux/slices/forms/propertyForm";
import SuccessModal from "../../../components/common/SuccessModal";
import { Spinner } from "@nextui-org/spinner";

const EditProperty = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const queryClient = useQueryClient();
	const { editProperty, getSingleProperty } = useProperty();
	const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

	const mutation = useMutation({
		mutationFn: async (data: FormData) => editProperty(id as string, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["properties"] });
			onOpen();
		},
		onError: (error: AxiosError) => {
			console.log(error);
			if (error.response?.data) {
				return toast.error(
					(error.response.data as { message: string }).message
				);
			}
			toast.error("An error occured, please try again later!");
		},
	});

	const handleEditProperty = (data: PropertyFormState) => {
		const formData = new FormData();

		Object.entries(data).forEach(([key, val]) => {
			if (key === "images" && Array.isArray(val)) {
				val.forEach((image) => {
					formData.append(`images[]`, JSON.stringify(image));
				});
				return;
			} else {
				formData.append(key, val as string);
			}
		});

		mutation.mutate(formData);
	};

	const { data: singleProperty } = useQuery<AxiosResponse, Error>({
		queryKey: ["single_property", id],
		queryFn: () => getSingleProperty(id as string),
	} as UseQueryOptions<AxiosResponse, Error>);

	const handleModalClose = () => {
		dispatch(resetPropertyForm());
		onClose();
		navigate(-1);
	};

	useEffect(() => {
		dispatch(setTitle({ showIcon: true, title: "Edit Property" }));
	}, []);

	if (!singleProperty)
		return (
			<div className="pt-20 flex justify-center">
				<Spinner color="primary" />;
			</div>
		);

	return (
		<>
			<Helmet>
				<title>Upvillehomes | Edit Property - Dashboard</title>
			</Helmet>
			<div className="px-5">
				<div className="rounded-md shadow-lg shadow-dark py-5 px-5 lg:px-10 h-[calc(100vh-140px)]  md:h-[calc(100vh-126px)]">
					<PropertyForm
						id={id}
						schema={propertySchema}
						onFormSubmit={handleEditProperty}
						formDefaultValue={{
							title: singleProperty?.data.title as string,
							street: singleProperty?.data.street as string,
							unit_number: singleProperty?.data.unit_number as string,
							description: singleProperty?.data.description as string,
							property_type: singleProperty?.data.property_type as
								| "Residential"
								| "Commercial",
							location: singleProperty?.data.location,
							attraction: singleProperty?.data.attraction,
							images: singleProperty?.data.images.map((img: string) =>
								JSON.parse(img)
							),
						}}
						isLoading={mutation.isPending}
					/>
				</div>
			</div>
			<CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
				<SuccessModal
					title="Successful!"
					onClose={handleModalClose}
					message=" Property information has been successfully updated"
					buttonLabel="Done"
				/>
			</CustomModal>
		</>
	);
};

export default EditProperty;

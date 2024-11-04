import { useParams } from "react-router-dom";
import PropertyForm from "../../../components/dashboard/properties/PropertyForm";
import { useEffect } from "react";
import { setTitle } from "../../../redux/slices/app";
import { useDispatch } from "react-redux";
import { editPropertySchema } from "../../../utils/schemas/properties";
import {
	useQuery,
	useMutation,
	useQueryClient,
	UseQueryOptions,
} from "@tanstack/react-query";
import useProperty from "../../../hooks/useProperty";
import { AxiosResponse } from "axios";
import ManagementModal from "../../../components/dashboard/properties/ManagePropertySuccessModal";
import { CustomModal } from "../../../components/ui/Modal";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { EditPropertyFormState } from "../../../types/forms";
import { Helmet } from "react-helmet-async";

const EditProperty = () => {
	const { id } = useParams();

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
		onError: (error) => {
			console.log("Error: ", error);
		},
	});

	const handleEditProperty = (data: EditPropertyFormState) => {
		const formData = new FormData();

		Object.entries(data).forEach(([key, val]) => {
			if (key === "images") {
				Array.from(val).forEach((file) => {
					if (file instanceof File) {
						formData.append("images", file);
					}
				});
			} else if (key === "images_url") {
				val.forEach((url: string) => {
					formData.append("images_url", url);
				});
			} else if (val !== undefined) {
				formData.append(key, val);
			}
		});

		mutation.mutate(formData);
	};

	const { data: singleProperty } = useQuery<AxiosResponse, Error>({
		queryKey: ["single_property", id],
		queryFn: () => getSingleProperty(id as string),
	} as UseQueryOptions<AxiosResponse, Error>);

	useEffect(() => {
		dispatch(setTitle({ showIcon: true, title: "Edit Property" }));
	}, []);

	if (!singleProperty) return;

	return (
		<>
			<Helmet>
				<title>Upvillehomes | Edit Property - Dashboard</title>
			</Helmet>
			<div className="px-5 pt-5">
				<div className="rounded-md shadow-lg shadow-dark py-5 px-5 lg:px-10 h-[calc(100vh-116px)]  md:h-[calc(100vh-126px)]">
					<PropertyForm
						id={id}
						schema={editPropertySchema}
						onFormSubmit={handleEditProperty}
						formDefaultValue={{
							title: singleProperty?.data.title as string,
							street: singleProperty?.data.street as string,
							unit_number: singleProperty?.data.unit_number as number,
							description: singleProperty?.data.description as string,
							property_type: singleProperty?.data.property_type as
								| "Residential"
								| "Commercial",
							location: singleProperty?.data.location,
							images_url: singleProperty?.data.images_url,
							attraction: singleProperty?.data.attraction,
						}}
						isLoading={mutation.isPending}
					/>

					<CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
						<ManagementModal
							message="Property info updated successfully"
							onClose={onClose}
						/>
					</CustomModal>
				</div>
			</div>
		</>
	);
};

export default EditProperty;

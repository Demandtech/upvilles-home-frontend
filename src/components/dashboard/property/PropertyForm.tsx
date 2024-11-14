import { Image } from "@nextui-org/image";
import img from "../../../assets/images/house-img.png";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import { FileUpload } from "../../svgs";
import Button from "../../ui/Button";
import { useForm, yupResolver } from "../../../../configs/services";
import { ObjectSchema } from "yup";
import {
	AddPropertyFormState,
	EditPropertyFormState,
} from "../../../types/forms";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatePropertyForm } from "../../../redux/slices/forms/propertyForm";

const typesData = [
	{ key: "Residential", label: "Residential" },
	{ key: "Commercial", label: "Commercial" },
];

const PropertyForm = ({
	id,
	schema,
	onFormSubmit,
	formDefaultValue,
	isLoading,
}: {
	id?: string;
	schema: ObjectSchema<AddPropertyFormState | EditPropertyFormState>;
	onFormSubmit: (data: AddPropertyFormState | EditPropertyFormState) => void;
	formDefaultValue?: EditPropertyFormState | AddPropertyFormState;
	isLoading: boolean;
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<EditPropertyFormState | AddPropertyFormState>({
		resolver: yupResolver(schema),
		defaultValues: formDefaultValue,
	});
	const dispatch = useDispatch();

	const watchFields = watch();

	useEffect(() => {
		if (!id) {
			Object.entries(watchFields).forEach(([key, val]) => {
				dispatch(
					updatePropertyForm({
						field: key as keyof typeof formDefaultValue,
						value: val as keyof AddPropertyFormState,
					})
				);
			});
		}
	}, [watchFields, id]);

	return (
		<section className="flex flex-col lg:flex-row h-full overflow-auto scrollbar-hide">
			<div className="lg:w-2/5 ">
				<div className="lg:mt-10 flex justify-center">
					<Image src={img} />
				</div>
			</div>
			<div className="lg:w-3/5 lg:pl-10  lg:overflow-y-auto scrollbar-hide py-5">
				<div className="text-center mb-5">
					<h3 className="text-center  text-lg md:text-xl mb-1.5 font-semibold">
						{id ? "Edit" : "Add"} Your Property Information
					</h3>
					<p className="text-darkGrey text-sm">
						Update property details to keep information accurate and up-to-date.
					</p>
				</div>
				<form
					method="post"
					encType="multipart/form-data"
					onSubmit={handleSubmit(onFormSubmit)}
				>
					<div className="grid md:grid-cols-2 gap-4 mb-5">
						<Input
							required={true}
							label="Property Title"
							type="text"
							name="title"
							size="md"
							placeholder="Enter property title"
							register={register}
							error={errors.title?.message as string | undefined}
							defaultValue={formDefaultValue?.title as string}
						/>
						<Input
							required={true}
							label="Location"
							type="text"
							name="location"
							size="md"
							placeholder="Enter property location"
							register={register}
							error={errors.location?.message as string | undefined}
							defaultValue={formDefaultValue?.location as string}
						/>
						<Input
							label="Street / Road / Estate"
							type="text"
							name="street"
							size="md"
							required={true}
							placeholder="Enter property address"
							register={register}
							error={errors.street?.message as string | undefined}
							defaultValue={formDefaultValue?.street as string}
						/>
						<Select
							name="property_type"
							register={register}
							data={typesData}
							label="Property Type:"
							error={errors.property_type?.message as string | undefined}
							defaultValue={formDefaultValue?.property_type as string}
						/>

						<Input
							label="Number of Units"
							type="text"
							name="unit_number"
							size="md"
							required={true}
							placeholder="Enter units number"
							register={register}
							error={errors.unit_number?.message as string | undefined}
							defaultValue={formDefaultValue?.unit_number as string}
						/>
						<Input
							label="Side Attraction"
							type="text"
							name="attraction"
							size="md"
							required={false}
							placeholder="Enter side attractions"
							register={register}
							error={errors.attraction?.message as string | undefined}
							optionalColor="text-darkGrey"
							defaultValue={formDefaultValue?.attraction as string}
						/>
					</div>
					<div className="space-y-5">
						<div>
							<label className="block mb-1.5">
								Property image(s)
								<span className="font-light text-xs text-darkGrey">
									(Minimum of 25 pictures)
								</span>
								:
							</label>
							<div className="border-2 bg-[#A4A4A41A] py-5 rounded-md border-darkGrey border-dotted w-full block">
								<label className="" htmlFor="img-upload">
									<input
										type="file"
										id="img-upload"
										hidden
										accept="image/*"
										multiple
										{...register("images")}
									/>
									<div className="flex flex-col gap-1 items-center">
										<FileUpload />
										<p>Upload an image</p>
										<p className="text-xs text-darkGrey">
											or click to browse(4 MB max)
										</p>
									</div>
								</label>
							</div>
							{errors.images && (
								<p className="text-danger text-xs">
									{errors.images.message as string | undefined}
								</p>
							)}
						</div>
						<div>
							<label htmlFor="description" className="block mb-1.5">
								Property Description:
							</label>
							<textarea
								className="bg-[#A4A4A41A] p-3 rounded-md w-full resize-none min-h-[100px]"
								id="description"
								placeholder="Enter description"
								{...register("description")}
							></textarea>
							{errors.description && (
								<p className="text-danger text-xs">
									{errors.description?.message as string | undefined}
								</p>
							)}
						</div>
						<Button isLoading={isLoading} type="submit" className="w-full">
							{id ? "Edit" : "Add"} Property Details
						</Button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default PropertyForm;

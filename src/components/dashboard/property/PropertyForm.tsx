import Input from "../../ui/Input";
import Select from "../../ui/Select";
import { CloseIcon, FileUpload } from "../../svgs";
import Button from "../../ui/Button";
import { toast, useForm, yupResolver } from "../../../../configs/services";
import { ObjectSchema } from "yup";
import { PropertyFormState } from "../../../types/forms";
import {
	ChangeEvent,
	useEffect,
	useState,
	Dispatch,
	SetStateAction,
} from "react";
import { useDispatch } from "react-redux";
import { updatePropertyForm } from "../../../redux/slices/forms/propertyForm";
import { ImageUrl } from "../../../types/common";
import { Image } from "@nextui-org/image";
import useImage from "../../../hooks/useImage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useProperty from "../../../hooks/useProperty";

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
	schema: ObjectSchema<PropertyFormState>;
	onFormSubmit: (data: PropertyFormState) => void;
	formDefaultValue?: PropertyFormState;
	isLoading: boolean;
}) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		watch,
	} = useForm<PropertyFormState>({
		resolver: yupResolver(schema),
		defaultValues: formDefaultValue,
	});
	const dispatch = useDispatch();
	const queryClient = useQueryClient();
	const [imagesUrl, setImagesUrl] = useState<ImageUrl[]>(
		formDefaultValue && formDefaultValue.images?.length > 0
			? formDefaultValue?.images
			: []
	);
	const [uploadProgress, setUploadProgress] = useState<number>(100);
	const { uploadImage } = useImage();
	const { deletePropertyImage } = useProperty();

	const uploadImageMutation = useMutation({
		mutationFn: ({
			formData,
			setUploadProgress,
		}: {
			formData: FormData;
			setUploadProgress: Dispatch<SetStateAction<number>>;
		}) => uploadImage(formData, setUploadProgress),
		onSuccess: (res) => {
			console.log(res);
			setImagesUrl((prev) => {
				console.log(prev);
				const previousImages = prev.filter((item) => item.public_id);
				return [...previousImages, { url: res.url, public_id: res.public_id }];
			});
		},
		onError: (err: AxiosError) => {
			console.log(err);
			toast.error("Error occured uploading images");
		},
	});

	const deleteImageMutation = useMutation({
		mutationFn: ({
			publicId,
			propertyId,
		}: {
			publicId: string;
			propertyId: string;
		}) => deletePropertyImage(publicId, propertyId),
		onSuccess: () => {
			if (id) {
				queryClient.invalidateQueries({ queryKey: ["single_property", id] });
			}
			// setImagesUrl((prev)=> prev.filter())
		},
		onError: (error: AxiosError) => {
			console.log(error);
			toast.error(error.message);
		},
	});

	const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const { files } = event.target;
		if (!files?.length) return;

		const filesArr = Array.from(files);
		const uploadPromises = filesArr.map(async (file) => {
			const formData = new FormData();

			formData.append("file", file);
			formData.append(
				"upload_preset",
				import.meta.env.VITE_CLOUDINARY_PROPERTY_PRESET as string
			);

			return uploadImageMutation.mutateAsync({ formData, setUploadProgress });
		});

		try {
			await Promise.all(uploadPromises);
		} catch (error) {
			console.error("One or more uploads failed.", error);
		}
	};

	const handleDelete = (imageInput: ImageUrl) =>
		deleteImageMutation.mutate(
			{
				publicId: imageInput.public_id,
				propertyId: id as string,
			},
			{
				onSuccess: () => {
					toast.info("Image successfully removed!", { position: "top-center" });
					setImagesUrl((prev) =>
						prev.filter((item) => item.url !== imageInput.url)
					);
				},
			}
		);

	const watchFields = watch();

	useEffect(() => {
		if (!formDefaultValue?.images) return;
		setValue("images", imagesUrl);
	}, [imagesUrl]);

	useEffect(() => {
		if (!id && formDefaultValue) {
			Object.entries(watchFields).forEach(([key, val]) => {
				dispatch(
					updatePropertyForm({
						field: key as keyof typeof formDefaultValue,
						value: val as keyof PropertyFormState,
					})
				);
			});
		}
	}, [watchFields, id, formDefaultValue]);

	console.log(uploadProgress);

	return (
		<section className="flex flex-col lg:flex-row h-full overflow-auto scrollbar-hide">
			<div className="lg:w-3/5 lg:pl-10  lg:overflow-y-auto scrollbar-hide py-5 mx-auto">
				<div className="text-center mb-5">
					<h3 className="text-center  text-lg md:text-xl mb-1.5 font-semibold">
						{id ? "Edit" : "Add"} Your Property Information
					</h3>
					<p className="text-darkGrey text-sm">
						Update property details to keep information accurate and up-to-date.
					</p>
				</div>
				<form onSubmit={handleSubmit(onFormSubmit)}>
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
									(Minimum of 4 pictures & Maximum of 12 pictures)
								</span>
								:
							</label>

							<div className="border-2 bg-[#A4A4A41A] py-5 rounded-md border-darkGrey border-dotted w-full block">
								<label className="" htmlFor="img-upload">
									<input
										type="file"
										id="img-upload"
										hidden
										accept="image/jpeg,image/png,image/jpg"
										multiple
										name="images"
										onChange={handleImageChange}
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

							{imagesUrl?.length > 0 && (
								<div
									style={{
										display: "grid",
										gridTemplateColumns: `repeat(auto-fit, minmax(70px, 1fr))`,
										gap: 5,
									}}
									className="mt-4"
								>
									{imagesUrl.map((img) => {
										return (
											<div
												key={img.public_id}
												className="relative w-full rounded-lg overflow-hidden"
											>
												<Image
													height={70}
													width={"100%"}
													src={img.url}
													radius="sm"
													className="h-full rounded-none w-full"
													classNames={{
														img: "h-full w-full object-cover object-center",
													}}
												/>
												<Button
													onPress={() => handleDelete(img)}
													variant="flat"
													className="absolute -right-0 top-0 z-20 bg-default-300 !px-0 min-w-4 max-w-4 h-4 rounded-full"
												>
													<CloseIcon className="w-3" />
												</Button>
											</div>
										);
									})}
								</div>
							)}
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

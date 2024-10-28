import { Image } from "@nextui-org/image";
import img from "../../../assets/images/house-img.png";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import { FileUpload } from "../../svgs";
import Button from "../../ui/Button";
import { useForm, yupResolver } from "../../../configs/services";
import { managePropertySchema } from "../../../utils/schemas/properties";
// import { ChangeEvent, useEffect, useState } from "react";

const data = [
	{ key: 1, label: "Residential" },
	{ key: 2, label: "Commercial" },
];

const PropertyForm = ({ id }: { id: number }) => {
	// const [images, setImages] = useState<File[]>([]);

	const {
		register,
		handleSubmit,
		// getValues,
		formState: { errors },
	} = useForm({ resolver: yupResolver(managePropertySchema) });

	const handleEditProperty = (data: any) => {
		console.log(data);
	};

	// useEffect(() => {
	// 	console.log(getValues());
	// 	// console.log(images);
	// }, [images]);

	return (
		<section className="flex flex-col lg:flex-row h-full overflow-auto scrollbar-hide">
			<div className="lg:w-2/5 ">
				<div className="lg:mt-10 flex justify-center">
					<Image src={img} />
				</div>
			</div>
			<div className="lg:w-3/5 lg:pl-10  lg:overflow-y-auto scrollbar-hide py-5">
				<div className="text-center mb-5">
					<h3 className="text-center  text-lg md:text-xl mb-1.5">
						{id ? "Edit" : "Add"} Your Property Information
					</h3>
					<p className="text-darkGrey text-sm">
						Update property details to keep information accurate and up-to-date.
					</p>
				</div>
				<form onSubmit={handleSubmit(handleEditProperty)}>
					<div className="grid md:grid-cols-2 gap-4 mb-5">
						<Input
							required={true}
							label="Property Title"
							type="text"
							name="title"
							size="md"
							placeholder="Enter property title"
							register={register}
							error={errors.title?.message}
						/>
						<Input
							required={true}
							label="Location"
							type="text"
							name="location"
							size="md"
							placeholder="Enter property location"
							register={register}
							error={errors.location?.message}
						/>
						<Input
							label="Street / Road / Estate"
							type="text"
							name="address"
							size="md"
							required={true}
							placeholder="Enter property address"
							register={register}
							error={errors.address?.message}
						/>
						<Select
							name="type"
							register={register}
							data={data}
							label="Property Type:"
							error={errors.type?.message}
						/>

						<Input
							label="Number of Units"
							type="text"
							name="unit_number"
							size="md"
							required={true}
							placeholder="Enter units number"
							register={register}
							error={errors.unit_number?.message}
						/>
						<Input
							label="Side Attraction"
							type="text"
							name="attraction"
							size="md"
							required={false}
							placeholder="Enter side attractions"
							register={register}
							error={errors.attraction?.message}
							optionalColor="text-darkGrey"
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
										// name="images"
										// onChange={onImageChange}
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
								<p className="text-danger text-xs">{errors.images.message}</p>
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
									{errors.description?.message}
								</p>
							)}
						</div>
						<Button type="submit" className="w-full">
							{id ? "Edit" : "Add"} Property Details
						</Button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default PropertyForm;

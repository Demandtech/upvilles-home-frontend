import { yup } from "../../../configs/services";

export const managePropertySchema = yup.object().shape({
	title: yup.string().required("Title is required!"),
	location: yup.string().required("Location is required!"),
	description: yup.string().required("Description is required!"),
	street: yup.string().required("Street / Road / Estate is required!"),
	property_type: yup.string().required("Property type is required"),
	unit_number: yup.string().required("Number of unit is required"),
	attraction: yup.string().optional(),
	images: yup.mixed<File[]>(),
});

export const addPropertySchema = yup.object().shape({
	title: yup.string().required("Title is required!"),
	location: yup.string().required("Location is required!"),
	description: yup.string().required("Description is required!"),
	street: yup.string().required("Street / Road / Estate is required!"),
	property_type: yup.string().required("Property type is required"),
	unit_number: yup.string().required("Number of unit is required"),
	attraction: yup.string().optional(),
	images: yup
		.mixed<File[]>()
		.required("Images are required")
		.test("min", "You must add at least 4 images", (val) => val.length >= 4)
		.test(
			"max",
			"images should not be more than 12",
			(val) => val.length <= 12
		),
});

export const editPropertySchema = yup.object().shape({
	title: yup.string().required("Title is required!"),
	location: yup.string().required("Location is required!"),
	description: yup.string().required("Description is required!"),
	street: yup.string().required("Street / Road / Estate is required!"),
	property_type: yup.string().required("Property type is required"),
	unit_number: yup.string().required("Number of unit is required"),
	attraction: yup.string().optional(),
	images: yup.mixed<File[]>(),
	images_url: yup.array().min(4).max(12),
});

import { yup } from "../../../configs/services";

export const managePropertySchema = yup.object().shape({
  title: yup.string().required("Title is required!"),
  location: yup.string().required("Location is required!"),
  description: yup.string().required("Description is required!"),
  street: yup.string().required("Street / Road / Estate is required!"),
  property_type: yup.string().required("Property type is required"),
  unit_number: yup.number().required("Number of unit is required"),
  attraction: yup.string().optional(),
  images: yup.mixed<File[]>(), // Make it optional otherwise,
});

export const maintenanceSchema = yup.object().shape({
  status: yup.string().required("Status is required"),
  facility: yup.string().required("Facilites requiured"),
  technician: yup.string().required("Technician is required"),
  schedule_date: yup.string().required("Schedule date is required"),
});

export const addPropertySchema = yup.object().shape({
  title: yup.string().required("Title is required!"),
  location: yup.string().required("Location is required!"),
  description: yup.string().required("Description is required!"),
  street: yup.string().required("Street / Road / Estate is required!"),
  property_type: yup.string().required("Property type is required"),
  unit_number: yup.number().required("Number of unit is required"),
  attraction: yup.string().optional(),
  images: yup.mixed<File[]>().required(),
});

export const editPropertySchema = yup.object().shape({
  title: yup.string().required("Title is required!"),
  location: yup.string().required("Location is required!"),
  description: yup.string().required("Description is required!"),
  street: yup.string().required("Street / Road / Estate is required!"),
  property_type: yup.string().required("Property type is required"),
  unit_number: yup.number().required("Number of unit is required"),
  attraction: yup.string().optional(),
  images: yup.mixed<File[]>(),
});

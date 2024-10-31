import { yup } from "../../../configs/services";

export const managePropertySchema = yup.object().shape({
  title: yup.string().required("Title is required!"),
  location: yup.string().required("Location is required!"),
  description: yup.string().required("Description is required!"),
  attraction: yup.string(),
  address: yup.string().required("Address is required!"),
  type: yup.string().required("Property type is required"),
  unit_number: yup.string().required("Number of unit is required"),
  images: yup
    .mixed<File[]>()
    .test("required", "You need to provide at least 4 images", (value) => {
      return value && value.length > 0;
    })
    .test("max", "Images should not be more than 25", (value) => {
      return !value || value.length <= 2;
    }),
});

export const maintenanceSchema = yup.object().shape({
  status: yup.string().required("Status is required"),
  facility: yup.string().required("Facilites requiured"),
  technician: yup.string().required("Technician is required"),
  schedule_date: yup.string().required("Schedule date is required"),
});

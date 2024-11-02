import { yup } from "../../../configs/services";

export const managePropertySchema = (id:string) =>
  yup.object().shape({
    title: yup.string().required("Title is required!"),
    location: yup.string().required("Location is required!"),
    description: yup.string().required("Description is required!"),
    street: yup.string().required("Street / Road / Estate is required!"),
    property_type: yup.string().required("Property type is required"),
    unit_number: yup.number().required("Number of unit is required"),
    attraction: yup.array().transform((value, originalValue) => {
      if (value) return;
      if (typeof originalValue === "string") {
        return originalValue.split(",").map((item) => item.trim());
      }
      return value.split(",").map((item: string) => item.trim());
    }),
    images: yup.mixed<File[]>().when([], {
      is: () => !id,
      then: (schema) =>
        schema
          .required("You need to provide images when Adding a property")
          .test("min", "You need to provide at least 4 images", (value) => {
            return value && value.length >= 4;
          })
          .test("max", "Images should not be more than 25", (value) => {
            return value && value.length <= 25;
          }),
      otherwise: (schema) => schema.optional(), // Make it optional otherwise
    }),
  });

export const maintenanceSchema = yup.object().shape({
  status: yup.string().required("Status is required"),
  facility: yup.string().required("Facilites requiured"),
  technician: yup.string().required("Technician is required"),
  schedule_date: yup.string().required("Schedule date is required"),
});

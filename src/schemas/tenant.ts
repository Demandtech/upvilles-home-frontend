import { yup } from "../../configs/services";

export const tenantSchema = yup.object().shape({
  name: yup.string().required("Tenant name is required!"),
  phone: yup
    .string()
    .required("Phone number is required!")
    .test("is-valid-number", "Enter a valid phone number", (value) => {
      if (!value) return true;

      if (/^234\d{10}$/.test(value) && value.length === 13) return true;

      if (/^\+234\d{10}$/.test(value) && value.length === 14) return true;

      if (/^(?!234|(\+234))\d{11}$/.test(value) && value.length === 11)
        return true;

      return false;
    }),
  assigned_unit: yup.string().required("Assigned unit is required!"),
  assigned_property: yup.string().required("Assigned Property is required!"),
  start_date: yup
    .date()
    .typeError("Please enter a valid date for the end date.")
    .required("Lease/Rent start date is required!"),
  end_date: yup
    .date()
    .typeError("Please enter a valid date for the end date.")
    .min(yup.ref("start_date"), "End date must be after start date.")
    .required("Lease/Rent end date required!"),
  rent_paid: yup
    .string()
    .required("Rent paid fee is required"),
    // .matches(
    //   /^(\d{1,3})(?:,\d{3})*(\.\d{1,2})?$/,
    //   "Rent paid must be a valid number"
    // ),
  balance: yup
    .string()
    .nonNullable()
    .transform((value) => (value === "" ? undefined : value))
    .matches(
      /^(\d{1,3})(?:,\d{3})*(\.\d{1,2})?$/,
      "Outstanding balance must be a valid number"
    ),
});

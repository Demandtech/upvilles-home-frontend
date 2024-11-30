import { yup } from "../../configs/services";

export const maintenanceSchema = yup.object().shape({
	status: yup
		.string()
		.oneOf(["completed", "overdue", "schedule"], "Invalid status")
		.required("Status is required"),
	facility: yup.string().required("Facilites requiured"),
	technician: yup.string().required("Technician is required"),
	schedule_date: yup
		.date()
		.typeError("Enter a valid date")
		.required("Schedule date is required"),
	property: yup.string().required(),
	maintenance_fee: yup
		.string()
		.matches(
			/^(\d{1,3})(?:,\d{3})*(\.\d{1,2})?$/,
			"Maintenance fee must be a valid number, two decimals are allowed"
		)
		.required("Maintenance fee is required"),
});

import { yup } from "../../../configs/services";

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
	maintenance_fee: yup
		.number()
		.typeError("Maintenance fee must be a number")
		.integer("Maintenance fee must be an integer")
		.required("Maintenance fee is required"),
});

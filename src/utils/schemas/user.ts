import { yup } from "../../../configs/services";

export const changePasswordSchema: yup.ObjectSchema<{
	new_password: string;
	confirm_password: string;
	current_password: string;
}> = yup.object().shape({
	current_password: yup
		.string()
		.min(8, "Current password must be at least 8 characters")
		.required("Current password is required"),
	new_password: yup
		.string()
		.min(8, "New password must be at least 8 characters")
		.label("new_password")
		.matches(/[A-Z]/, "New password must contain at least one uppercase letter")
		.matches(/[a-z]/, "New password must contain at least one lowercase letter")
		.matches(/[0-9]/, "New password must contain at least one number")
		.matches(
			/[\W_]/,
			"New password must contain at least one special character"
		)
		.required("New password is required"),
	confirm_password: yup
		.string()
		.oneOf([yup.ref("new_password")], "New passwords must match")
		.required("Confirm password is required"),
});

export const updateProfileSchema: yup.ObjectSchema<{
	name: string;
	email: string;
	phone?: string | null;
	company: string;
	image?: File | null;
}> = yup.object().shape({
	name: yup.string().required("Full name is required"),
	phone: yup
		.string()
		.notRequired()
		.test("is-valid-number", "Enter a valid phone number", (value) => {
			if (!value) return true;

			if (/^234\d{10}$/.test(value) && value.length === 13) return true;

			if (/^\+234\d{10}$/.test(value) && value.length === 14) return true;

			if (/^(?!234|(\+234))\d{11}$/.test(value) && value.length === 11)
				return true;

			return false;
		}),
	company: yup.string().required("Company name is required!"),
	email: yup
		.string()
		.label("Email")
		.email("Invalid email format")
		.required("Email is required"),
	image: yup.mixed<File>().notRequired(),
});

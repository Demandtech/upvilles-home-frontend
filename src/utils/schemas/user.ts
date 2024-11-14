import { yup } from "../../../configs/services";

export const changePasswordSchema: yup.ObjectSchema<{
	new_password: string;
	confirm_password: string;
	current_password: string;
}> = yup.object().shape({
	current_password: yup
		.string()
		.min(8, "Password must be at least 8 characters")
		.required("old password is required"),
	new_password: yup
		.string()
		.min(8, "password must be at least 8 characters")
		.label("Password")
		.matches(/[A-Z]/, "Password must contain at least one uppercase letter")
		.matches(/[a-z]/, "Password must contain at least one lowercase letter")
		.matches(/[0-9]/, "Password must contain at least one number")
		.matches(/[\W_]/, "Password must contain at least one special character")
		.required("Password is required"),
	confirm_password: yup
		.string()
		.oneOf([yup.ref("new_password")], "New passwords must match")
		.required(),
});

export const updateProfileSchema: yup.ObjectSchema<{
	name: string;
	email: string;
	phone?: string | null;
	company?: string;
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
	company: yup.string(),
	email: yup
		.string()
		.label("Email")
		.email("Invalid email format")
		.required("Email is required"),
	image: yup.mixed<File>().notRequired(),
});

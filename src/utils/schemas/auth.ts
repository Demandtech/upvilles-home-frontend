import { yup } from "../../../configs/services";

export const loginSchema: yup.ObjectSchema<{
	email: string;
	password: string;
}> = yup.object().shape({
	email: yup
		.string()
		.required("Email is required")
		.label("Email")
		.email("Invalid email format"),
	password: yup
		.string()
		.required("Password is required")
		.label("Password")
		.min(8, "password must be at least 8 characters"),
});

export const signupSchema: yup.ObjectSchema<{
	name: string;
	phone?: string;
	company?: string;
	password: string;
	email: string;
	confirmPassword: string | undefined;
	termCondition: boolean | undefined;
}> = yup.object().shape({
	name: yup.string().required("Full name is required"),
	phone: yup.string(),
	company: yup.string(),
	email: yup
		.string()
		.label("Email")
		.email("Invalid email format")
		.required("Email is required"),
	password: yup
		.string()
		.min(8, "password must be at least 8 characters")
		.label("Password")
		.matches(/[A-Z]/, "Password must contain at least one uppercase letter")
		.matches(/[a-z]/, "Password must contain at least one lowercase letter")
		.matches(/[0-9]/, "Password must contain at least one number")
		.matches(/[\W_]/, "Password must contain at least one special character")
		.required("Password is required"),

	confirmPassword: yup
		.string()
		.required("confirm password is required")
		.oneOf([yup.ref("password")], "Passwords must match"),
	termCondition: yup
		.bool()
		.oneOf([true], "You must accept the terms and conditions"),
});

export const resetPasswordSchema: yup.ObjectSchema<{ email: string }> = yup
	.object()
	.shape({
		email: yup
			.string()
			.required("Email is required")
			.email("Enter a valid email"),
	});

export const searchSchema: yup.ObjectSchema<{ search: string }> = yup
	.object()
	.shape({
		search: yup.string().required("Search field is required"),
	});

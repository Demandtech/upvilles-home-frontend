import { AxiosResponse } from "axios";
import customAxios from "../../../configs/axios";
import {
	SignupFormState,
	LoginFormState,
	ChangePasswordFormState,
} from "../../types/forms";
import { ImageUrl } from "../../types/common";

export const signup = async (
	userData: Partial<SignupFormState>
): Promise<AxiosResponse> => {
	delete userData.confirmPassword;
	delete userData.termCondition;
	const newUser = await customAxios().post("user/create", userData);
	return newUser;
};

export const authUser = async () => {
	const authUser = await customAxios(false).get("user");
	return authUser;
};

export const login = async (credentials: LoginFormState) => {
	const loginUser = await customAxios().post("user/login", credentials);
	return loginUser;
};

export const refreshToken = async (refresh_token: string) => {
	const newTokens = await customAxios().post("user/refresh_token", {
		refresh_token,
	});
	return newTokens;
};

export const updateUser = async (updatedData: FormData) => {
	const updatedUser = await customAxios(false).put("user/update", updatedData);

	return updatedUser;
};

export const changePassword = async ({
	current_password,
	new_password,
}: ChangePasswordFormState) => {
	const response = await customAxios().post("user/change_password", {
		new_password,
		current_password,
	});

	return response;
};

export const updateSettings = async ({
	key,
	value,
}: {
	key: string;
	value: boolean;
}) => {
	const response = await customAxios().patch("user/settings", {
		key,
		value,
	});

	return response;
};

export const userReports = async () => {
	const userReports = await customAxios().get("/user/reports");

	return userReports;
};

export const verifyUser = async (emailToken: string) => {
	const isVerify = await customAxios().post("/user/verify", {
		email_token: emailToken,
	});

	console.log(isVerify);

	return isVerify;
};

export const resendVerification = async (email: string) => {
	const response = await customAxios().post("/user/verify-resend", {
		email,
	});

	return response;
};

export const updateImage = async (image: ImageUrl) => {
	const response = await customAxios().patch("/user/upload", {
		image,
	});

	return response;
};

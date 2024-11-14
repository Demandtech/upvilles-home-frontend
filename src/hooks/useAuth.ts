import { AxiosResponse } from "axios";
import customAxios from "../../configs/axios";
import { SignupFormState, LoginFormState } from "../types/forms";

export default function useAuth() {
	const handleSignup = async (
		userData: Partial<SignupFormState>
	): Promise<AxiosResponse> => {
		delete userData.confirmPassword;
		delete userData.termCondition;
		const newUser = await customAxios().post("user/create", userData);
		return newUser;
	};

	const getAuthUser = async () => {
		const authUser = await customAxios(false).get("user");
		return authUser;
	};

	const handleLogin = async (credentials: LoginFormState) => {
		const loginUser = await customAxios().post("user/login", credentials);
		return loginUser;
	};

	const handleRefreshToken = async (refresh_token: string) => {
		const newTokens = await customAxios().post("user/refresh_token", {
			refresh_token,
		});
		return newTokens;
	};

	const handleUpdateUser = async (updatedData: FormData) => {
		const updatedUser = await customAxios(true).put("user/update", updatedData);

		return updatedUser;
	};

	return {
		handleSignup,
		getAuthUser,
		handleRefreshToken,
		handleLogin,
		handleUpdateUser,
	};
}

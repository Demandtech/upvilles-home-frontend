import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/v1`;

export default function customAxios(isForm: boolean = false): AxiosInstance {
	const instance = axios.create({
		baseURL: BASE_URL,
		headers: {
			"Content-Type": isForm ? "multipart/form-data" : "application/json",
		},
	});

	const tokenStr: string | undefined = Cookies.get("auth_token");

	const token: { access_token: string; refresh_token: string } | undefined =
		tokenStr ? JSON.parse(tokenStr) : undefined;

	instance.interceptors.request.use(
		(config: InternalAxiosRequestConfig) => {
			if (token) {
				config.headers.Authorization = `Bearer ${token.access_token}`;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	instance.interceptors.response.use(
		(response) => {
			return response.data;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	return instance;
}

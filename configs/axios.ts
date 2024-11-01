import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/v1`;

export default function customAxios(
	isForm: boolean = false,
	token?: string
): AxiosInstance {
	const instance = axios.create({
		baseURL: BASE_URL,
		headers: {
			"Content-Type": isForm ? "multipart/form-data" : "application/json",
		},
	});

	console.log(BASE_URL);

	instance.interceptors.request.use(
		(config: InternalAxiosRequestConfig) => {
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
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

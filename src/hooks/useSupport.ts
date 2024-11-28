import { AxiosResponse } from "axios";
import customAxios from "../../configs/axios";

export default function useSupport(): {
	createSupportChat: ({
		img,
		message,
	}: {
		img: { url: string; public_id: string };
		message: string;
	}) => Promise<AxiosResponse>;
} {
	const createSupportChat = async ({
		img,
		message,
	}: {
		img: { url: string; public_id: string };
		message: string;
	}) => {
		const newChat = await customAxios(false).post("/supports/start_chat", {
			img,
			message,
		});

		return newChat;
	};

	return { createSupportChat };
}

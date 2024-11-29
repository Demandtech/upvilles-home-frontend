import { AxiosResponse } from "axios";
import customAxios from "../../configs/axios";

type StartChat = {
	img: { url: string; public_id: string };
	message: string;
};

export default function useSupport(): {
	createSupportChat: ({ img, message }: StartChat) => Promise<AxiosResponse>;
	allMessages: (
		arg1: string,
		arg2: number,
		arg3: number
	) => Promise<AxiosResponse>;
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

	const allMessages = async (
		session_id: string,
		page: number = 1,
		limit: number = 10
	) => {
		const resp = await customAxios(false).get(
			`/supports/messages/${session_id}?page=${page}&limit=${limit}`
		);

		return resp;
	};

	return { createSupportChat, allMessages };
}

import customAxios from "../../../configs/axios";

export const createSupportChat = async ({
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

export const allMessages = async (
	session_id: string,
	page: number = 1,
	limit: number = 10
) => {
	const resp = await customAxios(false).get(
		`/supports/messages/${session_id}?page=${page}&limit=${limit}`
	);

	return resp;
};

export const endChat = async (session_id: string) => {
	console.log(session_id);
	const resp = await customAxios(false).get(`/supports/end_chat/${session_id}`);

	return resp;
};

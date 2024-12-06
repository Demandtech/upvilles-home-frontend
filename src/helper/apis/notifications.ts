import customAxios from "../../../configs/axios";

export const allNotificationsHadler = async (page: number, state: string) => {
	const notifications = await customAxios().get(
		`/notifications?page=${page}&state=${state}`
	);

	return notifications;
};

export const readNotification = async (notificationId: string) => {
	const response = await customAxios().get(`/notifications/${notificationId}`);

	return response;
};

export const readAllNotification = async (user_id: string) => {
	const response = await customAxios().get(`/notifications/${user_id}/read`);

	return response;
};

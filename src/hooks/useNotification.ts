import customAxios from "../../configs/axios";

export default function useNotification() {
	const allNotificationsHadler = async (page: number, state: string) => {
		const notifications = await customAxios().get(
			`/notifications?page=${page}&state=${state}`
		);

		return notifications;
	};

	const readNotification = async (notificationId: string) => {
		const response = await customAxios().get(
			`/notifications/${notificationId}`
		);

		return response;
	};

	const readAllNotification = async (user_id: string) => {
		const response = await customAxios().get(`/notifications/${user_id}/read`);

		return response;
	};

	return { allNotificationsHadler, readNotification, readAllNotification };
}

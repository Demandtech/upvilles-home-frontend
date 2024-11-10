import customAxios from "../../configs/axios";

export default function useNotification() {
	const allNotificationsHadler = async (page: number, state: string) => {
		const notifications = await customAxios().get(
			`/notifications?page=${page}&state=${state}`
		);

		return notifications;
	};

	return { allNotificationsHadler };
}

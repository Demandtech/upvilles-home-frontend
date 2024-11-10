import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/slices/app";
import NotificationList from "../../components/dashboard/notifications/NotificationList";
import { Helmet } from "react-helmet-async";

const Notification = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setTitle({ title: "Notification", showIcon: false }));
	}, []);
	return (
		<>
			<Helmet>
				<title>Upvillehomes || Notifications - Dashboard</title>
			</Helmet>
			<div className="px-3 pt-5 pb-10 sm:px-5 bg-lightBg h-[calc(100dvh-86px)]">
				<NotificationList />
			</div>
		</>
	);
};

export default Notification;

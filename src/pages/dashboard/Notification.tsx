import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/slices/app";
import NotificationList from "../../components/dashboard/notifications/NotificationList";
import { Helmet } from "react-helmet-async";
import useNotification from "../../hooks/useNotification";
import { useQuery } from "@tanstack/react-query";

const Notification = () => {
	const dispatch = useDispatch();
	const { allNotificationsHadler } = useNotification();
	const [page, setPage] = useState<number>(1);
	const [state, setState] = useState<"all" | "unread" | "read">("all");

	const { data } = useQuery({
		queryKey: ["all_notifications", page, state],
		queryFn: () => allNotificationsHadler(page, state),
	});

	useEffect(() => {
		dispatch(setTitle({ title: "Notification", showIcon: false }));
	}, []);

	return (
		<>
			<Helmet>
				<title>Upvillehomes || Notifications - Dashboard</title>
			</Helmet>
			<div className="px-3 pt-5 pb-10 sm:px-5 bg-lightBg h-[calc(100dvh-86px)]">
				{/* {data?.data.meta.current_page} */}
				<NotificationList
					meta={data?.data.meta}
					data={data?.data.notifications}
					setPage={setPage}
					setState={setState}
					state={state}
				/>
			</div>
		</>
	);
};

export default Notification;

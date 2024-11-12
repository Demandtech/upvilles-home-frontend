import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../../redux/slices/app";
import NotificationList from "../../components/dashboard/notifications/NotificationList";
import { Helmet } from "react-helmet-async";
import useNotification from "../../hooks/useNotification";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { RootState } from "../../redux/store";
import { toast } from "../../../configs/services";
import { AxiosError, AxiosResponse } from "axios";
import { User } from "../../types/user";

const Notification = () => {
	const dispatch = useDispatch();
	const { allNotificationsHadler, readNotification, readAllNotification } =
		useNotification();
	const [page, setPage] = useState<number>(1);
	const [state, setState] = useState<"all" | "unread" | "read">("all");
	const { user } = useSelector((state: RootState) => state.user);

	const queryClient = useQueryClient();

	const { data } = useQuery({
		queryKey: ["all_notifications", page, state],
		queryFn: () => allNotificationsHadler(page, state),
	});

	const readMutation = useMutation({
		mutationKey: ["read_notification"],
		mutationFn: readNotification,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["all_notifications", page, state],
			});
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
		onError: (error: AxiosError) => {
			if (error.response?.data) {
				return toast.error(
					(error.response.data as { message: string }).message
				);
			}
		},
	});

	const readAllMutation = useMutation({
		mutationKey: ["read_all_notification"],
		mutationFn: () => readAllNotification(user?._id as string),
		onSuccess: (response: AxiosResponse) => {
			queryClient.invalidateQueries({
				queryKey: ["all_notifications", page, state],
			});
			queryClient.invalidateQueries({ queryKey: ["authUser"] });

			toast.success(response.data.message);
		},
		onError: (error: AxiosError) => {
			if (error.response?.data) {
				return toast.error(
					(error.response.data as { message: string }).message
				);
			}
		},
	});

	const handleReadNotification = (id: string) => readMutation.mutate(id);
	const handleReadAllNotification = () => readAllMutation.mutate();

	useEffect(() => {
		dispatch(setTitle({ title: "Notification", showIcon: false }));
	}, []);

	return (
		<>
			<Helmet>
				<title>Upvillehomes || Notifications - Dashboard</title>
			</Helmet>
			<div className="px-3 pt-5 pb-10 sm:px-5 bg-lightBg h-[calc(100dvh-86px)]">
				<NotificationList
					meta={data?.data.meta}
					data={data?.data.notifications}
					setPage={setPage}
					setState={setState}
					state={state}
					onReadNotification={handleReadNotification}
					onReadAllNotifications={handleReadAllNotification}
					user={user as User}
				/>
			</div>
		</>
	);
};

export default Notification;

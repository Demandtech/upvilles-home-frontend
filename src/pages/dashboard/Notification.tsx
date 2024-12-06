import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../../redux/slices/app";
import NotificationList from "../../components/dashboard/notifications/NotificationList";
import { Helmet } from "react-helmet-async";
import {
	useQueryClient,
	useMutation,
	useInfiniteQuery,
} from "@tanstack/react-query";
import { RootState } from "../../redux/store";
import { toast } from "../../../configs/services";
import { AxiosError, AxiosResponse } from "axios";
import { User } from "../../types/user";
import {
	readAllNotification,
	readNotification,
	allNotificationsHadler,
} from "../../helper/apis/notifications";
import { NotificationType } from "../../types/notification";
import { Spinner } from "@nextui-org/spinner";

const Notification = () => {
	const dispatch = useDispatch();

	const [page, setPage] = useState<number>(1);
	const [state, setState] = useState<"all" | "unread" | "read">("all");
	const { user } = useSelector((state: RootState) => state.user);
	const [notifications, setNotifications] = useState<NotificationType[]>([]);
	const [meta, setMeta] = useState({ unread: 0 });

	const queryClient = useQueryClient();

	const {
		data,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
		isSuccess,
		isLoading,
	} = useInfiniteQuery({
		queryKey: ["all_notifications", state],
		initialPageParam: 1,
		queryFn: async ({ pageParam = 1 }) => {
			return await allNotificationsHadler(pageParam, state);
		},
		getNextPageParam: (lastPage, allPages) =>
			lastPage.data.meta.had_more ? allPages.length + 1 : undefined,
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
		if (isSuccess) {
			const allNotifications = data.pages.flatMap(
				(page) => page.data.notifications
			);
			console.log(allNotifications);

			setNotifications(allNotifications);

			setMeta(data.pages[data.pages.length - 1].data.meta);
		}
	}, [isSuccess, page]);

	useLayoutEffect(() => {
		dispatch(setTitle({ title: "Notification", showIcon: false }));
	}, []);

	return (
		<>
			<Helmet>
				<title>Upvillehomes || Notifications - Dashboard</title>
			</Helmet>
			<div className="px-3 pt-5 pb-10 sm:px-5 bg-lightBg h-[calc(100dvh-86px)]">
				{isLoading ? (
					<div className="flex justify-center pt-10">
						<Spinner size="lg" />
					</div>
				) : (
					<NotificationList
						meta={meta}
						data={notifications}
						setState={setState}
						state={state}
						onReadNotification={handleReadNotification}
						onReadAllNotifications={handleReadAllNotification}
						user={user as User}
						isFetchingMore={isFetchingNextPage}
						hasMore={hasNextPage}
						fetchMore={fetchNextPage}
						setPage={setPage}
					/>
				)}
			</div>
		</>
	);
};

export default Notification;

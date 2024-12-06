import { useRef } from "react";

import Button from "../../ui/Button";
import NotificationItem from "./NotificationItem";
import { CheckedIcon } from "../../svgs";
import { NotificationListProps } from "../../../types/notification";
import { Spinner } from "@nextui-org/spinner";

function NotificationList({
	data,
	meta,
	setState,
	state,
	onReadNotification,
	onReadAllNotifications,
	user,
	isFetchingMore,
	hasMore,
	fetchMore,
	setPage,
}: NotificationListProps) {
	const containerRef = useRef(null);

	const handleScroll = () => {
		const container = containerRef.current;
		if (container) {
			const { scrollTop, scrollHeight, clientHeight } = container;

			if (scrollTop + clientHeight >= scrollHeight) {
				if (hasMore) {
					fetchMore().then(() => setPage((prev: number) => prev + 1));
				}
			}
		}
	};

	return (
		<div className="bg-white h-full scrollbar-hide rounded-md shadow-lg shadow-default-100 overflow-auto">
			<div className="flex sticky z-10 top-0 items-center pt-2 pb-3 bg-[#F3FBFF]">
				<Button
					onPress={() => setState("all")}
					size="sm"
					color="default"
					type="button"
					variant="light"
					aria-label="Show all notifications"
					className={` ${
						state === "all" ? "text-default" : "text-darkGrey opacity-80"
					}	`}
				>
					All
				</Button>
				<Button
					size="sm"
					color="default"
					className={` ${
						state === "unread" ? "text-default" : "text-darkGrey opacity-80"
					}	`}
					type="button"
					variant="light"
					onPress={() => setState("unread")}
					aria-label="Show unread notifications"
					disabled={!user?.unread_notifications}
				>
					Unread({meta?.unread || 0})
				</Button>
				<div className="ml-auto">
					<Button
						className=""
						startContent={<CheckedIcon />}
						size="sm"
						color="primary"
						variant="flat"
						ariaLabel="Mark all notification as read"
						onPress={onReadAllNotifications}
						disabled={!user?.unread_notifications}
					>
						Mark all as read
					</Button>
				</div>
			</div>
			<div
				ref={containerRef}
				onScroll={handleScroll}
				className="overflow-x-auto h-full"
			>
				{data?.length > 0 ? (
					data.map((item) => (
						<NotificationItem
							onReadNotification={onReadNotification}
							key={item._id}
							item={item}
						/>
					))
				) : (
					<p className="p-4 text-center text-darkGrey">
						No notifications available.
					</p>
				)}
				{isFetchingMore && (
					<div className="flex justify-center">
						<Spinner size="sm" />
					</div>
				)}
			</div>
		</div>
	);
}

export default NotificationList;

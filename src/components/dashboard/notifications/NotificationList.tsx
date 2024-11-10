import Button from "../../ui/Button";
import NotificationItem from "./NotificationItem";
import { CheckedIcon } from "../../svgs";
import { NotificationListProps } from "../../../types/notification";
// const notifications = [
// 	{
// 		_id: "id1",
// 		title: "Payment Reminder",
// 		message:
// 			"Tenant James Okoye (Unit 3A) has an overdue rent payment of ₦150,000 for the month of October. Please follow up to ensure timely collection.",
// 		date: "12-09-2024",
// 		time: "8.00am",
// 		isRead: false,
// 	},
// 	{
// 		_id: "id2",
// 		title: "New Maintenance Request Created",
// 		message:
// 			" A new maintenance request has been submitted for Unit 2B regarding a plumbing leak in the kitchen.",
// 		date: "12-09-2024 ",
// 		time: "8.00am",
// 		isRead: true,
// 	},
// 	{
// 		_id: "id3",
// 		title: "Lease Expiration Reminder",
// 		message:
// 			"Lease for Tenant Sarah Adeoye (Unit 5C) is set to expire on November 30, 2024.",
// 		date: "12-09-2024 ",
// 		time: "8.00am",
// 		isRead: false,
// 	},
// 	{
// 		_id: "id4",
// 		title: "Payment Reminder",
// 		message:
// 			"Tenant James Okoye (Unit 3A) has an overdue rent payment of ₦150,000 for the month of October.  Please follow up to ensure timely collection.",
// 		date: "12-09-2024 ",
// 		time: "8.00am",
// 		isRead: true,
// 	},
// 	{
// 		_id: "1d5",
// 		title: "Payment Reminder",
// 		message:
// 			"Tenant James Okoye (Unit 3A) has an overdue rent payment of ₦150,000 for the month of October.  Please follow up to ensure timely collection.",

// 		time: "8.00am",
// 		date: "12-09-2024 ",
// 		isRead: false,
// 	},
// ];

function NotificationList({
	data,
	meta,
	setState,
	state,
	setPage,
}: NotificationListProps) {
	console.log(setPage);
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
					>
						Mark all as read
					</Button>
				</div>
			</div>
			<div className="overflow-x-auto">
				{data?.length > 0 ? (
					data.map((item) => <NotificationItem key={item._id} item={item} />)
				) : (
					<p className="p-4 text-center text-gray-500">
						No notifications available.
					</p>
				)}
			</div>
		</div>
	);
}

export default NotificationList;

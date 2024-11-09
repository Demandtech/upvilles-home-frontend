import { NotificationIcon } from "../../svgs";

function NotificationItem({
	item,
}: {
	item: {
		isRead: boolean;
		title: string;
		date: string;
		message: string;
		time: string;
	};
}) {
	return (
		<div className="py-5 min-h-[100px] last-of-type:border-b-0 px-5 md:px-10 gap-2 md:gap-10 flex flex-col md:flex-row border-b border-[#F0F2F5]">
			<div className="flex gap-5 sm:items-center w-full">
				<div>
					<NotificationIcon
						className="h-7 w-7 sm:w-14 sm:h-14 "
						color={item.isRead ? "white" : "#FF3B30"}
					/>
				</div>
				<div className="">
					<h6 className="font-semibold text-sm sm:text-base">{item?.title}:</h6>
					<p className="text-darkGrey text-xs sm:text-sm lg:text-base">
						{item?.message}
					</p>
				</div>
			</div>
			<div className="text-darkGrey font-medium text-nowrap text-xs sm:text-sm items-center gap-1 flex ">
				<span>{item.date} </span>
				<span className="font-bold"> &middot; </span>
				<span> {item.time}</span>
			</div>
		</div>
	);
}

export default NotificationItem;

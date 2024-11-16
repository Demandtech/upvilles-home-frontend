import moment from "moment";
import { NotificationIcon } from "../../svgs";
import { Notification } from "../../../types/notification";
import { Link } from "react-router-dom";

function NotificationItem({
  item,
  onReadNotification,
}: {
  item: Notification;
  onReadNotification: (id: string) => void;
}) {
  return (
    <>
      {item?.path !== "maintenances" ? (
        <Link
          onClick={() => onReadNotification(item._id)}
          to={`/dashboard/${item.path}/${item.ref}`}
          className="py-5 min-h-[100px] last-of-type:border-b-0 px-5 md:px-10 gap-2 md:gap-10 flex flex-col md:flex-row border-b border-[#F0F2F5] hover:bg-[#f0f2f5] transition-background ease-linear duration-300"
        >
          <div className="flex gap-5 sm:items-center w-full">
            <div>
              <NotificationIcon
                className="h-7 w-7 sm:w-14 sm:h-14 "
                color={item.is_read ? "transparent" : "#FF3B30"}
              />
            </div>
            <div className="">
              <h6 className="font-semibold text-sm sm:text-base">
                {item?.title}:
              </h6>
              <p className="text-darkGrey text-xs sm:text-sm lg:text-base">
                {item?.content}
              </p>
            </div>
          </div>
          <div className="text-darkGrey font-medium text-nowrap text-xs sm:text-sm items-center gap-1 flex ">
            <span>{moment(item.createdAt).format("YYYY-MM-DD")} </span>
            <span className="font-bold"> &middot; </span>
            <span> {moment(item.createdAt).format("HH:MM")}</span>
          </div>
        </Link>
      ) : (
        <div
          onClick={() => onReadNotification(item._id)}
          className="py-5 min-h-[100px] last-of-type:border-b-0 px-5 md:px-10 gap-2 md:gap-10 flex flex-col md:flex-row border-b border-[#F0F2F5] hover:bg-[#f0f2f5] transition-background ease-linear duration-300"
        >
          <div className="flex gap-5 sm:items-center w-full">
            <div>
              <NotificationIcon
                className="h-7 w-7 sm:w-14 sm:h-14 "
                color={item.is_read ? "transparent" : "#FF3B30"}
              />
            </div>
            <div className="">
              <h6 className="font-semibold text-sm sm:text-base">
                {item?.title}:
              </h6>
              <p className="text-darkGrey text-xs sm:text-sm lg:text-base">
                {item?.content}
              </p>
            </div>
          </div>
          <div className="text-darkGrey font-medium text-nowrap text-xs sm:text-sm items-center gap-1 flex ">
            <span>{moment(item.createdAt).format("YYYY-MM-DD")} </span>
            <span className="font-bold"> &middot; </span>
            <span> {moment(item.createdAt).format("HH:MM")}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default NotificationItem;

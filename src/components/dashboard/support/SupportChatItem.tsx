import { Avatar } from "@nextui-org/avatar";
import { Image } from "@nextui-org/image";
import { forwardRef, memo } from "react";
import { ChatType } from "../../../types/support";

const SupportChatItem = forwardRef<HTMLDivElement, ChatType>(
  ({ message, sender, image }, ref) => {
    return (
      <div ref={ref}>
        <div
          className={`${
            sender?.role === "USER"
              ? "ml-auto flex-row-reverse"
              : "mr-auto flex-row"
          } w-full max-w-[80%] flex gap-3`}
        >
          <div>
            <Avatar src={sender?.image?.url as string} className="w-10 h-10" />
          </div>
          <div className="shadow-md rounded-lg chatItem w-full">
            <div>
              {image?.url && (
                <Image
                  className="object-cover rounded-lg"
                  width={"100%"}
                  height={"auto"}
                  src={image?.url as string}
                />
              )}
              {message && (
                <p className={` p-3 text-xs sm:text-sm break-all`}>{message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default memo(SupportChatItem);

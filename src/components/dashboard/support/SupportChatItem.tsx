import { forwardRef, memo } from "react";

type ChatType = {
  _id: string;
  content: string;
  sender: "user" | "admin";
};

const SupportChatItem = forwardRef<HTMLDivElement, ChatType>(
  ({ content, sender }, ref) => {
    return (
      <div
        ref={ref}
        className={`${
          sender === "user" ? "ml-auto" : "mr-auto"
        } p-3 shadow-md rounded-lg max-w-[70%]`}
      >
        <p>{content}</p>
      </div>
    );
  }
);

export default memo(SupportChatItem);

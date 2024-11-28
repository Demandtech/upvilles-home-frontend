import { Avatar } from "@nextui-org/avatar";
import { Image } from "@nextui-org/image";
import { forwardRef, memo } from "react";
import { User } from "../../../types/user";

type ChatType = {
	_id: string;
	message: string | null;
	sender: Partial<User>;
	img?: File | string | undefined;
	// imgUrl: string;
};

const SupportChatItem = forwardRef<HTMLDivElement, ChatType>(
	({ message, sender, img }, ref) => {
		return (
			<div ref={ref}>
				<div
					className={`${
						sender.role === "USER"
							? "ml-auto flex-row-reverse"
							: "mr-auto flex-row"
					} w-[80%] flex gap-3`}
				>
					<div>
						<Avatar className="w-8 h-8" />
					</div>
					<div className="shadow-md rounded-lg chatItem w-full">
						<div>
							{img && (
								<Image
									className="object-cover rounded-lg"
									width={"100%"}
									height={"auto"}
									// src={imgUrl as string}
								/>
							)}
							{message && <p className="p-3 text-sm">{message}</p>}
						</div>
					</div>
				</div>
			</div>
		);
	}
);

export default memo(SupportChatItem);

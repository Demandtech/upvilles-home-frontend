import { Avatar } from "@nextui-org/avatar";
import { Image } from "@nextui-org/image";
import { forwardRef, memo } from "react";

type ChatType = {
	_id: string;
	content: string | null;
	sender: "user" | "admin";
	img: string | null;
};

const SupportChatItem = forwardRef<HTMLDivElement, ChatType>(
	({ content, sender, img }, ref) => {
		return (
			<div ref={ref}>
				<div
					className={`${
						sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto flex-row"
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
									src={img as string}
								/>
							)}
							{content && <p className="p-3 text-sm">{content}</p>}
						</div>
					</div>
				</div>
			</div>
		);
	}
);

export default memo(SupportChatItem);

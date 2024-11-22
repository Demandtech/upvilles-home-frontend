import { Avatar } from "@nextui-org/avatar";
import Button from "../../ui/Button";
import {
	ChangeEvent,
	Dispatch,
	FormEvent,
	SetStateAction,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import SupportChatItem from "./SupportChatItem";
import { ImageIcon, SendIcon, SmileyIcon } from "../../svgs";

type ChatType = {
	_id: string;
	content: string | null;
	sender: "user" | "admin";
	img: string | null;
};

const chats: ChatType[] = [
	{
		_id: "id1",
		content: "I need your app on the maintenance field",
		img: null,
		sender: "user",
	},
	{
		_id: "id2",
		content: "I need your app on the maintenance field",
		sender: "admin",
		img: null,
	},
	{
		_id: "id3",
		content: "I need your app on the maintenance field",
		sender: "user",
		img: null,
	},
	{
		_id: "id4",
		content: "I need your app on the maintenance field",
		sender: "admin",
		img: null,
	},
	{
		_id: "id5",
		content: "I need your app on the maintenance field",
		sender: "user",
		img: null,
	},
	{
		_id: "id6",
		content: "I need your app on the maintenance field",
		sender: "admin",
		img: null,
	},
	{
		_id: "id8",
		content: "I need your app on the maintenance field",
		sender: "user",
		img: null,
	},
	{
		_id: "id9",
		content: null,
		sender: "admin",
		img: "https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg",
	},
	{
		_id: "id10",
		content: "I need your app on the maintenance field",
		sender: "user",
		img: null,
	},
	{
		_id: "id11",
		content: "I need your app on the maintenance field",
		sender: "admin",
		img: null,
	},
	{
		_id: "id12",
		content: "I need your app on the maintenance field",
		sender: "user",
		img: "https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg",
	},
	{
		_id: "id13",
		content: "I need your app on the maintenance field",
		sender: "admin",
		img: null,
	},
];

function SupportChat({
	setStartChat,
}: {
	setStartChat: Dispatch<SetStateAction<boolean>>;
}) {
	const [message, setMessage] = useState<string>("");
	const [chatList, setChatList] = useState<ChatType[]>([...chats]);
	const chatRef = useRef<HTMLDivElement>(null);

	const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;

		if (value || typeof value == "string") {
			setMessage(value);
		}
	}, []);

	const handleSubmit = useCallback(
		(event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			if (!message) return;

			const newMessage: ChatType = {
				content: message,
				sender: "user",
				img: null,
				_id: new Date().toString(),
			};

			setChatList((prev) => [...prev, newMessage]);
		},
		[message]
	);

	useEffect(() => {
		if (chatRef.current) {
			chatRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [chatList]);

	return (
		<div className="bg-white h-full lg:rounded-t-lg shadow-lg shadow-default-100  overflow-hidden">
			<div className="flex flex-col h-full ">
				<div className="bg-primary w-full text-white py-3 px-5 flex items-center gap-3">
					<Avatar />
					<span>Jacinta B.</span>
					<div className="ml-auto">
						<Button
							onPress={() => setStartChat(false)}
							size="sm"
							className="bg-white text-default"
						>
							End Chat
						</Button>
					</div>
				</div>
				<div className="h-full w-full overflow-y-auto p-3 flex flex-col flex-grow scrollbar-hide gap-5">
					{chatList?.map((chat) => (
						<SupportChatItem ref={chatRef} key={chat._id} {...chat} />
					))}
				</div>
				<form onSubmit={handleSubmit} className="mt-auto">
					<div className="relative min-h-12 flex">
						<div className="absolute flex  left-5 bottom-1/2 translate-y-1/2">
							<Button type="button" isIconOnly variant="flat">
								<ImageIcon />
							</Button>
							<Button type="button" isIconOnly variant="flat">
								<SmileyIcon />
							</Button>
						</div>
						<textarea
							name="message"
							placeholder="Enter message"
							value={message}
							onChange={handleChange}
							className="pl-28 resize-none w-full border-t border-[#D2D2D2] bg-[#FCFCFC] min-h-12 focus-within:outline focus:outline-none p-3 textarea-content"
							style={{ ["fieldSizing" as string]: "content" }}
						/>
						<div className="absolute right-5 bottom-1/2 translate-y-1/2">
							<Button
								disabled={!message}
								type="submit"
								isIconOnly
								variant="flat"
							>
								<SendIcon />
							</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default SupportChat;

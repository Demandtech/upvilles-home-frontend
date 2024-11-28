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
import { ImageIcon, SendIcon, SmileyIcon, CloseIcon } from "../../svgs";
import { Image } from "@nextui-org/image";
import { useMutation } from "@tanstack/react-query";
import useSupport from "../../../hooks/useSupport";
import { AxiosError, AxiosResponse } from "axios";
import { User } from "../../../types/user";
import useImage from "../../../hooks/useImage";
import { ImageUrl } from "../../../types/common";

type ChatType = {
	_id: string;
	message: string | null;
	sender: Partial<User>;
	img?: File | string;
};

const chats: ChatType[] = [
	{
		_id: "id1",
		message: "I need your app on the maintenance field",
		img: undefined,
		sender: { role: "USER" },
	},
	{
		_id: "id2",
		message: "I need your app on the maintenance field",
		sender: { role: "ADMIN" },
		img: undefined,
	},
	{
		_id: "id3",
		message: "I need your app on the maintenance field",
		sender: { role: "USER" },
		img: undefined,
	},
	{
		_id: "id4",
		message: "I need your app on the maintenance field",
		sender: { role: "ADMIN" },
		img: undefined,
	},
	{
		_id: "id5",
		message: "I need your app on the maintenance field",
		sender: { role: "USER" },
		img: undefined,
	},
	{
		_id: "id6",
		message: "I need your app on the maintenance field",
		sender: { role: "ADMIN" },
		img: undefined,
	},
	{
		_id: "id8",
		message: "I need your app on the maintenance field",
		sender: { role: "USER" },
		img: undefined,
	},
	{
		_id: "id9",
		message: "",
		sender: { role: "USER" },
		img: "https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg",
	},
	{
		_id: "id10",
		message: "I need your app on the maintenance field",
		sender: { role: "ADMIN" },
		img: undefined,
	},
	{
		_id: "id11",
		message: "I need your app on the maintenance field",
		sender: { role: "USER" },
		img: undefined,
	},
	{
		_id: "id12",
		message: "I need your app on the maintenance field",
		sender: { role: "USER" },
		img: "https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg",
	},
	{
		_id: "id13",
		message: "I need your app on the maintenance field",
		sender: { role: "ADMIN" },
		img: undefined,
	},
];

function SupportChat({
	setStartChat,
}: {
	setStartChat: Dispatch<SetStateAction<boolean>>;
}) {
	const [message, setMessage] = useState<{
		message: string;
		img: ImageUrl;
		imgUrl: string;
	}>({
		message: "",
		img: { url: "", public_id: "" },
		imgUrl: "",
	});
	const [chatList, setChatList] = useState<ChatType[]>([...chats]);
	const chatRef = useRef<HTMLDivElement>(null);
	const { createSupportChat } = useSupport();
	const { uploadImage } = useImage();

	const [currentChat, setCurrentChat] = useState(() => {
		const savedChat = localStorage.getItem("current_support_chat");

		return savedChat ? JSON.parse(savedChat) : null;
	});
	const [uploadProgress, setUploadProgress] = useState<number>(0);

	const startChatMutation = useMutation({
		mutationFn: ({ img, message }: { img: ImageUrl; message: string }) =>
			createSupportChat({ img, message }),
		onSuccess: (res: AxiosResponse) => {
			setCurrentChat(res.data);
			setMessage({ message: "", img: { url: "", public_id: "" }, imgUrl: "" });
			localStorage.setItem("current_support_chat", JSON.stringify(res.data));
		},
		onError: (error: AxiosError) => {
			console.log(error);
		},
	});

	const uploadImageMutation = useMutation({
		mutationFn: ({
			formData,
			setUploadProgress,
		}: {
			formData: FormData;
			setUploadProgress: Dispatch<SetStateAction<number>>;
		}) => uploadImage(formData, setUploadProgress),
		onSuccess: (res) => {
			setMessage((prev) => ({
				...prev,
				imgUrl: res.secure_url,
				img: { url: res.secure_url, public_id: res.public_id },
			}));
		},
		onError: (error: AxiosError) => {
			console.log(error);
			setMessage((prev) => ({
				...prev,
				imgUrl: "",
				img: { url: "", public_id: "" },
			}));
		},
	});

	console.log(chatList, uploadProgress);

	// const deleteImageMutation = useMutation({
	// 	mutationFn: (formData: FormData) => deleteImage(formData),
	// 	onSuccess: () => {
	// 		setMessage((prev) => ({
	// 			...prev,
	// 			imgUrl: "",
	// 			img: { url: "", public_id: "" },
	// 		}));
	// 	},
	// 	onError: (error: AxiosError) => {
	// 		console.log(error);
	// 		toast.error(error.message);
	// 	},
	// });

	const handleDelete = () => {
		const formData = new FormData();
		formData.append("public_id", message.img?.public_id as string);
		formData.append("invalidate", "true");

		// deleteImageMutation.mutate(formData);
	};

	const handleChange = async (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const { value, name, files } = event.target as HTMLInputElement;

		if (name === "img" && files && files.length) {
			const imgFile = files[0];
			const formData = new FormData();
			const imgUrl = URL.createObjectURL(imgFile);

			setMessage((prev) => ({ ...prev, imgUrl }));

			formData.append("file", imgFile);
			formData.append(
				"upload_preset",
				import.meta.env.VITE_CLOUDINARY_MESSAGE_PRESET as string
			);

			uploadImageMutation.mutate({ formData, setUploadProgress });
		} else {
			setMessage((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleSubmit = useCallback(
		(event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			if (!message.message && !message.img) return;

			if (!currentChat) {
				startChatMutation.mutate({
					img: message.img,
					message: message.message,
				});
			} else {
				console.log("Continue Chatting...");
			}
		},
		[message, currentChat]
	);

	useEffect(() => {
		if (chatRef.current) {
			chatRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [chatList]);

	console.log(message, setChatList);

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
				<form
					onSubmit={handleSubmit}
					className="mt-auto border-t border-[#d2d2d2] bg-[#fcfcfc]"
				>
					{message.imgUrl && (
						<div className="py-3 pl-5 relative max-w-[120px]">
							<Image
								src={message.imgUrl}
								width={100}
								height={100}
								className="object-center object-cover"
							/>
							<Button
								onPress={handleDelete}
								variant="flat"
								className="absolute -right-0 top-3 z-20 bg-default-300 !px-0 min-w-4 max-w-4 h-4 rounded-full"
							>
								<CloseIcon className="w-3" />
							</Button>
						</div>
					)}
					<div className="relative min-h-12 flex">
						<div className="absolute flex  left-5 bottom-1/2 translate-y-1/2">
							<Button type="button" isIconOnly variant="flat">
								<label htmlFor="message_img">
									<ImageIcon />
									<input
										hidden
										name="img"
										id="message_img"
										type="file"
										accept="image/jpeg,image/png,image/jpg"
										// value={message.img}
										onChange={handleChange}
									/>
								</label>
							</Button>
							<Button type="button" isIconOnly variant="flat">
								<SmileyIcon />
							</Button>
						</div>
						<textarea
							name="message"
							placeholder="Enter message"
							value={message.message}
							onChange={handleChange}
							className="pl-28 resize-none w-full bg-[#fcfcfc] min-h-12 focus-within:outline focus:outline-none p-3 textarea-content"
							style={{ ["fieldSizing" as string]: "content" }}
						/>
						<div className="absolute right-5 bottom-1/2 translate-y-1/2">
							<Button
								disabled={!message.message.trim() && !message.img}
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

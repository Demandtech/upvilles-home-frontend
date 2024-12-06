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
import {
	ImageIcon,
	SendIcon,
	SmileyIcon,
	CloseIcon,
	ArrowBack,
} from "../../svgs";
import { Image } from "@nextui-org/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useImage from "../../../hooks/useImage";
import { ImageUrl } from "../../../types/common";
import { toast } from "../../../../configs/services";
import { CircularProgress } from "@nextui-org/progress";
import { ChatType } from "../../../types/support";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import whiteLogo from "../../../assets/images/white-logo.png";
import socket from "../../../../configs/socket";
import { CustomModal } from "../../ui/Modal";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { ModalFooter } from "@nextui-org/modal";
import handleError from "../../../utils/handleMutationError";
import {
	createSupportChat,
	endChat,
	allMessages,
} from "../../../helper/apis/supports";

function SupportChat({
	setStartChat,
}: {
	setStartChat: Dispatch<SetStateAction<boolean>>;
}) {
	const [message, setMessage] = useState<{
		message: string;
		img: ImageUrl;
	}>({
		message: "",
		img: { url: "", public_id: "" },
	});
	const [chatList, setChatList] = useState<ChatType[]>([]);
	const chatRef = useRef<HTMLDivElement>(null);
	const { uploadImage, deleteImage } = useImage();
	const { user } = useSelector((state: RootState) => state.user);
	const queryClient = useQueryClient();
	const { onOpen, onOpenChange, isOpen, onClose } = useDisclosure();

	const [currentChat, setCurrentChat] = useState(user?.current_support_session);
	const [uploadProgress, setUploadProgress] = useState<number>(100);

	const { data: messages, isSuccess } = useQuery({
		queryKey: [
			"allMessages",
			user?.current_support_session?._id as string,
			1,
			10,
		],
		queryFn: () =>
			allMessages(user?.current_support_session?._id as string, 1, 20),
		enabled: !!user?.current_support_session,
	});

	const startChatMutation = useMutation({
		mutationFn: ({ img, message }: { img: ImageUrl; message: string }) =>
			createSupportChat({ img, message }),
		onSuccess: (res: AxiosResponse) => {
			setCurrentChat(res.data);
			setMessage({ message: "", img: { url: "", public_id: "" } });
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
		onError: (error: AxiosError) => handleError(error),
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
				img: { url: res.secure_url, public_id: res.public_id },
			}));
		},
		onError: (error: AxiosError) => {
			setMessage((prev) => ({
				...prev,
				img: { url: "", public_id: "" },
			}));

			toast.error(error.message);
		},
	});

	const deleteImageMutation = useMutation({
		mutationFn: (public_id: string) => deleteImage(public_id),
		onSuccess: () => {
			setMessage((prev) => ({
				...prev,
				img: { url: "", public_id: "" },
			}));
			toast.success("Image removed!");
		},
		onError: (error: AxiosError) => {
			toast.error(error.message);
		},
	});
	const endChatMutation = useMutation({
		mutationKey: ["EndChat"],
		mutationFn: () => endChat(user?.current_support_session?._id as string),
		onSuccess: () => {
			setStartChat(false);
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
			toast.success("Chat ended successfully!");
		},
		onError: (error: AxiosError) => {
			console.log(error);
			if (error.response?.data) {
				toast.error((error.response.data as { message: string }).message);
			} else {
				toast.error("An error occured, please try again");
			}
		},
	});

	const handleDelete = (publicId: string) =>
		deleteImageMutation.mutate(publicId);

	const handleChange = async (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const { value, name, files } = event.target as HTMLInputElement;

		if (name === "img" && files && files.length) {
			const imgFile = files[0];
			const formData = new FormData();

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
				startChatMutation.mutate(
					{
						img: message.img,
						message: message.message,
					},
					{
						onSuccess: (res: AxiosResponse) => {
							console.log(res);
							setChatList((prev) => [...prev, res.data.newMessage]);
						},
					}
				);
			} else {
				const newMessage = {
					...message,
					sender: user?._id,
					session_id: user?.current_support_session?._id,
				};

				socket.emit("message", newMessage);
			}
		},
		[message, currentChat]
	);

	useEffect(() => {
		if (chatRef.current) {
			chatRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [chatList, setChatList]);

	useEffect(() => {
		if (isSuccess) {
			setChatList(messages.data.data.messages);
		}
	}, [isSuccess]);

	useEffect(() => {
		if (!user?.current_support_session) return;

		const handleMessage = (data: { success: boolean; data: ChatType }) => {
			if (data.success) {
				if (
					data.data &&
					user.current_support_session &&
					data.data?.session_id?._id === user?.current_support_session?._id
				) {
					setChatList((prev) => [data.data, ...prev]);
					setMessage({ message: "", img: { url: "", public_id: "" } });
				}
			} else {
				toast.error("An error occured sending message!");
			}
		};

		socket.on("message", handleMessage);

		return () => {
			socket.off("message", handleMessage);
		};
	}, [user?.current_support_session?._id]);

	return (
		<div className="bg-white h-full lg:rounded-t-lg shadow-lg shadow-default-100  overflow-hidden">
			<div className="flex flex-col h-full ">
				<div className="bg-primary w-full text-white py-3 px-3 flex items-center gap-3">
					<div className="flex items-center">
						<Button
							onPress={() => setStartChat(false)}
							className="lg:hidden"
							type="button"
							isIconOnly
						>
							<ArrowBack className="w-4" />
						</Button>
						<Avatar
							src={
								user?.current_support_session?.admin
									? user.current_support_session.admin.image.url
									: whiteLogo
							}
							color="primary"
							name={
								user?.current_support_session?.admin
									? user.current_support_session.admin.name
									: "Admin"
							}
							className="w-8 h-8"
						/>
					</div>
					<p className="text-xs sm:text-sm text-nowrap">
						{user?.current_support_session?.admin
							? user?.current_support_session.admin.name
							: "Upvillehomes support"}
					</p>
					<div className="ml-auto">
						<Button
							onPress={onOpen}
							size="sm"
							className="bg-white text-default text-xs"
							disabled={!user?.current_support_session}
						>
							End Chat
						</Button>
					</div>
				</div>
				<div className="h-full w-full overflow-y-auto p-3 flex flex-col flex-grow scrollbar-hide gap-5">
					{chatList
						?.map((chat) => (
							<SupportChatItem ref={chatRef} key={chat?._id} {...chat} />
						))
						.reverse()}
					{user?.current_support_session &&
						!user?.current_support_session?.admin && (
							<p className="text-center text-darkGrey text-xs">
								An admin will join the chat soon
							</p>
						)}
					{!user?.current_support_session && (
						<p className="text-center text-darkGrey text-xs pt-10">
							Send us a message, an Admin will join you soon!
						</p>
					)}
				</div>
				<form
					onSubmit={handleSubmit}
					className="mt-auto border-t border-[#d2d2d2] bg-[#fcfcfc]"
				>
					{message.img.url && !uploadImageMutation.isPending && (
						<div className="py-3 pl-5 relative w-full max-w-[100px]">
							<Image
								src={message.img.url}
								width={80}
								height={80}
								className="object-center object-cover"
							/>
							<Button
								onPress={() => handleDelete(message.img.public_id)}
								variant="flat"
								className="absolute -right-0 top-3 z-20 bg-default-300 !px-0 min-w-4 max-w-4 h-4 rounded-full"
							>
								<CloseIcon className="w-3" />
							</Button>
						</div>
					)}
					{(uploadImageMutation.isPending || uploadProgress < 100) && (
						<CircularProgress
							showValueLabel={true}
							aria-label="Upload Progress"
							value={uploadProgress}
							size="lg"
							color="primary"
						/>
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
							className="pl-28 pr-14 resize-none w-full bg-[#fcfcfc] min-h-12 focus-within:outline focus:outline-none p-3 textarea-content"
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
			<CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
				<div className="flex flex-col items-center gap-7">
					<div className="text-center flex flex-col items-center mb-5">
						<h6 className="text-xl mb-2 font-semibold">Confirmation</h6>
						<p className="my-15 text-darkGrey">
							Are you sure you want to end this chat?
						</p>
					</div>

					<ModalFooter className="border-t justify-between w-full max-w-md">
						<Button variant="flat" className="px-10" onPress={onClose}>
							Cancel
						</Button>
						<Button
							color="danger"
							className="px-10"
							onPress={endChatMutation.mutateAsync}
						>
							End Chat
						</Button>
					</ModalFooter>
				</div>
			</CustomModal>
		</div>
	);
}

export default SupportChat;

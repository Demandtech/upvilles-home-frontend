import {
	useEffect,
	useState,
	SetStateAction,
	Dispatch,
	ChangeEvent,
} from "react";
import { setTitle } from "../../../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@nextui-org/avatar";
import { RootState } from "../../../redux/store";
import { CameraIcon } from "../../../components/svgs";
import { Input } from "@nextui-org/input";
import { toast, useForm, yupResolver } from "../../../../configs/services";
import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { updateProfileSchema } from "../../../schemas/user";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { CustomModal } from "../../../components/ui/Modal";
import SuccessModal from "../../../components/common/SuccessModal";
import { useDisclosure } from "@nextui-org/use-disclosure";
import useImage from "../../../hooks/useImage";
import { ImageUrl } from "../../../types/common";
import { Spinner } from "@nextui-org/spinner";
import handleMutationError from "../../../utils/handleMutationError";
import { CircularProgress } from "@nextui-org/progress";
import { updateUser, updateImage } from "../../../helper/apis/authApi";

function Profile() {
	const { user } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [newImgUrl, setNewImgUrl] = useState(user?.image?.url);
	const queryClient = useQueryClient();
	const { onOpen, onOpenChange, onClose, isOpen } = useDisclosure();
	const [uploadProgress, setUploadProgress] = useState<number>(100);
	const { uploadImage } = useImage();
	const [isDirty, setIsDirty] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(updateProfileSchema),
		defaultValues: {
			name: user?.name,
			email: user?.email,
			company: user?.company,
			phone: user?.phone as string,
		},
	});

	const watchedValues = watch();

	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { files } = event.target as HTMLInputElement;

		if (files?.length) {
			const imageFile = files[0];

			const formData = new FormData();

			formData.append("file", imageFile);
			formData.append(
				"upload_preset",
				import.meta.env.VITE_CLOUDINARY_USER_PRESET as string
			);

			uploadImageMutation.mutate({ formData, setUploadProgress });
		}
	};

	const { mutate, isPending } = useMutation({
		mutationFn: (data: FormData) => updateUser(data),
		onSuccess: () => {
			onOpen();
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
		onError: handleMutationError,
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
			setNewImgUrl(res.secure_url);
			updateUserImageMutation.mutate({
				url: res.secure_url,
				public_id: res.public_id,
			});
		},
		onError: handleMutationError,
	});

	const updateUserImageMutation = useMutation({
		mutationKey: ["change_profile_photo"],
		mutationFn: (img: ImageUrl) => updateImage(img),
		onSuccess: () => {
			toast.success("Image successfully updated!");
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
		onError: handleMutationError,
	});

	const onSubmitForm = (data: {
		name: string;
		email: string;
		company?: string | undefined;
		phone?: string | null;
	}) => {
		const formData = new FormData();

		Object.entries(data).forEach(([key, val]) => {
			formData.append(key, val as string);
		});
		mutate(formData);
	};

	useEffect(() => {
		dispatch(setTitle({ title: "Profile", showIcon: false }));
		queryClient.invalidateQueries({ queryKey: ["authUser"] });
	}, []);

	useEffect(() => {
		const isDirty =
			watchedValues.name !== user?.name ||
			watchedValues.email !== user?.email ||
			watchedValues.company !== user?.company ||
			watchedValues.phone !== user?.phone;

		setIsDirty(isDirty);
	}, [watchedValues]);

	if (!user) {
		return (
			<div className="flex justify-center pt-20">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="px-3 md:px-5 py-5 bg-lightBg min-h-[calc(100dvh-70px)] lg:min-h-[calc(100dvh-86px)]">
			<div className="bg-white px-5 py-10 rounded-xl shadow-lg shadow-default-100 h-full w-full">
				<div className="flex flex-col items-center gap-4">
					<div className="relative min-h-20 min-w-20 flex items-center justify-center">
						{updateUserImageMutation.isPending || uploadProgress < 100 ? (
							<CircularProgress
								showValueLabel={true}
								aria-label="Loading..."
								value={uploadProgress}
								size="lg"
								color="primary"
								minValue={0}
								maxValue={100}
							/>
						) : (
							<Avatar
								src={(newImgUrl as string) || (user?.image?.url as string)}
								color="primary"
								size="lg"
								className={`w-20 h-20`}
							/>
						)}

						<div className="absolute shadow-sm bg-[#003566] p-2 -right-4 bottom-2 rounded-full">
							<label className="block cursor-pointer" htmlFor="profile_image">
								<CameraIcon className="text-white w-5 h-5" size={10} />
								<input
									accept="image/jpeg,image/png,image/jpg"
									id="profile_image"
									type="file"
									hidden
									name="image"
									onChange={handleImageChange}
								/>
							</label>
						</div>
					</div>
					<div className="text-center">
						<h5 className="font-semibold text-sm text-[#27272A]">
							{user?.name}
						</h5>
						<span className="text-[#5C5C5C] text-sm">{user?.email}</span>
					</div>
				</div>
				<div className="max-w-[500px] mx-auto">
					<form onSubmit={handleSubmit(onSubmitForm)}>
						<div className="flex flex-col gap-5 mt-6">
							<div className="gap-5 flex">
								<Input
									labelPlacement="outside"
									label="Name"
									placeholder="Enter full name"
									radius="sm"
									{...register("name")}
									isRequired
									isInvalid={!!errors.name}
									errorMessage={errors.name?.message}
									defaultValue={user?.name}
								/>
								<Input
									labelPlacement="outside"
									label="Email Address"
									placeholder="Enter email address"
									radius="sm"
									{...register("email")}
									isRequired
									isInvalid={!!errors.email}
									errorMessage={errors.email?.message}
									defaultValue={user?.email}
								/>
							</div>
							<div className="flex gap-5">
								<Input
									labelPlacement="outside"
									label="Company"
									placeholder="Enter company name"
									radius="sm"
									{...register("company")}
									isInvalid={!!errors.company}
									errorMessage={errors.company?.message}
									defaultValue={user.company}
								/>
								<Input
									labelPlacement="outside"
									label="Phone"
									placeholder="Enter phone number"
									radius="sm"
									{...register("phone")}
									isInvalid={!!errors.phone}
									errorMessage={errors.phone?.message}
									defaultValue={user.phone as string}
								/>
							</div>
							<Input
								labelPlacement="outside"
								label="Password"
								placeholder="**************"
								radius="sm"
								endContent={
									<Button
										onClick={() =>
											navigate("/dashboard/profile/change_password")
										}
										color="default"
										variant="flat"
										type="button"
									>
										Change password
									</Button>
								}
								defaultValue="**************"
								isReadOnly
							/>
						</div>
						<div className="mt-10 flex w-full gap-5">
							<div className="w-full">
								<Button
									className="w-full flex-1"
									variant="bordered"
									color="default"
									type="button"
									onClick={() => navigate(-1)}
								>
									Cancel
								</Button>
							</div>
							<div className="w-full">
								<Button
									isLoading={isPending}
									color="primary"
									className="w-full"
									type="submit"
									disabled={!isDirty}
								>
									Save information
								</Button>
							</div>
						</div>
					</form>
				</div>
			</div>
			<CustomModal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				onClose={onClose}
			>
				<SuccessModal
					title="Successful!"
					onClose={onClose}
					message="Your information has been saved successfuly."
					buttonLabel="Done"
				/>
			</CustomModal>
		</div>
	);
}

export default Profile;

import { useEffect } from "react";
import { setTitle } from "../../../redux/slices/app";
import { useDispatch } from "react-redux";
import { Input } from "@nextui-org/input";
import { useForm, yupResolver, toast } from "../../../../configs/services";
import Button from "../../../components/ui/Button";
import { changePasswordSchema } from "../../../schemas/user";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { AxiosError } from "axios";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { CustomModal } from "../../../components/ui/Modal";
import SuccessModal from "../../../components/common/SuccessModal";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
	const dispatch = useDispatch();
	const { handleChangePassword } = useAuth();
	const { onClose, onOpen, onOpenChange, isOpen } = useDisclosure();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(changePasswordSchema),
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (data: {
			current_password: string;
			new_password: string;
			confirm_password: string;
		}) => handleChangePassword(data),
		onSuccess: onOpen,
		onError: (error: AxiosError) => {
			console.log(error);
			if (error.response?.data) {
				return toast.error(
					(error.response.data as { message: string }).message
				);
			}
		},
	});

	const onSubmitForm = (data: {
		current_password: string;
		new_password: string;
		confirm_password: string;
	}) => mutate(data);

	const handleModalClose = () => {
		onClose();
		navigate(-1);
	};

	useEffect(() => {
		dispatch(setTitle({ title: "Change Password", showIcon: true }));
	}, []);

	return (
		<>
			<div className="px-3 md:px-5 py-5 bg-lightBg min-h-[calc(100dvh-70px)] lg:min-h-[calc(100dvh-86px)]">
				<div className="bg-white px-5 py-10 rounded-xl shadow-lg shadow-default-100 h-full w-full">
					<div className="max-w-[500px] mx-auto">
						<form onSubmit={handleSubmit(onSubmitForm)}>
							<div className="flex flex-col gap-5">
								<Input
									labelPlacement="outside"
									label="Current Password"
									placeholder="Enter current password"
									radius="sm"
									isInvalid={!!errors.current_password}
									errorMessage={errors.current_password?.message}
									{...register("current_password")}
								/>
								<Input
									labelPlacement="outside"
									label="New Password"
									placeholder="Enter new password"
									isInvalid={!!errors.new_password}
									errorMessage={errors.new_password?.message}
									radius="sm"
									{...register("new_password")}
								/>
								<Input
									labelPlacement="outside"
									label="Confirm New Password"
									placeholder="Re-enter Password"
									isInvalid={!!errors.confirm_password}
									errorMessage={errors.confirm_password?.message}
									radius="sm"
									{...register("confirm_password")}
								/>
							</div>

							<div className="mt-10 ">
								<div className="w-full">
									<Button
										isLoading={isPending}
										type="submit"
										className="w-full"
									>
										Change password
									</Button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			<CustomModal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				onClose={onClose}
			>
				<SuccessModal
					title="Successful!"
					buttonLabel="Done"
					onClose={handleModalClose}
					message="Your password has been changed successfully."
				/>
			</CustomModal>
		</>
	);
}

export default ChangePassword;

import { useEffect } from "react";
import { setTitle } from "../../../redux/slices/app";
import { useDispatch } from "react-redux";
import { Input } from "@nextui-org/input";
import { useForm, yupResolver } from "../../../../configs/services";
import Button from "../../../components/ui/Button";
import { changePasswordSchema } from "../../../utils/schemas/user";

function ChangePassword() {
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(changePasswordSchema),
	});

	const onSubmitForm = (data: any) => {
		console.log(data);
	};

	useEffect(() => {
		dispatch(setTitle({ title: "Change Password", showIcon: true }));
	}, []);

	return (
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
								<Button type="submit" className="w-full">
									Change password
								</Button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ChangePassword;

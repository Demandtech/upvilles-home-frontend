import Button from "../../ui/Button";
import { FC, useState, useEffect } from "react";
import Input from "../../ui/Input";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../../schemas/auth";
import { useForm, yupResolver, toast } from "../../../../configs/services";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../../svgs";
import {
	updateLoginForm,
	resetLoginForm,
} from "../../../redux/slices/forms/login";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { LoginFormState } from "../../../types/forms";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { setUser } from "../../../redux/slices/user";
import { AxiosError } from "axios";
import { login } from "../../../helper/apis/authApi";

const LoginForm: FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState(false);

	const formData = useSelector((state: RootState) => state.login);

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		resolver: yupResolver(loginSchema),
		defaultValues: formData,
	});

	const mutation = useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			Cookies.set(
				"auth_token",
				JSON.stringify({
					access_token: data.data.access_token,
					refresh_token: data.data.refresh_token,
				})
			);
			dispatch(setUser(data.data));
			dispatch(resetLoginForm());
			navigate("/dashboard/properties");
			toast.success("Login successfully");
		},
		onError: (error: AxiosError) => {
			if (error.response?.data) {
				toast.error((error.response?.data as { message: string }).message);
				return;
			}
			toast.error("An error occured, please try again!");
		},
	});

	function submitForm(data: LoginFormState) {
		mutation.mutate(data);
	}

	const watchedFields = watch();

	useEffect(() => {
		Object.entries(watchedFields).forEach(([key, value]) => {
			dispatch(updateLoginForm({ field: key as keyof typeof formData, value }));
		});
	}, [watchedFields, dispatch, formData]);

	return (
		<form className="mt-10 space-y-8" onSubmit={handleSubmit(submitForm)}>
			<div>
				<div className="flex flex-col gap-5">
					<Input
						classNames={{
							label: "!text-white",
						}}
						label="Email Address"
						size="lg"
						placeholder="Enter your your email"
						name="email"
						required={true}
						register={register}
						error={errors.email?.message}
						type="text"
						defaultValue={formData.email}
					/>

					<Input
						classNames={{
							label: "!text-white",
						}}
						name="password"
						label="Password"
						size="lg"
						placeholder="Create a password"
						required={true}
						register={register}
						error={errors.password?.message}
						type={showPassword ? "text" : "password"}
						defaultValue={formData.password}
						endContent={
							<Button
								className="bg-transparent rounded-full"
								size="sm"
								type="button"
								isIconOnly
								onPress={() => setShowPassword((prev) => !prev)} // Toggle visibility
							>
								{showPassword ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
							</Button>
						}
					/>
				</div>
				<div className="text-end mt-1">
					<Link className="underline" to="/auth/reset-password">
						Forgot Pasword?
					</Link>
				</div>
			</div>
			<Button
				size="lg"
				className="w-full bg-white text-default"
				type="submit"
				isLoading={mutation.isPending}
			>
				Login
			</Button>
		</form>
	);
};

export default LoginForm;

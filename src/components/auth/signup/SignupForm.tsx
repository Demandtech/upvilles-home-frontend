import { FC, useState, useEffect, useCallback } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { Checkbox } from "@nextui-org/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "../../../utils/schemas/auth";
import { toast, useForm, yupResolver } from "../../../../configs/services";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../../svgs";
import { SignupFormState } from "../../../types/forms";
import { updateForm, resetForm } from "../../../redux/slices/forms/signup";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Cookies from "js-cookie";
import { setUser } from "../../../redux/slices/user";
import { User, Stats } from "../../../types/user";
import SuccessModal from "../../common/SuccessModal";
import { CustomModal } from "../../ui/Modal";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { AxiosError } from "axios";

const SignupForm: FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const [showPassword, setShowPassword] = useState({
		password: false,
		confirmPassword: false,
	});
	const [formKey, setFormKey] = useState(new Date().toISOString());
	const formData = useSelector((state: RootState) => state.signup);
	const { handleSignup } = useAuth();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(signupSchema),
		defaultValues: formData,
		mode: "onChange",
	});

	const watchedFields = watch();

	const handleMutationSuccess = useCallback(
		(data: {
			data: {
				access_token: string;
				refresh_token: string;
				user: User;
				stats: Stats;
			};
		}) => {
			Cookies.set(
				"auth_token",
				JSON.stringify({
					access_token: data.data.access_token,
					refresh_token: data.data.refresh_token,
				})
			);

			dispatch(resetForm());
			setFormKey(new Date().toISOString());
			dispatch(setUser({ user: data.data.user, stats: data.data.stats }));
			onOpen();
		},
		[dispatch, navigate]
	);

	const mutation = useMutation({
		mutationFn: handleSignup,
		onSuccess: handleMutationSuccess,
		onError: (error: AxiosError) => {
			if (error.response?.data) {
				toast.error((error.response.data as { message: string }).message);
				return;
			}
			toast.error("An error occured, try again later");
		},
	});

	const submitForm = (data: SignupFormState) => mutation.mutate(data);

	const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
		setShowPassword((prev) => ({
			...prev,
			[field]: !prev[field],
		}));
	};

	const onSuccessModalClose = () => {
		onClose();
		navigate("/auth/login");
	};

	useEffect(() => {
		Object.entries(watchedFields).forEach(([key, value]) => {
			dispatch(updateForm({ field: key as keyof typeof formData, value }));
		});
	}, [watchedFields, dispatch]);

	return (
		<>
			<form
				key={formKey}
				className="space-y-10 mt-10"
				onSubmit={handleSubmit(submitForm)}
			>
				<div>
					<div className="grid gap-y-5 gap-x-3 sm:grid-cols-2">
						<Input
							label="Full name"
							size="lg"
							placeholder="Enter your full name"
							name="name"
							required
							register={register}
							error={errors.name?.message}
							type="text"
							defaultValue={formData.name}
						/>
						<Input
							label="Email Address"
							size="lg"
							placeholder="Enter your email"
							name="email"
							required
							register={register}
							error={errors.email?.message}
							type="text"
							defaultValue={formData.email}
						/>
						<Input
							label="Phone number"
							size="lg"
							placeholder="Enter your phone number"
							name="phone"
							register={register}
							error={errors.phone?.message}
							type="text"
							defaultValue={formData.phone as string}
						/>
						<Input
							label="Company name"
							size="lg"
							placeholder="Enter company name"
							name="company"
							register={register}
							error={errors.company?.message}
							type="text"
							defaultValue={formData.company as string}
						/>
						<Input
							name="password"
							label="Password"
							size="lg"
							placeholder="Create a password"
							required
							register={register}
							error={errors.password?.message}
							type={showPassword.password ? "text" : "password"}
							defaultValue={formData.password}
							endContent={
								<Button
									className="bg-transparent rounded-full"
									size="sm"
									type="button"
									isIconOnly
									onClick={() => togglePasswordVisibility("password")}
								>
									{showPassword.password ? (
										<EyeSlashFilledIcon />
									) : (
										<EyeFilledIcon />
									)}
								</Button>
							}
						/>
						<Input
							name="confirmPassword"
							label="Confirm password"
							size="lg"
							placeholder="Re-enter your password"
							required
							register={register}
							error={errors.confirmPassword?.message}
							type={showPassword.confirmPassword ? "text" : "password"}
							defaultValue={formData.confirmPassword as string}
							endContent={
								<Button
									className="bg-transparent rounded-full"
									size="sm"
									type="button"
									isIconOnly
									onClick={() => togglePasswordVisibility("confirmPassword")}
								>
									{showPassword.confirmPassword ? (
										<EyeSlashFilledIcon />
									) : (
										<EyeFilledIcon />
									)}
								</Button>
							}
						/>
					</div>
					<div className="mt-3">
						<Checkbox
							classNames={{
								base: "border-none",
								icon: "text-white",
								wrapper: "bg-white/80",
							}}
							color="primary"
							{...register("termCondition")}
							isInvalid={!!errors.termCondition?.message}
						>
							<div className="text-white/80">
								I agree to the Terms of
								<Link className="underline text-white" to="#">
									Service
								</Link>
								and
								<Link className="underline text-white" to="#">
									Privacy Policy
								</Link>
							</div>
						</Checkbox>
						{errors.termCondition && errors.termCondition.message ? (
							<p className="text-xs text-danger">
								{errors.termCondition.message}
							</p>
						) : null}
					</div>
				</div>
				<Button
					isLoading={mutation.isPending}
					size="lg"
					className="w-full text-default bg-white"
					type="submit"
				>
					Sign up
				</Button>
			</form>
			<CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
				<SuccessModal
					onClose={onSuccessModalClose}
					title="Successful!"
					message="User Registration is successful! verification email has been sent to your email"
					buttonLabel="Continue"
				/>
			</CustomModal>
		</>
	);
};

export default SignupForm;

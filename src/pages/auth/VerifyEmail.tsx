import { useNavigate, useLocation } from "react-router-dom";
import { SuccessIcon } from "../../components/svgs";
import Button from "../../components/ui/Button";
import { useCallback, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { AxiosError } from "axios";
import { toast } from "../../../configs/services";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/user";
import { Spinner } from "@nextui-org/spinner";

function VerifyEmail() {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const { handleVerifyUser, handleResendVerification } = useAuth();
	const queryParams = new URLSearchParams(location.search);
	const emailToken = queryParams.get("emailToken");
	const [email, setEmail] = useState<string>("");

	const verifyMutation = useMutation({
		mutationFn: (token: string) => handleVerifyUser(token),
		onSuccess: (data) => {
			console.log(data);
			Cookies.set(
				"auth_token",
				JSON.stringify({
					access_token: data.data.access_token,
					refresh_token: data.data.refresh_token,
				})
			);
			dispatch(setUser(data.data));
		},
		onError: (error: AxiosError) => {
			const status = error.response?.status;

			if (status === 400) {
				const responseData = error.response?.data as { message?: string };
				const message = responseData?.message;

				if (message && message.includes(":")) {
					const email = message.split(":")[1].trim();
					if (email.includes("@")) {
						setEmail(email);
					}
				}
			}
		},
	});

	const resendMutation = useMutation({
		mutationFn: (email: string) => handleResendVerification(email),
		onSuccess: () => {
			toast.success("Verification link resent successfully!");
		},

		onError: () => {
			toast.error("An error occured, try again!");
		},
	});

	const resendTokenHandler = () => resendMutation.mutate(email);

	const verifyEmailHandler = useCallback(() => {
		if (!emailToken) return;

		verifyMutation.mutate(emailToken as string);
	}, [emailToken]);

	useEffect(() => verifyEmailHandler(), [emailToken]);

	return (
		<>
			{verifyMutation.isSuccess && !verifyMutation.isPending && (
				<div className="mt-12">
					<div className="flex flex-col items-center mb-10">
						<SuccessIcon />

						<h5 className="font-semibold font-lg py-4">Successful!</h5>
						<p>You email verification is successful, you can continue</p>
					</div>
					<div className="flex justify-center w-full">
						<Button
							onClick={() => navigate("/dashboard/properties")}
							size="lg"
							className="w-full max-w-sm text-default bg-white"
							type="submit"
						>
							Continue to Dashboard
						</Button>
					</div>
				</div>
			)}
			{verifyMutation.isError && !verifyMutation.isPending && (
				<div className="text-center">
					<div className="my-5">
						<h5 className="font-semibold font-lg pb-3 text-danger">Failed!</h5>
						<p className="text-danger">
							Verification token is invalid or expired, please try again!
						</p>
					</div>
					<div className="flex justify-center w-full">
						<Button
							onClick={resendTokenHandler}
							size="lg"
							className="w-full max-w-sm text-default bg-white"
							type="submit"
							disabled={!!!email}
							isLoading={resendMutation.isPending}
						>
							Resend verification link
						</Button>
					</div>
				</div>
			)}
			{verifyMutation.isPending && (
				<div className="mt-14 flex justify-center">
					<Spinner size="lg" color="secondary" />
				</div>
			)}
		</>
	);
}

export default VerifyEmail;

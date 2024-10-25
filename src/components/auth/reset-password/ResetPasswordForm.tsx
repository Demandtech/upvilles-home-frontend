import { FormEventHandler } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { Link } from "react-router-dom";

const ResetPasswordForm = ({
	submitForm,
}: {
	submitForm: FormEventHandler<HTMLFormElement>;
}) => {
	return (
		<form className="flex flex-col my-8 space-y-8 items-center w-full">
			<div className="w-full space-y-5">
				<Input
					label="Email Address"
					size="lg"
					placeholder="Enter your your email"
					name="email"
					required={true}
				/>
				<Button
					onPress={submitForm}
					size="lg"
					className="w-full bg-white text-default"
					type="submit"
				>
					Reset Password
				</Button>
			</div>
			<div>
				<Link className="underline" to="/auth/login">
					Back to Login
				</Link>
			</div>
		</form>
	);
};

export default ResetPasswordForm;

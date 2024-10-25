import Button from "../../ui/Button";
import { FC, FormEventHandler } from "react";
import Input from "../../ui/Input";
import { Link } from "react-router-dom";

const LoginForm: FC<{
	submitForm: FormEventHandler<HTMLFormElement>;
}> = ({ submitForm }) => {
	return (
		<form className="mt-10 space-y-8" onSubmit={submitForm}>
			<div>
				<div className="space-y-4">
					<Input
						label="Email Address"
						size="lg"
						placeholder="Enter your your email"
						name="email"
						required={true}
					/>

					<Input
						name="password"
						label="Password"
						size="lg"
						placeholder="Create a password"
						required={true}
					/>
				</div>
				<div className="text-end mt-1">
					<Link className="underline" to="/auth/reset-password">
						Forgot Pasword?
					</Link>
				</div>
			</div>
			<Button
				onPress={submitForm}
				size="lg"
				className="w-full bg-white text-default"
				type="submit"
			>
				Login
			</Button>
		</form>
	);
};

export default LoginForm;

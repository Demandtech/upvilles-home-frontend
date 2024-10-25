import { FormEventHandler, FC } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { Checkbox } from "@nextui-org/checkbox";
import { Link } from "react-router-dom";

const SignupForm: FC<{
	submitForm: FormEventHandler<HTMLFormElement>;
}> = ({ submitForm }) => {
	return (
		<form className="space-y-10 mt-10" onSubmit={submitForm}>
			<div>
				<div className="grid gap-y-5 gap-x-3 sm:grid-cols-2">
					<Input
						label="Full name"
						size="lg"
						placeholder="Enter your full name"
						name="name"
						required={true}
					/>
					<Input
						label="Email Address"
						size="lg"
						placeholder="Enter your your email"
						name="email"
						required={true}
					/>
					<Input
						label="Phone number"
						size="lg"
						placeholder="Enter your your phone number"
						name="phone"
						required={false}
					/>
					<Input
						label="Company name"
						size="lg"
						placeholder="Enter company name"
						name="company"
						required={false}
					/>
					<Input
						name="password"
						label="Password"
						size="lg"
						placeholder="Create a password"
						required={true}
					/>
					<Input
						name="confirm_password"
						label="Confirm password"
						size="lg"
						placeholder="Re-enter your password"
						required={true}
					/>
				</div>
				<div className="mt-3">
					<Checkbox
						classNames={{
							base: "border-none",
							icon: "text-white",
							wrapper: "bg-white",
						}}
						className="border-none"
						color="primary"
					>
						<div className="text-white/80">
							I agree to the Terms of
							<Link className="underline text-white" to="#">
								{" "}
								Service{" "}
							</Link>
							and
							<Link className="underline text-white" to="#">
								{" "}
								Privacy Policy
							</Link>
						</div>
					</Checkbox>
				</div>
			</div>
			<Button size="lg" className="w-full text-default bg-white" type="submit">
				Sign up
			</Button>
		</form>
	);
};

export default SignupForm;

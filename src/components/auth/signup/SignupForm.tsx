import { FC, useState } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { Checkbox } from "@nextui-org/checkbox";
import { Link } from "react-router-dom";
import { signupSchema } from "../../../utils/schemas/auth";
import { useForm, yupResolver } from "../../../configs/services";

const SignupForm: FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(signupSchema),
	});

	function submitForm(data: any) {
		console.log(data);
	}

	return (
		<form className="space-y-10 mt-10" onSubmit={handleSubmit(submitForm)}>
			<div>
				<div className="grid gap-y-5 gap-x-3 sm:grid-cols-2">
					<Input
						label="Full name"
						size="lg"
						placeholder="Enter your full name"
						name="name"
						required={true}
						register={register}
						error={errors.name?.message}
					/>
					<Input
						label="Email Address"
						size="lg"
						placeholder="Enter your your email"
						name="email"
						required={true}
						register={register}
						error={errors.email?.message}
					/>
					<Input
						label="Phone number"
						size="lg"
						placeholder="Enter your your phone number"
						name="phone"
						required={false}
						register={register}
						error={errors.phone?.message}
					/>
					<Input
						label="Company name"
						size="lg"
						placeholder="Enter company name"
						name="company"
						required={false}
						register={register}
						error={errors.company?.message}
					/>
					<Input
						name="password"
						label="Password"
						size="lg"
						placeholder="Create a password"
						required={true}
						register={register}
						error={errors.password?.message}
					/>
					<Input
						name="confirmPassword"
						label="Confirm password"
						size="lg"
						placeholder="Re-enter your password"
						required={true}
						register={register}
						error={errors.confirmPassword?.message}
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
						{...register("termCondition")}
						isInvalid={!!errors.termCondition?.message}
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
					{errors.termCondition && (
						<p className="text-xs text-danger">
							{errors.termCondition.message}
						</p>
					)}
				</div>
			</div>
			<Button
				isLoading={isLoading}
				size="lg"
				className="w-full text-default bg-white"
				type="submit"
			>
				Sign up
			</Button>
		</form>
	);
};

export default SignupForm;

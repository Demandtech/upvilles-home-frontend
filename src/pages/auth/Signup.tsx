import { FC } from "react";
import { Link } from "react-router-dom";
import SignupForm from "../../components/auth/signup/SignupForm";

const Signup: FC = () => {
	function submitForm() {
		console.log("Sign up...");
	}
	return (
		<div>
			<SignupForm submitForm={submitForm} />

			<p className="text-center mt-10">
				Already have an account?{" "}
				<Link className=" underline" to="/auth/login">
					Sign In
				</Link>
			</p>
		</div>
	);
};

export default Signup;

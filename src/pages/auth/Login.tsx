import { FC } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/auth/login/LoginForm";


const Login: FC = () => {
	return (
		<div>
			<LoginForm />

			<p className="text-center mt-8">
				New member? Create your account here{" "}
				<Link className=" underline" to="/auth/signup">
					Sign up
				</Link>
			</p>
		</div>
	);
};

export default Login;

import { Outlet } from "react-router-dom";
import { FC } from "react";

const AuthLayout: FC = () => {
	return (
		<main className="bg-purple-200">
			<Outlet />
		</main>
	);
};

export default AuthLayout;

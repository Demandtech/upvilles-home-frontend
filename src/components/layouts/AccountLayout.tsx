import { Outlet } from "react-router-dom";
import { FC } from "react";

const AccountLayout: FC = () => {
	return (
		<main className="bg-purple-200">
			<Outlet />
		</main>
	);
};

export default AccountLayout;

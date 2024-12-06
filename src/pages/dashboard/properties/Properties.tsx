import { FC, useLayoutEffect } from "react";
import { Summary, Properties } from "../../../components/dashboard/property";
import { setTitle } from "../../../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Helmet } from "react-helmet-async";
import { Stats } from "../../../types/user";

const Dashboard: FC = () => {
	const dispatch = useDispatch();
	const { stats, user } = useSelector((state: RootState) => state.user);

	useLayoutEffect(() => {
		dispatch(
			setTitle({
				title: <Welcome name={user?.company as string} />,
				showIcon: false,
			})
		);

		let timeoutId = setTimeout(() => {
			dispatch(
				setTitle({
					title: "Dashboard",
					showIcon: false,
				})
			);
		}, 10000);

		return () => clearTimeout(timeoutId);
	}, [user]);

	return (
		<div>
			<Helmet>
				<title>Upvillehomes | Properties - Dashboard</title>
			</Helmet>
			<Summary stats={stats as Stats} />
			<Properties />
		</div>
	);
};

function Welcome({ name }: { name: string }) {
	return (
		<div>
			<p className="font-normal text-base">👋 Hi, {name}!</p>

			<h3 className="text-2xl lg:min-w-28 text-nowrap">
				Welcome to your Dashboard
			</h3>
		</div>
	);
}

export default Dashboard;

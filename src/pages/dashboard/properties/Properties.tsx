import { FC, useEffect } from "react";
import { Summary, Properties } from "../../../components/dashboard/property";
import { setTitle } from "../../../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Helmet } from "react-helmet-async";
import { Stats } from "../../../types/user";

const Dashboard: FC = () => {
	const dispatch = useDispatch();
	const { stats } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		dispatch(setTitle({ title: "Dashboard", showIcon: false }));
	}, []);

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

export default Dashboard;

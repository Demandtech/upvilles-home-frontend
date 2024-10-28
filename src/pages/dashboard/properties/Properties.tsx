import { FC, useEffect } from "react";
import { Summary, Properties } from "../../../components/dashboard/properties";
import { setTitle } from "../../../redux/slices/app";
import { useDispatch } from "react-redux";

const Dashboard: FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setTitle({title:"Properties", showIcon:false}));
	}, []);

	return (
		<div>
			<Summary />
			<Properties />
		</div>
	);
};

export default Dashboard;

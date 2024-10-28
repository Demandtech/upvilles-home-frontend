import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/slices/app";

const Report = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setTitle({ title: "Report", showIcon: false }));
	}, []);
	return <div>Report</div>;
};

export default Report;

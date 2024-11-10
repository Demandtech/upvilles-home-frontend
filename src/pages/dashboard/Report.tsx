import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/slices/app";

const Report = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setTitle({ title: "Report", showIcon: false }));
	}, []);
	return (
		<div className="bg-lightBg min-h-screen px-3 md:px-5 py-5">Report</div>
	);
};

export default Report;

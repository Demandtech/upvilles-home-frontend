import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/slices/state";

const Report = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setTitle("Report"));
	}, []);
	return <div>Report</div>;
};

export default Report;

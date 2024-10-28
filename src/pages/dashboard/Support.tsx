import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/slices/app";

const Support = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setTitle({ title: "Support", showIcon: false }));
	}, []);
	return <div>Support</div>;
};

export default Support;

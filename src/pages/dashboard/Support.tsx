import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/slices/state";

const Support = () => {
	const dispatch = useDispatch();
	
	useEffect(() => {
		dispatch(setTitle("Support"));
	}, []);
	return <div>Support</div>;
};

export default Support;

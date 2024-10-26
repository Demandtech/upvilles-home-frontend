import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/slices/state";

const Notification = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setTitle("Notification"));
	}, []);
	return <div>Notification</div>;
};

export default Notification;

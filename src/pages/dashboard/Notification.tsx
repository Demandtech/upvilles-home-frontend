import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/slices/app";

const Notification = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setTitle({ title: "Notification", showIcon: false }));
	}, []);
	return <div>Notification</div>;
};

export default Notification;

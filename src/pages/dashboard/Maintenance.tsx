import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/slices/app";

const Maintenance = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setTitle({ title: "Maintenance", showIcon: false }));
	}, []);
	return <div>Maintenance</div>;
};

export default Maintenance;

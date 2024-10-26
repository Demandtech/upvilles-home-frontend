import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/slices/state";

const Maintenance = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setTitle("Maintenance"));
	}, []);
	return <div>Maintenance</div>;
};

export default Maintenance;

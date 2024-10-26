import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/slices/state";

const Settings = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setTitle("Settings"));
	}, []);
	return <div>Settings</div>;
};

export default Settings;

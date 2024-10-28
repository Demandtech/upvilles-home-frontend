import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/slices/app";

const Settings = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setTitle({title:"Settings", showIcon:false}));
	}, []);
	return <div>Settings</div>;
};

export default Settings;

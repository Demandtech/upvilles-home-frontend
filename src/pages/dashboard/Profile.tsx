import { useEffect } from "react";
import { setTitle } from "../../redux/slices/app";
import { useDispatch } from "react-redux";

function Profile() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setTitle({ title: "Profile", showIcon: false }));
	}, []);
	return <div>Profile</div>;
}

export default Profile;

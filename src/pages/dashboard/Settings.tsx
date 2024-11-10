import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/slices/app";
import SettingWrapper from "../../components/dashboard/settings/SettingWrapper";
import { Helmet } from "react-helmet-async";

const Settings = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setTitle({ title: "Settings", showIcon: false }));
	}, []);
	return (
		<>
			<Helmet>
				<title>Upvillehomes || Settings - Dashboard</title>
			</Helmet>
			<div className="px-3 pt-5 pb-10 sm:px-5 bg-lightBg h-[calc(100dvh-86px)]">
				<SettingWrapper />
			</div>
		</>
	);
};

export default Settings;

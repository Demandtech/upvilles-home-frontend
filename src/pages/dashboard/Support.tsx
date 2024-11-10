import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/slices/app";
import SupportList from "../../components/dashboard/support/SupportList";
import { Helmet } from "react-helmet-async";

const Support = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setTitle({ title: "Support", showIcon: false }));
	}, []);
	return (
		<>
			<Helmet>
				<title>Upvillehomes || Support - Dashboard</title>
			</Helmet>
			<div className="px-3 pt-5 overflow-auto pb-10 sm:px-5 bg-lightBg h-[calc(100dvh-86px)]">
				<h3 className="text-2xl font-bold text-default">
					Hello, Ayomide. <br />{" "}
					<span className="text-darkGrey">What would you like to know?</span>
				</h3>
				<div className="mt-10">
					<SupportList />
				</div>
			</div>
		</>
	);
};

export default Support;

import { useEffect } from "react";
import { setTitle } from "../../../redux/slices/app";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";

const AddTenant = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setTitle({ showIcon: true, title: "Add Property" }));
	}, []);
	return (
		<>
			<Helmet>
				<title>Upvillehomes | Add Tenant</title>
			</Helmet>
			<div>Add Tenant</div>
		</>
	);
};

export default AddTenant;

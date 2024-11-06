import { useEffect } from "react";
import { setTitle } from "../../../redux/slices/app";
import { useDispatch } from "react-redux";

function TenantDetails() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setTitle({ showIcon: true, title: "Tenant Details" }));
	}, []);
	return <div>TenantDetails</div>;
}

export default TenantDetails;

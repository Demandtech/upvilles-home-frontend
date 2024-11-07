import { useEffect } from "react";
import { setTitle } from "../../../redux/slices/app";
import { useDispatch } from "react-redux";

export default function MaintenanceDetails() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setTitle({ showIcon: true, title: "Tenant Details" }));
	}, []);
	return <div>TenantDetails</div>;
}

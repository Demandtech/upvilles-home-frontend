import { useEffect } from "react";
import { setTitle } from "../../../redux/slices/app";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ManagePropertyWrapper from "../../../components/dashboard/manageProperty/ManagePropertyWrapper";

export default function ManageProperty() {
	const dispatch = useDispatch();
	const [searchParams] = useSearchParams();

	const id = searchParams.get("id");

	useEffect(() => {
		dispatch(
			setTitle({ showIcon: true, title: id ? "Edit Property" : "Add Property" })
		);
	}, []);

	return (
		<div className="p-3 md:p-5">
			<ManagePropertyWrapper id={Number(id)} />
		</div>
	);
}

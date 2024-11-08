import { useEffect } from "react";
import { setTitle } from "../../../redux/slices/app";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useMaintenance from "../../../hooks/useMaintenance";
import { Spinner } from "@nextui-org/spinner";
import { setMaintenanceDetails } from "../../../redux/slices/maintenance";

export default function MaintenanceDetails() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { singleMaintenanceHandler } = useMaintenance();

	const {
		data: singleMaintenance,
		isSuccess,
		isLoading,
	} = useQuery({
		queryKey: ["maintenance_details", id],
		queryFn: () => singleMaintenanceHandler(id as string),
		enabled: !!id,
	});

	useEffect(() => {
		if (singleMaintenance && isSuccess) {
			dispatch(setMaintenanceDetails(singleMaintenance.data));
		}
	}, [isSuccess, singleMaintenance]);

	useEffect(() => {
		dispatch(setTitle({ showIcon: true, title: "Maintenance Details" }));
	}, [id]);

	return (
		<div>
			{isLoading ? (
				<div className="w-full h-full flex flex-col items-center justify-center gap-5 pt-20">
					<Spinner label="Loading..." color="primary" size="lg" />
				</div>
			) : (
				<p>Maintenance Details</p>
			)}
		</div>
	);
}

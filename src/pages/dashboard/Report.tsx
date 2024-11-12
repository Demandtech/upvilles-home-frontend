import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../../redux/slices/app";
import ReportTopWrapper from "../../components/dashboard/report/ReportTopWrapper";
import MaintenanceReport from "../../components/dashboard/report/MaintenanceReport";
import PaymentReport from "../../components/dashboard/report/PaymentReport";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import useMaintenance from "../../hooks/useMaintenance";
import useProperty from "../../hooks/useProperty";
import { AxiosResponse } from "axios";
import { RootState } from "../../redux/store";

const Report = () => {
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	const [sortBy, setSortBy] = useState({ column: "", direction: "descending" });
	const { allMaintenancesHandler } = useMaintenance();
	const { allProperties } = useProperty();
	const { stats } = useSelector((state: RootState) => state.user);

	const { data, isLoading: isMaintenancesLoading } = useQuery<
		AxiosResponse,
		Error
	>({
		queryKey: ["maintenances", page, sortBy.column, sortBy.direction],
		queryFn: () =>
			allMaintenancesHandler(page, sortBy.column, sortBy.direction),
	} as UseQueryOptions<AxiosResponse, Error>);

	const { data: propertiesData } = useQuery<AxiosResponse, Error>({
		queryKey: ["properties"],
		queryFn: allProperties,
	} as UseQueryOptions<AxiosResponse, Error>);

	console.log({
		setSortBy,
		setPage,
	});

	useEffect(() => {
		dispatch(setTitle({ title: "Report", showIcon: false }));
	}, []);

	return (
		<div className="bg-lightBg min-h-screen px-3 md:px-5 py-5">
			<ReportTopWrapper
				total_maintenance_cost={stats?.total_maintenance_cost as number}
				total_properties={stats?.total_properties as number}
				overdue_maintenance={stats?.overdue_maintenance as number}
				occupancy_rate={stats?.occupancy_rate as string}
				properties={propertiesData?.data.properties}
			/>
			<PaymentReport />
			<MaintenanceReport
				maintenances={data?.data.maintenances}
				rowLoading={isMaintenancesLoading}
			/>
		</div>
	);
};

export default Report;

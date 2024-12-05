import { useState, useLayoutEffect } from "react";
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
import useTenant from "../../hooks/useTenant";
import useAuth from "../../hooks/useAuth";
import { useSearchParams } from "react-router-dom";

const Report = () => {
	const dispatch = useDispatch();
	const { stats } = useSelector((state: RootState) => state.user);
	const [searchParams] = useSearchParams();
	const [maintenancesPage, setMaintenancesPage] = useState(1);
	const [tenantsPage, setTenantsPage] = useState(1);
	const [sortMaintenancesBy, setMaintenancesSortBy] = useState({
		column: "",
		direction: "descending",
	});
	const [sortTenantsBy, setTenantsSortBy] = useState({
		column: "",
		direction: "descending",
	});

	let search = searchParams.get("q");
	let limit = 5;
	const { allMaintenancesHandler } = useMaintenance();
	const { allProperties } = useProperty();
	const { allTenantsHandler } = useTenant();
	const { handleUserReports } = useAuth();

	const { data: propertiesData } = allProperties(
		1,
		"",
		stats?.total_properties
	);

	const { data: maintenanceData, isLoading: isMaintenancesLoading } =
		allMaintenancesHandler(
			maintenancesPage,
			sortMaintenancesBy.column,
			sortMaintenancesBy.direction,
			search as string,
			limit
		);

	const { data: reportsData } = useQuery<AxiosResponse, Error>({
		queryKey: ["user_reports"],
		queryFn: handleUserReports,
	} as UseQueryOptions<AxiosResponse, Error>);

	const { data: tenantsData, isLoading: isTenantsLoading } = allTenantsHandler(
		undefined,
		tenantsPage,
		sortTenantsBy.column,
		sortTenantsBy.direction,
		search as string,
		limit
	);

	useLayoutEffect(() => {
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
				reports={reportsData?.data}
			/>
			<PaymentReport
				setPage={setTenantsPage}
				setSortBy={setTenantsSortBy}
				tenants={tenantsData?.data.tenants}
				isLoading={isTenantsLoading}
				page={tenantsPage}
				totalPage={tenantsData?.data.meta.total_page}
			/>
			<MaintenanceReport
				maintenances={maintenanceData?.data.maintenances}
				rowLoading={isMaintenancesLoading}
				totalPage={maintenanceData?.data.meta.total_page}
				page={maintenancesPage}
				setPage={setMaintenancesPage}
				setSortBy={setMaintenancesSortBy}
			/>
		</div>
	);
};

export default Report;

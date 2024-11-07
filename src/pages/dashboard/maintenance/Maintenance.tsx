import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../../../redux/slices/app";
import { Schedule, Metrics } from "../../../components/dashboard/maintenance";
import { RootState } from "../../../redux/store";
import { Stats } from "../../../types/user";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import useMaintenance from "../../../hooks/useMaintenance";
import { setMaintenance } from "../../../redux/slices/maintenance";

// const maintenances: MaintenanceType[] = [
// 	{
// 		_id: "1",
// 		name: "Completed",
// 		last_men_date: "October 12, 2024",
// 		upcoming_date: "December 15, 2024",
// 		assigned_techs: "Benjamin Spencer",
// 		status: "Completed" as "completed" | "schedule" | "overdue",
// 	},
// 	{
// 		_id: "2",
// 		name: "Elevator",
// 		last_men_date: "October 12, 2024",
// 		upcoming_date: "December 15, 2024",
// 		assigned_techs: "Benjamin Spencer",
// 		status: "Overdue" as "completed" | "schedule" | "overdue",
// 	},
// 	{
// 		_id: "3",
// 		name: "Air Condition",
// 		last_men_date: "June 15, 2024",
// 		upcoming_date: "December 15, 2024",
// 		assigned_techs: "Benjamin Spencer",
// 		status: "Scheduled" as "completed" | "schedule" | "overdue",
// 	},
// 	{
// 		_id: "4",
// 		name: "Elevator",
// 		last_men_date: "October 12, 2024",
// 		upcoming_date: "December 15, 2024",
// 		assigned_techs: "Benjamin Spencer",
// 		status: "Scheduled" as "completed" | "schedule" | "overdue",
// 	},
// 	{
// 		_id: "5",
// 		name: "Elevator",
// 		last_men_date: "October 12, 2024",
// 		upcoming_date: "December 15, 2024",
// 		assigned_techs: "Benjamin Spencer",
// 		status: "Completed" as "completed" | "schedule" | "overdue",
// 	},
// 	{
// 		_id: "6",
// 		name: "Elevator",
// 		last_men_date: "October 12, 2024",
// 		upcoming_date: "December 15, 2024",
// 		assigned_techs: "Benjamin Spencer",
// 		status: "Completed" as "completed" | "schedule" | "overdue",
// 	},
// 	{
// 		_id: "7",
// 		name: "Elevator",
// 		last_men_date: "October 12, 2024",
// 		upcoming_date: "December 15, 2024",
// 		assigned_techs: "Benjamin Spencer",
// 		status: "Scheduled" as "completed" | "schedule" | "overdue",
// 	},
// 	{
// 		_id: "8",
// 		name: "Elevator",
// 		last_men_date: "October 12, 2024",
// 		upcoming_date: "December 15, 2024",
// 		assigned_techs: "Benjamin Spencer",
// 		status: "Completed" as "completed" | "schedule" | "overdue",
// 	},
// ];

const Maintenance = () => {
	const dispatch = useDispatch();
	const { meta } = useSelector((state: RootState) => state.maintenance);
	const [page, setPage] = useState(1);
	const [sortBy, setSortBy] = useState({ column: "", direction: "descending" });
	const { stats } = useSelector((state: RootState) => state.user);
	const { allMaintenancesHandler } = useMaintenance();

	const queryClient = useQueryClient();

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ["maintenances", page, sortBy.column, sortBy.direction],
		queryFn: () =>
			allMaintenancesHandler(page, sortBy.column, sortBy.direction),
	});

	useEffect(() => {
		dispatch(setTitle({ title: "Maintenance", showIcon: false }));
		queryClient.invalidateQueries({ queryKey: ["authUser"] });
	}, []);

	useEffect(() => {
		if (isSuccess && data) {
			dispatch(
				setMaintenance({
					meta: data.data.meta,
					maintenances: data.data.maintenances,
				})
			);
		}
	}, [isSuccess, data]);

	return (
		<div>
			<Metrics stats={stats as Stats} />
			<Schedule
				page={page}
				setPage={setPage}
				setSortBy={setSortBy}
				maintenance={data?.data.maintenances || []}
				totalPage={meta.total_page}
				isLoading={isLoading}
			/>
		</div>
	);
};

export default Maintenance;

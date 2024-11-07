import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../../../redux/slices/app";
import { Schedule, Metrics } from "../../../components/dashboard/maintenance";
import { RootState } from "../../../redux/store";
import { MaintenanceType } from "../../../types/maintenance";
import { Stats } from "../../../types/user";
import { useQueryClient } from "@tanstack/react-query";

const maintenances: MaintenanceType[] = [
	{
		_id: "1",
		name: "Completed",
		last_men_date: "October 12, 2024",
		upcoming_date: "December 15, 2024",
		assigned_techs: "Benjamin Spencer",
		status: "Completed" as "completed" | "schedule" | "overdue",
	},
	{
		_id: "2",
		name: "Elevator",
		last_men_date: "October 12, 2024",
		upcoming_date: "December 15, 2024",
		assigned_techs: "Benjamin Spencer",
		status: "Overdue" as "completed" | "schedule" | "overdue",
	},
	{
		_id: "3",
		name: "Air Condition",
		last_men_date: "June 15, 2024",
		upcoming_date: "December 15, 2024",
		assigned_techs: "Benjamin Spencer",
		status: "Scheduled" as "completed" | "schedule" | "overdue",
	},
	{
		_id: "4",
		name: "Elevator",
		last_men_date: "October 12, 2024",
		upcoming_date: "December 15, 2024",
		assigned_techs: "Benjamin Spencer",
		status: "Scheduled" as "completed" | "schedule" | "overdue",
	},
	{
		_id: "5",
		name: "Elevator",
		last_men_date: "October 12, 2024",
		upcoming_date: "December 15, 2024",
		assigned_techs: "Benjamin Spencer",
		status: "Completed" as "completed" | "schedule" | "overdue",
	},
	{
		_id: "6",
		name: "Elevator",
		last_men_date: "October 12, 2024",
		upcoming_date: "December 15, 2024",
		assigned_techs: "Benjamin Spencer",
		status: "Completed" as "completed" | "schedule" | "overdue",
	},
	{
		_id: "7",
		name: "Elevator",
		last_men_date: "October 12, 2024",
		upcoming_date: "December 15, 2024",
		assigned_techs: "Benjamin Spencer",
		status: "Scheduled" as "completed" | "schedule" | "overdue",
	},
	{
		_id: "8",
		name: "Elevator",
		last_men_date: "October 12, 2024",
		upcoming_date: "December 15, 2024",
		assigned_techs: "Benjamin Spencer",
		status: "Completed" as "completed" | "schedule" | "overdue",
	},
];

const Maintenance = () => {
	const dispatch = useDispatch();
	const { meta } = useSelector((state: RootState) => state.tenant);
	const [page, setPage] = useState(1);
	const [sortBy, setSortBy] = useState({ column: "", direction: "descending" });
	const { stats } = useSelector((state: RootState) => state.user);

	const queryClient = useQueryClient();

	console.log(sortBy);

	useEffect(() => {
		dispatch(setTitle({ title: "Maintenance", showIcon: false }));
		queryClient.invalidateQueries({ queryKey: ["authUser"] });
	}, []);

	return (
		<div>
			<Metrics stats={stats as Stats} />
			<Schedule
				page={page}
				setPage={setPage}
				setSortBy={setSortBy}
				maintenance={maintenances}
				totalPage={meta.total_page}
			/>
		</div>
	);
};

export default Maintenance;

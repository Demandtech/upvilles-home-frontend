import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../../../redux/slices/app";
import { Schedule, Metrics } from "../../../components/dashboard/maintenance";
import { RootState } from "../../../redux/store";
import { Stats } from "../../../types/user";
import { useQueryClient } from "@tanstack/react-query";
import useMaintenance from "../../../hooks/useMaintenance";
import { setMaintenances } from "../../../redux/slices/maintenance";
import { useSearchParams } from "react-router-dom";

const Maintenance = () => {
	const dispatch = useDispatch();
	const { meta } = useSelector((state: RootState) => state.maintenance);
	const [page, setPage] = useState(1);
	const [sortBy, setSortBy] = useState({ column: "", direction: "descending" });
	const { stats } = useSelector((state: RootState) => state.user);
	const { allMaintenancesHandler } = useMaintenance();
	const [searchParams] = useSearchParams();

	const search = searchParams.get("q");
	const limit = 4;

	const queryClient = useQueryClient();

	const { data, isLoading, isSuccess } = allMaintenancesHandler(
		page,
		sortBy.column,
		sortBy.direction,
		search as string,
		limit
	);

	useEffect(() => {
		dispatch(setTitle({ title: "Maintenance", showIcon: false }));
		queryClient.invalidateQueries({ queryKey: ["authUser"] });
	}, []);

	useEffect(() => {
		if (isSuccess && data) {
			dispatch(
				setMaintenances({
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
				isCreateDisabled={false}
			/>
		</div>
	);
};

export default Maintenance;

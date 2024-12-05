import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { allMaintenances } from "../helper/apis/maintenanceApi";
import { AxiosResponse } from "axios";

export default function useMaintenance() {
	const allMaintenancesHandler = (
		page: number,
		sortBy: string,
		order: string,
		search: string,
		limit: number,
		options?: UseQueryOptions<AxiosResponse, Error>
	) => {
		return useQuery<AxiosResponse, Error>({
			queryKey: ["all-maintenances", page, sortBy, order, search, limit],
			queryFn: async () => allMaintenances(page, sortBy, order, search, limit),
			...options,
		});
	};

	return {
		allMaintenancesHandler,
	};
}

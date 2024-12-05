import { AxiosResponse } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import * as apis from "../helper/apis/tenantApi";

export default function useTenant() {
	const allTenantsHandler = (
		propertyId?: string,
		page?: number,
		sortBy?: string,
		order?: string,
		search?: string,
		limit?: number,
		options?: UseQueryOptions<AxiosResponse, Error>
	) => {
		return useQuery<AxiosResponse, Error>({
			queryKey: ["all-tenants", propertyId, sortBy, order, page, search, limit],
			queryFn: async () =>
				apis.allTenants(propertyId, page, sortBy, order, search, limit),
			...options,
		});
	};

	const singleTenantHandler = (
		tenantId: string,
		options?: UseQueryOptions<AxiosResponse, Error>
	) => {
		return useQuery<AxiosResponse, Error>({
			queryKey: ["tenant-details", tenantId],
			queryFn: async () => apis.singleTenant(tenantId),
			enabled: !!tenantId,
			...options,
		});
	};

	return {
		allTenantsHandler,
		singleTenantHandler,
	};
}

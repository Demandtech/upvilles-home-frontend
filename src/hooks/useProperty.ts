import { AxiosResponse } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import * as apis from "../helper/apis/propertyApi";

export default function useProperty() {
	const allProperties = (
		page?: number,
		search?: string,
		limit?: number,
		options?: UseQueryOptions<AxiosResponse, Error>
	) => {
		return useQuery<AxiosResponse, Error>({
			queryKey: ["all-properties", page, search, limit],
			queryFn: async () => apis.allProperties(page, search, limit),
			...options,
		});
	};

	const getSingleProperty = (
		productId: string,
		options?: UseQueryOptions<AxiosResponse, Error>
	) => {
		return useQuery<AxiosResponse, Error>({
			queryKey: ["property-details", productId],
			queryFn: async () => apis.getSingleProperty(productId),
			enabled: !!productId,
			...options,
		});
	};

	return {
		allProperties,
		getSingleProperty,
	};
}

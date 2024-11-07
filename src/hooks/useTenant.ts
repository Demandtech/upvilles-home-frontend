import { AxiosResponse } from "axios";
import customAxios from "../../configs/axios";
import { TenantFormState } from "../types/forms";

export default function useTenant() {
	const addTenantHandler = async (
		newTenantData: TenantFormState
	): Promise<AxiosResponse> => {
		const result = await customAxios(false).post("/tenants", newTenantData);

		return result;
	};

	const allTenantsHandler = async (
		propertyId: string,
		page: number,
		sortBy: string,
		order: string
	) => {
		const tenants = await customAxios(false).get(
			`/tenants?property_id=${propertyId}&page=${page}&sortBy=${sortBy}&order=${order}`
		);
		return tenants;
	};

	const singleTenantHandler = async (tenantId: string) => {
		if (!tenantId) return;

		const tenant = await customAxios(false).get(`/tenants/${tenantId}`);

		return tenant;
	};

	const updateTenantHandler = async (
		tenantId: string,
		updatedTenantData: TenantFormState
	) => {
		if (!tenantId || !updatedTenantData) return;

		const updatedTenant = await customAxios(false).put(
			`/tenants/${tenantId}`,
			updatedTenantData
		);

		return updatedTenant;
	};

	const deleteTenantHandler = async (tenantId: string) => {
		if (!tenantId) return;

		const deletedTenant = await customAxios(false).delete(
			`/tenants/${tenantId}`
		);

		return deletedTenant;
	};

	return {
		addTenantHandler,
		allTenantsHandler,
		singleTenantHandler,
		updateTenantHandler,
		deleteTenantHandler,
	};
}

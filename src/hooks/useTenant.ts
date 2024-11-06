import { AxiosResponse } from "axios";
import customAxios from "../../configs/axios";
import { TenantFormProps } from "../types/tenant";

export default function useTenant() {
	const addTenantHandler = async (
		newTenantData: TenantFormProps
	): Promise<AxiosResponse> => {
		console.log(newTenantData);
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

	const singleTenantHandler = async (tenant_id: string) => {
		if (!tenant_id) return;

		const tenant = await customAxios(false).get(`/tenants/${tenant_id}`);

		return tenant;
	};

	const updateTenantHandler = async (
		tenant_id: string,
		updatedTenantData: TenantFormProps
	) => {
		console.log(updatedTenantData);
		if (!tenant_id || !updatedTenantData) return;

		const updatedTenant = await customAxios(false).put(
			`/tenants/${tenant_id}`,
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

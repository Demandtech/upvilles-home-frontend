import { AxiosResponse } from "axios";
import customAxios from "../../configs/axios";
import { TenantFormState } from "../types/forms";

export default function useTenant() {
	const addTenantHandler = async (
		newTenantData: TenantFormState
	): Promise<AxiosResponse> => {
		try {
			const { balance, rent_paid } = newTenantData;

			const rentPaidNum = rent_paid.replace(/,/g, "");
			const balanceNum = balance.replace(/,/g, "");

			newTenantData.rent_paid = rentPaidNum;
			newTenantData.balance = balanceNum;

			const result = await customAxios(false).post("/tenants", newTenantData);

			return result;
		} catch (error: any) {
			throw new Error(error);
		}
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

		const { balance, rent_paid } = updatedTenantData;

		const rentPaidNum = rent_paid.replace(/,/g, "");
		const balanceNum = balance.replace(/,/g, "");

		updatedTenantData.rent_paid = rentPaidNum;
		updatedTenantData.balance = balanceNum;

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

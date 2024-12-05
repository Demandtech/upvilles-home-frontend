import { AxiosResponse } from "axios";
import customAxios from "../../../configs/axios";
import { TenantFormState } from "../../types/forms";

export const addTenant = async (
	newTenantData: TenantFormState
): Promise<AxiosResponse> => {
	try {
		const { balance, rent_paid } = newTenantData;

		const rentPaidNum = rent_paid.replace(/,/g, "");
		const balanceNum = balance?.replace(/,/g, "");

		newTenantData.rent_paid = rentPaidNum;
		newTenantData.balance = balanceNum;

		const result = await customAxios(false).post("/tenants", newTenantData);

		return result;
	} catch (error: any) {
		console.log(error);
		throw new Error(error);
	}
};

export const allTenants = async (
	propertyId?: string,
	page: number = 1,
	sortBy?: string,
	order?: string,
	search?: string,
	limit: number = 5
) => {
	const params = new URLSearchParams();

	if (propertyId) params.append("property_id", propertyId);
	if (page !== undefined) params.append("page", page.toString());
	if (sortBy) params.append("sortBy", sortBy);
	if (search) params.append("search", search);
	if (order) params.append("order", order);
	if (limit) params.append("limit", limit.toString());

	const tenants = await customAxios(false).get(`/tenants?${params.toString()}`);

	return tenants;
};

export const singleTenant = async (tenantId: string) => {
	return await customAxios(false).get(`/tenants/${tenantId}`);
};

export const updateTenant = async (
	tenantId: string,
	updatedTenantData: TenantFormState
) => {
	if (!tenantId || !updatedTenantData) return;

	const { balance, rent_paid } = updatedTenantData;

	const rentPaidNum = rent_paid.replace(/,/g, "");
	const balanceNum = balance?.replace(/,/g, "");

	updatedTenantData.rent_paid = rentPaidNum;
	updatedTenantData.balance = balanceNum;

	const updatedTenant = await customAxios(false).put(
		`/tenants/${tenantId}`,
		updatedTenantData
	);

	return updatedTenant;
};

export const deleteTenant = async (tenantId: string) => {
	if (!tenantId) return;

	const deletedTenant = await customAxios(false).delete(`/tenants/${tenantId}`);

	return deletedTenant;
};

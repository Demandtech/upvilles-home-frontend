import { AxiosResponse } from "axios";
import customAxios from "../../../configs/axios";

export const addProperty = async (
	newProperty: FormData
): Promise<AxiosResponse> => {
	const result = await customAxios(false).post("/properties", newProperty);

	return result;
};

export const allProperties = async (
	page?: number,
	search?: string,
	limit?: number
): Promise<AxiosResponse> => {
	const params = new URLSearchParams();

	if (search) params.append("search", search);
	if (page !== undefined) params.append("page", page.toString());
	if (limit) params.append("limit", limit.toString());

	return await customAxios(false).get(`/properties?${params.toString()}`);
};

export const getSingleProperty = async (productId: string) => {
	return await customAxios(false).get(`/properties/${productId}`);
};

export const editProperty = async (
	propertyId: string,
	updateProperty: FormData
) => {
	const result = await customAxios(false).put(
		`/properties/${propertyId}`,
		updateProperty
	);

	return result;
};

export const deleteProperty = async (propertyId: string) => {
	const result = await customAxios(true).delete(`/properties/${propertyId}`);

	return result;
};
export const deletePropertyImage = async (
	public_id: string,
	property_id?: string
) => {
	const params = new URLSearchParams();

	if (property_id) {
		params.append("property_id", property_id);
	}

	const res = await customAxios(false).delete(
		`properties/images/${public_id}?${params.toString()}`
	);

	return res;
};

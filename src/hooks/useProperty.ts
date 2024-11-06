import { AxiosResponse } from "axios";
import customAxios from "../../configs/axios";

export default function useProperty(): {
	allProperties: () => Promise<AxiosResponse>;
	getSingleProperty: (params: string) => Promise<AxiosResponse>;
	addProperty: (params: FormData) => Promise<AxiosResponse>;
	editProperty: (
		propertyId: string,
		updatedProperty: FormData
	) => Promise<AxiosResponse>;
	deleteProperty: (params: string) => Promise<AxiosResponse>;
} {
	const addProperty = async (newProperty: FormData): Promise<AxiosResponse> => {
		const result = await customAxios(true).post("/properties", newProperty);

		return result;
	};

	const allProperties = async () => {
		const properties = await customAxios(false).get("/properties");
		return properties;
	};

	const getSingleProperty = async (productId: string) => {
		const property = await customAxios(false).get(`/properties/${productId}`);
		return property;
	};

	const editProperty = async (
		propertyId: string,
		updateProperty: FormData
	): Promise<AxiosResponse> => {
		const result = await customAxios(true).put(
			`/properties/${propertyId}`,
			updateProperty
		);

		return result;
	};

	const deleteProperty = async (propertyId: string) => {
		try {
			const result = await customAxios(true).delete(
				`/properties/${propertyId}`
			);

			return result;
		} catch (error) {
			console.log(error);
			throw new Error();
		}
	};
	return {
		addProperty,
		editProperty,
		allProperties,
		getSingleProperty,
		deleteProperty,
	};
}

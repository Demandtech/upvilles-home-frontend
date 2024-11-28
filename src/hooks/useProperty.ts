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
	deletePropertyImage: (
		param1: string,
		param2: string
	) => Promise<AxiosResponse>;
} {
	const addProperty = async (newProperty: FormData): Promise<AxiosResponse> => {
		const result = await customAxios(false).post("/properties", newProperty);

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
		const result = await customAxios(false).put(
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
	const deletePropertyImage = async (
		public_id: string,
		property_id: string
	) => {
		const res = await customAxios(false).delete(
			`/properties/images/${public_id}/${property_id}`
		);

		console.log(res);
		return res;
	};
	return {
		addProperty,
		editProperty,
		allProperties,
		getSingleProperty,
		deleteProperty,
		deletePropertyImage,
	};
}

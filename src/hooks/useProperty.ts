import { AxiosResponse } from "axios";
import customAxios from "../../configs/axios";
import Cookies from "js-cookie";

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
  const tokenStr: string | undefined = Cookies.get("auth_token");

  const token: { access_token: string; refresh_token: string } | undefined =
    tokenStr ? JSON.parse(tokenStr) : undefined;

  const addProperty = async (newProperty: FormData): Promise<AxiosResponse> => {
    const result = await customAxios(true, token?.access_token).post(
      "/properties",
      newProperty
    );

    return result;
  };

  const allProperties = async () => {
    const properties = await customAxios(false, token?.access_token).get(
      "/properties"
    );
    return properties;
  };

  const getSingleProperty = async (productId: string) => {
    const property = await customAxios(false, token?.access_token).get(
      `/properties/${productId}`
    );
    return property;
  };

  const editProperty = async (
    propertyId: string,
    updateProperty: FormData
  ): Promise<AxiosResponse> => {
    const result = await customAxios(true, token?.access_token).put(
      `/properties/${propertyId}`,
      updateProperty
    );

    return result;
  };

  const deleteProperty = async (propertyId: string) => {
    try {
      const result = await customAxios(true, token?.access_token).delete(
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

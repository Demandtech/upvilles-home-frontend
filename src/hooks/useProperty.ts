import { AxiosResponse } from "axios";
import customAxios from "../../configs/axios";
import Cookies from "js-cookie";

export default function useProperty(): {
  allProperties: () => Promise<AxiosResponse>;
  addProperty: (newProperty: FormData) => Promise<AxiosResponse>;
  editProperty: (
    propertyId: string,
    updatedProperty: FormData
  ) => Promise<AxiosResponse>;
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
    const authUser = await customAxios(false, token?.access_token).get(
      "properties"
    );
    return authUser;
  };

  const editProperty = async (
    propertyId: string,
    updateProperty: FormData
  ): Promise<AxiosResponse> => {
    const result = await customAxios(true, token?.access_token).put(
      `/properties/:${propertyId}`,
      updateProperty
    );

    return result;
  };
  return { addProperty, editProperty, allProperties };
}

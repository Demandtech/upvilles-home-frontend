import { AxiosResponse } from "axios";
import customAxios from "../../configs/axios";
import { SignupFormState } from "../types/forms";

export default function useAuth() {
  
  const signup = async (
    userData: Partial<SignupFormState>
  ): Promise<AxiosResponse> => {
    delete userData.confirmPassword;
    delete userData.termCondition;
    const newUser = await customAxios().post("user/create", userData);
    return newUser;
  };

  const getAuthUser = async (access_token: string) => {
    const authUser = await customAxios(false, access_token).get("user");
    return authUser;
  };

  const handleRefreshToken = async (refresh_token: string) => {
    const newTokens = await customAxios().post("user/refresh_token", {
      refresh_token,
    });
    return newTokens;
  };

  return { signup, getAuthUser, handleRefreshToken };
}

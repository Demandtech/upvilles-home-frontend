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

  return { signup };
}

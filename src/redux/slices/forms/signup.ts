import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignupFormState } from "../../../types/forms";

const initialState: SignupFormState = {
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
  company: "",
  phone: "",
  termCondition: false,
};

const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    updateForm: (
      state,
      {
        payload,
      }: PayloadAction<{
        field: keyof SignupFormState;
        value: string | boolean;
      }>
    ) => {
      const { field, value } = payload;
      if (typeof value === "boolean" && field === "termCondition") {
        state[field] = value;
      } else if (typeof value === "string" && field !== "termCondition") {
        state[field] = value;
      }
    },
    resetForm: () => {
      return initialState;
    },
  },
});

export const { updateForm, resetForm } = formSlice.actions;
export default formSlice.reducer;

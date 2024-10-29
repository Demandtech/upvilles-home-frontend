import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginFormState } from "../../../types/forms";
const initialState: LoginFormState = {
  email: "",
  password: "",
};

const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    updateForm: (
      state,
      { payload }: PayloadAction<{ field: keyof LoginFormState; value: string }>
    ) => {
      const { field, value } = payload;
      state[field] = value;
    },
    resetForm: () => {
      return initialState;
    },
  },
});

export const { updateForm, resetForm } = formSlice.actions;
export default formSlice.reducer;

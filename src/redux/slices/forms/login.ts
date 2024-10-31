import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginFormState } from "../../../types/forms";

const initialState: LoginFormState = {
  email: "",
  password: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateLoginForm: (
      state,
      { payload }: PayloadAction<{ field: keyof LoginFormState; value: string }>
    ) => {
      const { field, value } = payload;
      state[field] = value;
    },
    resetLoginForm: () => {
      return initialState;
    },
  },
});

export const { updateLoginForm, resetLoginForm } = loginSlice.actions;
export default loginSlice.reducer;

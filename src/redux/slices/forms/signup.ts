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

const loadFormState = (): SignupFormState => {
	const state = localStorage.getItem("signupFormState");
	if (!state) {
		return initialState;
	}
	return JSON.parse(state);
};

const signupSlice = createSlice({
	name: "signup",
	initialState: loadFormState(),
	reducers: {
		updateForm: <K extends keyof SignupFormState>(
			state: SignupFormState,
			{
				payload,
			}: PayloadAction<{
				field: K;
				value: SignupFormState[K];
			}>
		) => {
			const { field, value } = payload;
			state[field] = value;
			localStorage.setItem("signupFormState", JSON.stringify(state));
		},
		resetForm: () => {
			localStorage.removeItem("signupFormState");
			return initialState;
		},
	},
});

export const { updateForm, resetForm } = signupSlice.actions;
export default signupSlice.reducer;

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

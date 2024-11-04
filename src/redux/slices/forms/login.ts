import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginFormState } from "../../../types/forms";

const initialState: LoginFormState = {
	email: "",
	password: "",
};

const loadFormState = (): LoginFormState => {
	const state = localStorage.getItem("loginFormState");
	if (!state) {
		return initialState;
	}
	return JSON.parse(state);
};

const loginSlice = createSlice({
	name: "login",
	initialState: loadFormState(),
	reducers: {
		updateLoginForm: (
			state,
			{ payload }: PayloadAction<{ field: keyof LoginFormState; value: string }>
		) => {
			const { field, value } = payload;
			state[field] = value;
			localStorage.setItem("loginFormState", JSON.stringify(state));
		},
		resetLoginForm: () => {
			localStorage.removeItem("loginFormState");
			return initialState;
		},
	},
});

export const { updateLoginForm, resetLoginForm } = loginSlice.actions;
export default loginSlice.reducer;

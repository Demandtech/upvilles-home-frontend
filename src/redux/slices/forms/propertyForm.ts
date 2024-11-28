import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PropertyFormState } from "../../../types/forms";

const initialState: PropertyFormState = {
	street: "",
	description: "",
	images: [],
	title: "",
	location: "",
	unit_number: "",
	attraction: "",
	property_type: "",
};

const loadFormState = (): PropertyFormState => {
	const state = localStorage.getItem("propertyFormState");
	if (!state) {
		return initialState;
	}
	return JSON.parse(state);
};

const propertyFormSlice = createSlice({
	name: "propertyForm",
	initialState: loadFormState(),
	reducers: {
		updatePropertyForm: <K extends keyof PropertyFormState>(
			state: PropertyFormState,
			{
				payload,
			}: PayloadAction<{
				field: K;
				value: PropertyFormState[K];
			}>
		) => {
			const { field, value } = payload;
			state[field] = value;
			localStorage.setItem("propertyFormState", JSON.stringify(state));
		},
		resetPropertyForm: () => {
			localStorage.removeItem("propertyFormState");
			return initialState;
		},
	},
});

export const { updatePropertyForm, resetPropertyForm } =
	propertyFormSlice.actions;

export default propertyFormSlice.reducer;

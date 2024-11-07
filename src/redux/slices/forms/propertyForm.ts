import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddPropertyFormState } from "../../../types/forms";

const initialState: AddPropertyFormState = {
	street: "",
	description: "",
	images: undefined,
	title: "",
	location: "",
	unit_number: 0,
	attraction: "",
	property_type: "",
};

const loadFormState = (): AddPropertyFormState => {
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
		updatePropertyForm: <K extends keyof AddPropertyFormState>(
			state: AddPropertyFormState,
			{
				payload,
			}: PayloadAction<{
				field: K;
				value: AddPropertyFormState[K];
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

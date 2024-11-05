import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ManagePropertyFormState } from "../../../types/forms";

const initialState: ManagePropertyFormState = {
	street: "",
	description: "",
	images: undefined,
	title: "",
	location: "",
	unit_number: 0,
	attraction: "",
	property_type: "",
};

const loadFormState = (): ManagePropertyFormState => {
	const state = localStorage.getItem("propertyFormState");
	if (!state) {
		return initialState;
	}
	return JSON.parse(state);
};

const propertyFormSlice = createSlice({
	name: "property",
	initialState: loadFormState(),
	reducers: {
		updatePropertyForm: <K extends keyof ManagePropertyFormState>(
			state: ManagePropertyFormState,
			{
				payload,
			}: PayloadAction<{
				field: K;
				value: ManagePropertyFormState[K];
			}>
		) => {
			const { field, value } = payload;
			state[field] = value;
			localStorage.setItem("propertyFormState", JSON.stringify(state));
		},
		resetPropertyForm: () => {
			localStorage.removeItem("propertyFormState");
			console.log(initialState);
			return initialState;
		},
	},
});

export const { updatePropertyForm, resetPropertyForm } =
	propertyFormSlice.actions;

export default propertyFormSlice.reducer;

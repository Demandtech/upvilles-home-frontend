import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PropertyType, PropertyListType } from "../../types/property";

const initialState: {
	properties: PropertyListType;
	propertyDetails: PropertyType | null;
} = {
	properties: [],
	propertyDetails: null,
};

const dashboardSlice = createSlice({
	name: "property",
	initialState,
	reducers: {
		setPropertyDetails: (state, { payload }: PayloadAction<PropertyType>) => {
			state.propertyDetails = payload;
		},
		setProperties: (state, { payload }: PayloadAction<PropertyListType>) => {
			state.properties = payload;
		},
	},
});

export const { setProperties, setPropertyDetails } = dashboardSlice.actions;
export default dashboardSlice.reducer;

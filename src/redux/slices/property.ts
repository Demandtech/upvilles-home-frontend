import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PropertyType, PropertyListType } from "../../types/property";

const initialState: {
	properties: PropertyListType;
	propertyDetails: PropertyType | null;
	meta: {
		hasMore: boolean;
		page: number;
		total_page: number;
	};
} = {
	properties: [],
	propertyDetails: null,
	meta: {
		hasMore: false,
		page: 1,
		total_page: 0,
	},
};

const dashboardSlice = createSlice({
	name: "property",
	initialState,
	reducers: {
		setPropertyDetails: (state, { payload }: PayloadAction<PropertyType>) => {
			state.propertyDetails = payload;
		},
		setProperties: (
			state,
			{ payload }: PayloadAction<{ properties: PropertyListType; meta: any }>
		) => {
			state.properties = payload.properties;
			state.meta = payload.meta;
		},
	},
});

export const { setProperties, setPropertyDetails } = dashboardSlice.actions;
export default dashboardSlice.reducer;

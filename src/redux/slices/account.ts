import { createSlice } from "@reduxjs/toolkit";
import { propertyData } from "../../utils/dummy-data";
import {
	AccountSliceProps,
	PropertyType,
	UserType,
	PropertyListType,
} from "../../types/account";

const initialState: AccountSliceProps = {
	user: null,
	properties: propertyData,
	propertyDetails: null,
};

const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		setUser: (state, { payload }: { payload: UserType }) => {
			state.user = payload;
		},
		setPropertyDetails: (state, { payload }: { payload: PropertyType }) => {
			state.propertyDetails = payload;
		},
		setProperties: (state, { payload }: { payload: PropertyListType }) => {
			state.properties = payload;
		},
	},
});

export const { setUser } = accountSlice.actions;
export default accountSlice.reducer;

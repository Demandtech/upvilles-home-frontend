import { createSlice } from "@reduxjs/toolkit";
import {
	AccountSliceProps,
	PropertyType,
	UserType,
	PropertyListType,
} from "../../types";

const initialState: AccountSliceProps = {
	user: null,
	properties: [],
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

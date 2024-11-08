import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Tenant } from "../../types/tenant";

const initialState: {
	tenants: Tenant[];
	meta: { total_page: number; current_page: number };
	tenantDetails: Tenant | null;
} = {
	tenants: [],
	tenantDetails: null,
	meta: {
		total_page: 0,
		current_page: 1,
	},
};

const tenantSlice = createSlice({
	name: "tenant",
	initialState,
	reducers: {
		setTenants: (
			state,
			{
				payload,
			}: PayloadAction<{
				tenants: Tenant[];
				meta: { total_page: number; current_page: number };
			}>
		) => {
			state.tenants = payload.tenants;
			state.meta = payload.meta;
		},
		setTenantDetails: (state, { payload }) => {
			state.tenantDetails = payload;
		},
	},
});

export const { setTenants, setTenantDetails } = tenantSlice.actions;

export default tenantSlice.reducer;

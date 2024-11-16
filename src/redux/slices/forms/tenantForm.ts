import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TenantFormState } from "../../../types/forms";

const initialState: TenantFormState = {
	name: "",
	start_date: undefined,
	end_date: undefined,
	assigned_unit: "",
	assigned_property: "",
	phone: "",
	rent_paid: "",
	balance: "",
};

function loadState(): TenantFormState {
	const state = localStorage.getItem("tenantForm");
	if (state) {
		return JSON.parse(state);
	}
	return initialState;
}
const tenantFormSlice = createSlice({
	name: "tenantForm",
	initialState: loadState(),
	reducers: {
		updateTenantForm: <K extends keyof TenantFormState>(
			state: TenantFormState,
			{ payload }: PayloadAction<{ field: K; value: TenantFormState[K] }>
		) => {
			const { field, value } = payload;
			state[field] = value;
			localStorage.setItem("tenantForm", JSON.stringify(state));
		},
		resetTenantForm: () => {
			localStorage.removeItem("tenanForm");
			return initialState;
		},
	},
});

export const { updateTenantForm, resetTenantForm } = tenantFormSlice.actions;
export default tenantFormSlice.reducer;

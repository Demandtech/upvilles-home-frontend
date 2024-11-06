import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TenantFormProps } from "../../../types/tenant";

const initialState: TenantFormProps = {
	name: "",
	start_date: "",
	end_date: "",
	assigned_unit: "",
	assigned_property: "",
	phone: "",
};

function loadState(): TenantFormProps {
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
		updateTenantForm: <K extends keyof TenantFormProps>(
			state: TenantFormProps,
			{ payload }: PayloadAction<{ field: K; value: TenantFormProps[K] }>
		) => {
			const { field, value } = payload;
			state[field] = value;
			localStorage.setItem("tenantForm", JSON.stringify(state));
		},
		resetTenantForm: () => {
			// console.log("HERE");
			localStorage.removeItem("tenanForm");
			return initialState;
		},
	},
});

export const { updateTenantForm, resetTenantForm } = tenantFormSlice.actions;
export default tenantFormSlice.reducer;

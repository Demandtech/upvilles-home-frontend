import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MaintenanceFormState } from "../../../types/forms";

const initialState: MaintenanceFormState = {
	facility: "",
	schedule_date: new Date(),
	technician: "",
	status: "schedule",
	maintenance_fee: "",
	unit: "",
	property: "",
};

function loadState(): MaintenanceFormState {
	const state = localStorage.getItem("maintenanceForm");
	if (state) {
		return JSON.parse(state);
	}
	return initialState;
}
const maintenanceFormSlice = createSlice({
	name: "tenantForm",
	initialState: loadState(),
	reducers: {
		updateMaintenanceForm: <K extends keyof MaintenanceFormState>(
			state: MaintenanceFormState,
			{ payload }: PayloadAction<{ field: K; value: MaintenanceFormState[K] }>
		) => {
			const { field, value } = payload;
			state[field] = value;
			localStorage.setItem("maintenanceForm", JSON.stringify(state));
		},
		resetMaintenanceForm: () => {
			localStorage.removeItem("maintenanceForm");
			return initialState;
		},
	},
});

export const { updateMaintenanceForm, resetMaintenanceForm } =
	maintenanceFormSlice.actions;
export default maintenanceFormSlice.reducer;

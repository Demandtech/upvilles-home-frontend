import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MaintenanceType } from "../../types/maintenance";

const initialState: {
	maintenances: MaintenanceType[];
	meta: { total_page: number; current_page: number };
} = {
	maintenances: [],
	meta: {
		total_page: 0,
		current_page: 1,
	},
};

const maintenanceSlice = createSlice({
	name: "maintenance",
	initialState,
	reducers: {
		setMaintenance: (
			state,
			{
				payload,
			}: PayloadAction<{
				maintenances: MaintenanceType[];
				meta: { total_page: number; current_page: number };
			}>
		) => {
			state.maintenances = payload.maintenances;
			state.meta = payload.meta;
		},
	},
});

export const { setMaintenance } = maintenanceSlice.actions;

export default maintenanceSlice.reducer;

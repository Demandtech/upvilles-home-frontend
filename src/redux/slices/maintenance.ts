import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MaintenanceType } from "../../types/maintenance";

const initialState: {
	maintenances: MaintenanceType[];
	maintenanceDetails: MaintenanceType | null;
	meta: { total_page: number; current_page: number };
} = {
	maintenances: [],
	maintenanceDetails: null,
	meta: {
		total_page: 0,
		current_page: 1,
	},
};

const maintenanceSlice = createSlice({
	name: "maintenance",
	initialState,
	reducers: {
		setMaintenances: (
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

		setMaintenanceDetails: (
			state,
			{ payload }: PayloadAction<MaintenanceType>
		) => {
			state.maintenanceDetails = payload;
		},
	},
});

export const { setMaintenances, setMaintenanceDetails } =
	maintenanceSlice.actions;

export default maintenanceSlice.reducer;

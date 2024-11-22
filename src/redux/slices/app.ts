import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

const initialState: {
	dashboardPageTitle: { title: string | ReactNode; showIcon: boolean };
	toast: { message: string };
} = {
	dashboardPageTitle: { title: "", showIcon: false },
	toast: { message: "" },
};

const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		setTitle: (
			state,
			{
				payload,
			}: PayloadAction<{ title: string | ReactNode; showIcon: boolean }>
		) => {
			state.dashboardPageTitle = payload;
		},

		closeToast: (state) => {
			state.toast = { message: "" };
		},
		openToast: (state, { payload }: PayloadAction<{ message: string }>) => {
			state.toast = { message: payload.message };
		},
	},
});

export const { setTitle } = accountSlice.actions;
export default accountSlice.reducer;

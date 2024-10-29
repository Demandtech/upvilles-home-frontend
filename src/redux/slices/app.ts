import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
	dashboardPageTitle: { title: string; showIcon: boolean };
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
			{ payload }: PayloadAction<{ title: string; showIcon: boolean }>
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

export const { setTitle, closeToast, openToast } = accountSlice.actions;
export default accountSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState: { dashboardPageTitle: string } = {
	dashboardPageTitle: "",
};

const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		setTitle: (state, { payload }) => {
			state.dashboardPageTitle = payload;
		},
	},
});

export const { setTitle } = accountSlice.actions;
export default accountSlice.reducer;

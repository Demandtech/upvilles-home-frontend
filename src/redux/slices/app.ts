import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
	dashboardPageTitle: { title: string; showIcon: boolean };
} = {
	dashboardPageTitle: { title: "", showIcon: false },
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
	},
});

export const { setTitle } = accountSlice.actions;
export default accountSlice.reducer;

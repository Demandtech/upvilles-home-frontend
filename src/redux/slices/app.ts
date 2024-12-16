import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

const initialState: {
	dashboardPageTitle: { title: string | ReactNode; showIcon: boolean };
	imagePreview: {
		showPreview: boolean;
		imageUrl: string[];
		currentItemIndex: number;
	};
} = {
	dashboardPageTitle: { title: "", showIcon: false },
	imagePreview: { showPreview: false, imageUrl: [], currentItemIndex: 0 },
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

		setImagePreview: (
			state,
			{
				payload,
			}: PayloadAction<{
				showPreview: boolean;
				imageUrl: string[];
				currentItemIndex: number;
			}>
		) => {
			state.imagePreview = payload;
		},
	},
});

export const { setTitle, setImagePreview } = accountSlice.actions;
export default accountSlice.reducer;

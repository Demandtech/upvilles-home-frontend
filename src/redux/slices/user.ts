import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, Stats } from "../../types/user";
import Cookies from "js-cookie";

const initialState: {
	user: User | null;
	stats: Stats | null;
} = {
	user: null,
	stats: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (
			state,
			{ payload }: PayloadAction<{ user: User | null; stats: Stats | null }>
		) => {
			state.user = payload?.user;
			state.stats = payload?.stats;
		},
		setLogout: () => {
			Cookies.remove("auth_token");
			return initialState;
		},
	},
});

export const { setUser, setLogout } = userSlice.actions;
export default userSlice.reducer;

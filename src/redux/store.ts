import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/account";
import stateReducer from "./slices/state";

const store = configureStore({
	reducer: {
		account: accountReducer,
		state: stateReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

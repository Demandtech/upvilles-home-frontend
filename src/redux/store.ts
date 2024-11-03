import { configureStore } from "@reduxjs/toolkit";

import dashboardReducer from "./slices/dashboard";
import stateReducer from "./slices/app";
import loginReducer from "./slices/forms/login";
import signupReducer from "./slices/forms/signup";


const store = configureStore({
	reducer: {
		app: stateReducer,
		dashboard: dashboardReducer,
		login: loginReducer,
		signup: signupReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { configureStore } from "@reduxjs/toolkit";

import dashboardReducer from "./slices/dashboard";
import stateReducer from "./slices/app";
import loginReducer from "./slices/forms/login";
import signupReducer from "./slices/forms/signup";
import propertyReducer from "./slices/forms/property";

const store = configureStore({
	reducer: {
		app: stateReducer,
		dashboard: dashboardReducer,
		login: loginReducer,
		signup: signupReducer,
		property: propertyReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

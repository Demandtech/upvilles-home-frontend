import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/user";
import propertyReducer from "./slices/property";
import stateReducer from "./slices/app";
import tenantReducer from "./slices/tenant";
import maintenanceReducer from "./slices/maintenance";

//Form
import loginReducer from "./slices/forms/login";
import signupReducer from "./slices/forms/signup";
import propertyFormReducer from "./slices/forms/propertyForm";
import tenantFormReducer from "./slices/forms/tenantForm";
import maintenanceFormReducer from "./slices/forms/maintenanceForm";

const store = configureStore({
	reducer: {
		app: stateReducer,
		user: userReducer,
		property: propertyReducer,
		maintenance: maintenanceReducer,
		tenant: tenantReducer,
		login: loginReducer,
		signup: signupReducer,
		propertyForm: propertyFormReducer,
		tenantForm: tenantFormReducer,
		maintenanceForm: maintenanceFormReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

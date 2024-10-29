import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import dashboardReducer from "./slices/dashboard";
import stateReducer from "./slices/app";
import loginReducer from "./slices/forms/login";
import signupReducer from "./slices/forms/signup";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["login", "signup"],
};

const rootReducer = combineReducers({
	app: stateReducer,
	dashboard: dashboardReducer,
	login: loginReducer,
	signup: signupReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;

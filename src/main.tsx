// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/system";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import routes from "./routes";
import store, { persistor } from "./redux/store";
import "./index.css";
import SnackbarContainer from "./components/common/snack/SnackbarContainer";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={client}>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<NextUIProvider>
					<RouterProvider router={routes} />
					<SnackbarContainer />
				</NextUIProvider>
			</PersistGate>
		</Provider>
	</QueryClientProvider>
);

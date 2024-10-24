import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/system";

import router from "./router";
import store from "./redux/store";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<NextUIProvider>
				<RouterProvider router={router} />
			</NextUIProvider>
		</Provider>
	</StrictMode>
);

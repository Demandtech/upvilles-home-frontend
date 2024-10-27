import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/system";

import routes from "./routes";
import store from "./redux/store";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<NextUIProvider>
				<RouterProvider router={routes} />
			</NextUIProvider>
		</Provider>
	</StrictMode>
);

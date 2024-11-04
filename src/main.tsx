import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import routes from "./routes";
import store from "./redux/store";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<HelmetProvider>
		<NextUIProvider>
			<QueryClientProvider client={client}>
				<Provider store={store}>
					<RouterProvider router={routes} />
				</Provider>
			</QueryClientProvider>
		</NextUIProvider>
	</HelmetProvider>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App";
import "./index.css";
import store from "./redux/store";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<HelmetProvider>
			<QueryClientProvider client={client}>
				<Provider store={store}>
					<App />
				</Provider>
				{/* <ReactQueryDevtools initialIsOpen={false}/> */}
			</QueryClientProvider>
		</HelmetProvider>
	</StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/system";
import { PersistGate } from "redux-persist/integration/react";

import routes from "./routes";
import store, { persistor } from "./redux/store";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextUIProvider>
          <RouterProvider router={routes} />
        </NextUIProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);

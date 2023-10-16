import React from "react";
import ReactDOM from "react-dom/client";
import Routers from "./routes/index.tsx";
import { CssBaseline } from "@mui/material";
import MuiTheme from "./themes/MuiTheme.tsx";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MuiTheme>
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
          <Routers />
        </CookiesProvider>
        <CssBaseline />
      </MuiTheme>
    </Provider>
  </React.StrictMode>
);

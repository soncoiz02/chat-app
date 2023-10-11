import React from "react";
import ReactDOM from "react-dom/client";
import Routers from "./routes/index.tsx";
import { CssBaseline } from "@mui/material";
import MuiTheme from "./themes/MuiTheme.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MuiTheme>
      <Routers />
      <CssBaseline />
    </MuiTheme>
  </React.StrictMode>
);

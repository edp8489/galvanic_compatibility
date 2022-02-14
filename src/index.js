import { StrictMode } from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <CssBaseline><App /></CssBaseline>
    
  </StrictMode>,
  rootElement
);

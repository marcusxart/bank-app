import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { configure } from "axios-hooks";
import axios from "./configs/axios.config.js";

window.React = React;
configure({ axios });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

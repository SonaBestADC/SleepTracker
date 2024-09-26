import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SleepItemContextProvider } from "./context/SleepItemContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SleepItemContextProvider>
      <App />
    </SleepItemContextProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SleepItemContextProvider } from "./context/SleepItemContext";
import { AuthContextProvider } from "./context/AuthContext";
import { FriendsContextProvider } from "./context/FriendsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <FriendsContextProvider>
        <SleepItemContextProvider>
          <App />
        </SleepItemContextProvider>
      </FriendsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/home/home";
import Navmenu from "./components/navmenu/navmenu";
import AuthPrompt from "./components/authPrompt/authPrompt";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { user } = useAuthContext();
  return (
    <div>
      <Navmenu />
      {!user && <AuthPrompt/>}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user && <Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

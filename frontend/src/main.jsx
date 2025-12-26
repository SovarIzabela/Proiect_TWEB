import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "./styles/variables.css";
import "./styles/base.css";
import "./styles/ui.css";
import "./styles/forms.css";
import "./styles/buttons.css";
import "./styles/navbar.css";
import { AuthProvider } from "./context/AuthContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

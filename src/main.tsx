import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import i18n from "./locales/i18n.ts";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./services/AuthContext";
import { I18nextProvider } from "react-i18next";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

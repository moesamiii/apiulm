import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./routes/AppRouter";
import "./i18n";

// Add this import 👇
import { AuthProvider } from "./features/auth";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider config={{ apiUrl: "https://test.newulmmed.com/api" }}>
      <AppRouter />
    </AuthProvider>
  </StrictMode>
);

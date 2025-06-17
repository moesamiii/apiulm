import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import MedicalTestsPage from "./pages/MedicalTestsPage";
import { useAuth } from "./features/auth/hooks/useAuth"; // ADD THIS
import "./App.css";

function App() {
  const { i18n } = useTranslation();
  const { globalError, setGlobalError } = useAuth(); // ADD THIS

  // Set HTML direction attribute based on current language globally
  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <div className="app-container">
      {/* Global Error Banner */}
      {globalError && (
        <div
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "1rem",
            textAlign: "center",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        >
          {globalError}
          <button
            style={{
              marginLeft: "1rem",
              background: "white",
              color: "red",
              border: "none",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              borderRadius: "5px",
            }}
            onClick={() => setGlobalError(null)}
          >
            X
          </button>
        </div>
      )}

      {/* Main page */}
      <MedicalTestsPage />
    </div>
  );
}

export default App;

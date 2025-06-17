import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        margin: 0,
        padding: "2rem",
        direction: "rtl",
        textAlign: "right",
        backgroundColor: "#87ceeb", // rich sky blue
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        zIndex: 9999,
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        الصفحة غير موجودة
      </h1>
      <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
        عذراً، الصفحة التي تبحث عنها غير موجودة.
      </p>
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          fontWeight: "600",
          color: "#87ceeb",
          backgroundColor: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#e0f0ff")
        }
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
      >
        العودة للخلف
      </button>
    </div>
  );
};

export default NotFoundPage;

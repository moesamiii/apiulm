import { useAuth } from "../features/auth/hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return (
      <p
        style={{
          padding: "2rem",
          color: "red",
          textAlign: "center",
          fontSize: "18px",
        }}
      >
        ❌ غير مصرح لك. الرجاء تسجيل الدخول.
      </p>
    );
  }

  return children;
};

export default PrivateRoute;

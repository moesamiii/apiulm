import { createContext, useContext, useState, useEffect, useRef } from "react";
import {
  saveToken,
  getToken,
  clearToken,
  saveRefreshToken,
  getRefreshToken,
  clearRefreshToken,
} from "../utils/tokenUtils";
import { loginApi, refreshTokenApi } from "../services/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children, config }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getToken());
  const [refreshToken, setRefreshTokenState] = useState(getRefreshToken());
  const [tokenReady, setTokenReady] = useState(!!getToken()); // ✅ true if token exists
  const [globalError, setGlobalError] = useState(null);

  const lastTokenRef = useRef(token);
  const lastRefreshTokenRef = useRef(refreshToken);

  const isInitialRefreshDoneRef = useRef(false);
  const isRefreshingRef = useRef(false);

  const login = async (credentials) => {
    const data = await loginApi(credentials, config.apiUrl);

    saveToken(data.token);
    saveRefreshToken(data.refreshToken);

    setToken(data.token);
    setRefreshTokenState(data.refreshToken);
    setTokenReady(true); // ✅

    lastTokenRef.current = data.token;
    lastRefreshTokenRef.current = data.refreshToken;

    setUser({
      userId: data.userId,
      email: data.email,
      name: data.arabicName || data.englishName,
    });

    setGlobalError(null);
  };

  const logout = () => {
    clearToken();
    clearRefreshToken();
    setToken(null);
    setRefreshTokenState(null);
    setTokenReady(false); // ✅

    lastTokenRef.current = null;
    lastRefreshTokenRef.current = null;

    setUser(null);
    isInitialRefreshDoneRef.current = false;
    isRefreshingRef.current = false;

    setGlobalError("❌ جلسة العمل انتهت. الرجاء تسجيل الدخول من جديد.");
  };

  // 🔁 Refresh token on initial load
  useEffect(() => {
    const tryRefreshToken = async () => {
      if (!isInitialRefreshDoneRef.current && !getToken() && refreshToken) {
        try {
          isRefreshingRef.current = true;
          const data = await refreshTokenApi(refreshToken, config.apiUrl);

          if (data.accessToken) {
            saveToken(data.accessToken);
            setToken(data.accessToken);
            lastTokenRef.current = data.accessToken;
            setTokenReady(true); // ✅
          }

          if (data.refreshToken) {
            saveRefreshToken(data.refreshToken);
            setRefreshTokenState(data.refreshToken);
            lastRefreshTokenRef.current = data.refreshToken;
          }

          isInitialRefreshDoneRef.current = true;
        } catch (err) {
          console.error("Initial token refresh failed:", err);
          logout();
        } finally {
          isRefreshingRef.current = false;
        }
      } else {
        setTokenReady(true); // ✅ Token already present
      }
    };

    tryRefreshToken();
  }, [refreshToken, config.apiUrl]);

  // ♻️ Auto-refresh every 1 min
  useEffect(() => {
    let intervalId;

    if (token && refreshToken) {
      intervalId = setInterval(async () => {
        if (isRefreshingRef.current) return;
        try {
          isRefreshingRef.current = true;

          const data = await refreshTokenApi(refreshToken, config.apiUrl);

          if (data.accessToken) {
            saveToken(data.accessToken);
            setToken(data.accessToken);
            lastTokenRef.current = data.accessToken;
          }

          if (data.refreshToken) {
            saveRefreshToken(data.refreshToken);
            setRefreshTokenState(data.refreshToken);
            lastRefreshTokenRef.current = data.refreshToken;
          }

          setTokenReady(true); // ✅

          if (data.refreshToken === "") {
            console.warn("Refresh token empty → logout");
            logout();
          }
        } catch (err) {
          console.error("Auto token refresh failed:", err);
          logout();
        } finally {
          isRefreshingRef.current = false;
        }
      }, 60 * 1000); // 1 minute
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [token, refreshToken, config.apiUrl]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        tokenReady, // ✅ shared to consumer
        refreshToken,
        login,
        logout,
        globalError,
        setGlobalError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

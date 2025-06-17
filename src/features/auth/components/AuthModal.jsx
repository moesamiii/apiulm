import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthModal = ({ onClose }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      await login({ userId, password });
      alert("تم تسجيل الدخول بنجاح!");
      onClose();
    } catch (err) {
      setError(err.message || "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-white/50 z-[9999]"
      onClick={onClose}
    >
      <div
        className="w-[90%] max-w-[1200px] flex flex-row bg-white rounded-2xl overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Right Section (Login Form) — now FIRST so will be on LEFT */}
        <div className="flex-1 bg-white p-10" dir="rtl">
          <h3 className="w-[364px] text-[30px] font-bold text-gray-900 text-center mb-6">
            تسجيل الدخول
          </h3>

          <div className="flex flex-col gap-4">
            {/* Email Input */}
            <div className="relative">
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="الايميل"
                className="w-[364px] h-[52px] px-4 pr-12 border border-gray-300 rounded-2xl bg-white text-gray-800 outline-none"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                👤
              </span>
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="كلمة المرور"
                className="w-[364px] h-[52px] px-4 pr-12 border border-gray-300 rounded-2xl bg-white text-gray-800 outline-none"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                🔒
              </span>
            </div>

            {/* Error */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Forgot Password */}
            <div className="w-[364px] text-xs text-red-700 cursor-pointer mt-1 text-left">
              هل نسيت كلمة المرور؟
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-[364px] h-[52px] rounded-2xl font-semibold text-white mt-4 shadow-md ${
                loading ? "opacity-50" : "hover:opacity-90"
              } bg-gradient-to-r from-blue-500 to-blue-600 cursor-pointer border-none`}
            >
              {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
            </button>

            {/* Create Account */}
            <div className="w-[364px] text-base text-center text-gray-600 mt-2">
              ليس لديك حساب؟{" "}
              <span className="text-blue-500 underline cursor-pointer">
                إنشاء حساب جديد
              </span>
            </div>
          </div>
        </div>

        {/* Left Section (Image) — now SECOND so will be on RIGHT */}
        <div className="flex-1 bg-gradient-to-b from-blue-100 to-white p-8 flex flex-col justify-center items-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-2xl text-blue-500 cursor-pointer border-none bg-transparent"
          >
            ×
          </button>
          <img
            src="/Group 452466.png"
            alt="doctors"
            className="w-full max-w-[300px] my-6"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

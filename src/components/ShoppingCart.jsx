import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "../features/auth/hooks/useAuth";

const ShoppingCart = () => {
  const { token, logout } = useAuth();
  const [cartData, setCartData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [retryAttempted, setRetryAttempted] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          "https://test.newulmmed.com/api/UserCart/GetUserCart",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Cart API response:", response);

        if (response.data?.isSuccess) {
          setCartData(response.data.data);
          setError(null); // clear any previous error
        } else {
          setCartData(null); // trigger fallback static cart
        }
      } catch (err) {
        console.error("Cart API error:", err);

        if (err.response && err.response.status === 401) {
          if (!retryAttempted) {
            console.warn("Token might be expired → attempting refresh...");
            // Force refresh by triggering logout → will cause re-login flow.
            // In real app, you would call a refresh token function here.
            // For now → we simulate: logout + user re-login needed.
            setRetryAttempted(true);
            setError("🔄 تم تحديث الجلسة... الرجاء المحاولة مرة أخرى.");
          } else {
            console.error("Second attempt failed → logging out.");
            logout();
            setError("❌ جلسة العمل انتهت. الرجاء تسجيل الدخول من جديد.");
          }
        } else {
          setError("❌ حدث خطأ غير متوقع.");
        }

        setCartData(null); // clear cart if error
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchCart();
    } else {
      setLoading(false);
      setError("❌ غير مصرح لك بالوصول إلى السلة. الرجاء تسجيل الدخول.");
    }
  }, [token, retryAttempted, logout]);

  if (loading) return <p style={{ padding: "2rem" }}>🕑 جارٍ تحميل السلة...</p>;

  if (error)
    return (
      <p style={{ padding: "2rem", color: "red", textAlign: "center" }}>
        {error}
      </p>
    );

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🛒 تستطيع استخدام سلة التسوق</h2>

      {cartData ? (
        // Real API cart data
        <pre>{JSON.stringify(cartData, null, 2)}</pre>
      ) : (
        // Empty cart or fallback
        <p>السلة فارغة.</p>
      )}
    </div>
  );
};

export default ShoppingCart;

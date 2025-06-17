import React from "react";
import "./ErrorMessage.css";

const ErrorMessage = ({ error }) => {
  return (
    <div className="error-message">
      <p>حدث خطأ: {error}</p>
      <p>الرجاء المحاولة لاحقاً</p>
    </div>
  );
};

export default ErrorMessage;

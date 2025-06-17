import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>جاري تحميل البيانات...</p>
    </div>
  );
};

export default LoadingSpinner;

import React from "react";
import { useTranslation } from "react-i18next";

const TestCard = ({ test }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div className="group bg-white rounded-xl p-4 shadow-md w-full max-w-xs mx-auto flex flex-col transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:bg-gray-50 rtl">
      <div className="flex justify-center mb-4 transition-all duration-300 ease-in-out">
        {test.logo ? (
          <img
            src={test.logo}
            alt={
              isArabic
                ? test.arabicName || test.name
                : test.name || test.arabicName
            }
            className="w-12 h-12 sm:w-[140px] sm:h-[140px] object-contain transition-all duration-300 ease-in-out"
          />
        ) : (
          <span className="text-3xl sm:text-5xl text-blue-600 transition-all duration-300 ease-in-out">
            🔬
          </span>
        )}
      </div>
      <div className="text-right">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 transition-all duration-300 ease-in-out">
          {isArabic
            ? test.arabicName || test.name
            : test.name || test.arabicName}
        </h3>
        <p className="text-sm text-gray-500 mb-4 overflow-hidden text-ellipsis line-clamp-3">
          {isArabic
            ? test.arabicDescription || test.description || "لا يوجد وصف متوفر"
            : test.description ||
              test.arabicDescription ||
              "No description available"}
        </p>
      </div>
    </div>
  );
};

export default TestCard;

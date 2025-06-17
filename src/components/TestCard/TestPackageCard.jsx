import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const TestPackageCard = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(
          "https://newulmmed.com/api/MedicalTest/GetAllMedicalTestPackages?PageNumber=1&PageSize=1"
        );
        setTests(response.data.data || []);
      } catch (err) {
        setError("Failed to fetch test packages.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  if (loading) return <p>{isArabic ? "جار التحميل..." : "Loading..."}</p>;
  if (error) return <p>{isArabic ? "فشل في تحميل البيانات" : error}</p>;

  return (
    <div className="w-[1276px] flex flex-wrap gap-4 justify-start" dir="rtl">
      {tests.map((test) => (
        <div
          key={test.id}
          className="w-[344px] bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center"
        >
          {test.logo ? (
            <div className="mb-4">
              <img
                src={test.logo}
                alt={
                  isArabic
                    ? test.arabicName || test.name
                    : test.name || test.arabicName
                }
                className="w-[140px] h-[140px] object-contain"
              />
            </div>
          ) : (
            <div className="text-4xl text-blue-600 mb-4">🔬</div>
          )}

          <div className="text-center w-full">
            <p className="text-blue-600 font-medium text-base mb-1">
              ${test.price || "550.16"}
            </p>
            <h3 className="text-gray-900 font-semibold text-base mb-1">
              {isArabic
                ? test.arabicName || test.name
                : test.name || test.arabicName}
            </h3>
            <p className="text-sm text-gray-500 leading-snug">
              {isArabic
                ? test.arabicDescription ||
                  test.description ||
                  "لا يوجد وصف متوفر"
                : test.description ||
                  test.arabicDescription ||
                  "No description available"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestPackageCard;

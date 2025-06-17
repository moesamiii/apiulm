// 🟡 Original logic (commented out temporarily due to backend error)
/*
import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import TestCard from "../components/TestCard/TestCard";
import Pagination from "../components/Pagination/Pagination";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import NoDataMessage from "../components/NoDataMessage/NoDataMessage";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import StickyButton from "../components/StickyButton/StickyButton";
import { FaArrowUp } from "react-icons/fa";
import "./MedicalTestsPage.css";
import TestPackageCard from "../components/TestCard/TestPackageCard";

const MedicalTestsPage = () => {
  const { t, i18n } = useTranslation();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchTests = async () => {
    try {
      setLoading(true);
      setError(null);

      // ⚠️ Temporarily disabled due to backend 500 error
      // const url =
      //   "https://newulmmed.com/api/MedicalTest/GetAllActiveMedicalTestsWithoutPrice";

      // const response = await axios.get(url, {
      //   params: {
      //     pageNumber: currentPage,
      //     pageSize: pageSize,
      //   },
      // });

      // const data = response.data;
      // const formattedData = data.data || [];

      // setTests(formattedData);
      // setTotalPages(Math.ceil((data.totalCount || 0) / pageSize));

      // 👉 Temporary fallback
      setError("🚧 تم تعطيل تحميل الفحوصات مؤقتًا بسبب تحديث في الخادم.");
      setTests([]);
    } catch (err) {
      let errorMsg = t("fetch_error");
      if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err.message) {
        errorMsg = err.message;
      }
      setError(errorMsg);
      setTests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, [currentPage, i18n.language]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      scrollToTop();
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (tests.length === 0 && !loading)
    return <NoDataMessage message={t("no_data")} />;

  return (
    <div className="medical-tests-page">
      <Navbar />
      <h1 className="page-title">{t("medical_tests_title")}</h1>

      <div className="medical-tests-grid">
        {tests.map((test) => (
          <TestCard key={test.id} test={test} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <Footer />

      <StickyButton
        label="Chat on WhatsApp"
        phoneNumber="00962785050875"
        message="Hello, I want to get in touch!"
        icon={<i className="fab fa-whatsapp"></i>}
      />
    </div>
  );
};

export default MedicalTestsPage;
*/

// 🟢 Temporary minimal version (safe)
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import StickyButton from "../components/StickyButton/StickyButton";

const MedicalTestsPage = () => {
  return (
    <div className="medical-tests-page text-center pt-10">
      <Navbar />

      <div className="max-w-xl mx-auto mt-20 p-6 bg-white rounded shadow">
        <h1 className="text-xl font-bold mb-4">🚧 جاري التحديث</h1>
        <p className="text-gray-700 text-lg">
          تم تعطيل صفحة الفحوصات مؤقتًا بسبب تحديث في الخادم.
        </p>
        <p className="text-gray-500 mt-2">الرجاء المحاولة لاحقًا.</p>
      </div>

      <Footer />

      <StickyButton
        label="Chat on WhatsApp"
        phoneNumber="00962785050875"
        message="Hello, I want to get in touch!"
        icon={<i className="fab fa-whatsapp"></i>}
      />
    </div>
  );
};

export default MedicalTestsPage;

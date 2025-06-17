import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ar",
    debug: false,
    resources: {
      en: {
        translation: {
          home: "Home",
          services: "Services",
          about: "About Us",
          login: "Login",
          medical_tests_title: "Medical Test List",
          fetch_error: "An error occurred while fetching data.",
          no_data: "No medical tests found.",
          footer: {
            contact_us: "Contact Us",
            location: "Jordan - Amman",
            our_services: "Our Services",
            services: {
              medical_tests: "Medical Tests",
              radiology: "Radiology",
              doctors: "Doctors",
              health_facilities: "Health Facilities",
              medical_tourism: "Medical Tourism",
            },
            company: "Company",
            about_us: "About Us",
            our_vision: "Our Vision",
            our_mission: "Our Mission",
            contact: "Contact",
            rights_reserved: "All rights reserved.",
          },
        },
      },
      ar: {
        translation: {
          home: "الرئيسية",
          services: "خدماتنا",
          about: "من نحن",
          login: "تسجيل الدخول",
          medical_tests_title: "قائمة الفحوصات الطبية",
          fetch_error: "حدث خطأ أثناء جلب البيانات",
          no_data: "لم يتم العثور على فحوصات طبية.",
          footer: {
            contact_us: "تواصل معنا",
            location: "الاردن - عمان",
            our_services: "خدماتنا",
            services: {
              medical_tests: "التحاليل الطبية",
              radiology: "الأشعة",
              doctors: "الأطباء",
              health_facilities: "المرافق الصحية",
              medical_tourism: "السياحة العلاجية",
            },
            company: "الشركة",
            about_us: "من نحن",
            our_vision: "رؤيتنا",
            our_mission: "رسالتنا",
            contact: "اتصل بنا",
            rights_reserved: "جميع الحقوق محفوظة.",
          },
        },
      },
    },
  });

export default i18n;

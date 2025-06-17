import React from "react";
import { useTranslation } from "react-i18next";
import "./Service.css";

const Service = () => {
  const { t } = useTranslation();

  const servicesList = [
    {
      key: "medical_tests",
      defaultText: "التحاليل الطبية",
      defaultDesc:
        "نوفر أحدث التحاليل المخبرية التي تغطي جميع الفحوصات الطبية بدقة عالية لضمان التشخيص السليم.",
    },
    {
      key: "radiology",
      defaultText: "الأشعة",
      defaultDesc:
        "خدمات الأشعة التشخيصية بمختلف أنواعها (أشعة سينية، رنين مغناطيسي، تصوير بالموجات فوق الصوتية) باستخدام أحدث الأجهزة.",
    },
    {
      key: "doctors",
      defaultText: "الأطباء",
      defaultDesc:
        "فريق متخصص من أفضل الأطباء في مختلف التخصصات الطبية لتقديم رعاية صحية شاملة ومتكاملة.",
    },
    {
      key: "health_facilities",
      defaultText: "المرافق الصحية",
      defaultDesc:
        "مرافق صحية حديثة مجهزة بأحدث التقنيات الطبية لتوفير بيئة علاجية مريحة وآمنة للمرضى.",
    },
    {
      key: "medical_tourism",
      defaultText: "السياحة العلاجية",
      defaultDesc:
        "برامج متكاملة للسياحة العلاجية تشمل استقبال المرضى وتوفير خدمات التنقل والإقامة والتأهيل الطبي.",
    },
  ];

  return (
    <div className="service-container">
      <h1>{t("services", "الخدمات")}</h1>
      <p className="intro">
        {t(
          "services_intro",
          "نقدم مجموعة متكاملة من الخدمات الصحية والطبية بأعلى معايير الجودة والاحترافية."
        )}
      </p>

      <ul className="service-list">
        {servicesList.map(({ key, defaultText, defaultDesc }) => (
          <li key={key}>
            <strong>{t(key, defaultText)}</strong>
            <p>{t(`${key}_desc`, defaultDesc)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Service;

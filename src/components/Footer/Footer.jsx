import React from "react";
import logo from "../../assets/Ulmcare logo 1.png";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#101827] text-[#d0d7e6] py-10 px-6 font-sans rtl text-right w-full">
      <div className="w-full px-6 flex flex-wrap justify-between gap-8 flex-row-reverse max-w-6xl mx-auto">
        {/* Contact Us */}
        <div className="flex-1 min-w-[160px]">
          <h3 className="text-[1.4rem] mb-4 font-bold text-[#7ea0f7]">
            {t("footer.contact_us")}
          </h3>
          <ul className="text-[#aab7d1] font-medium leading-8">
            <li className="mb-2 cursor-default hover:text-[#ffd95b] transition">
              📞 +966 123 456 789
            </li>
            <li className="mb-2 cursor-default hover:text-[#ffd95b] transition">
              📧 info@newulmmed.com
            </li>
            <li className="mb-2 cursor-default hover:text-[#ffd95b] transition">
              🏢 {t("footer.location")}
            </li>
          </ul>
        </div>

        {/* Our Services */}
        <div className="flex-1 min-w-[160px]">
          <h3 className="text-[1.4rem] mb-4 font-bold text-[#7ea0f7]">
            {t("footer.our_services")}
          </h3>
          <ul className="text-[#aab7d1] font-medium leading-8">
            <li className="mb-2 cursor-default hover:text-[#ffd95b] transition">
              {t("footer.services.medical_tests")}
            </li>
            <li className="mb-2 cursor-default hover:text-[#ffd95b] transition">
              {t("footer.services.radiology")}
            </li>
            <li className="mb-2 cursor-default hover:text-[#ffd95b] transition">
              {t("footer.services.doctors")}
            </li>
            <li className="mb-2 cursor-default hover:text-[#ffd95b] transition">
              {t("footer.services.health_facilities")}
            </li>
            <li className="mb-2 cursor-default hover:text-[#ffd95b] transition">
              {t("footer.services.medical_tourism")}
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="flex-1 min-w-[160px]">
          <h3 className="text-[1.4rem] mb-4 font-bold text-[#7ea0f7]">
            {t("footer.company")}
          </h3>
          <ul className="text-[#aab7d1] font-medium leading-8">
            <li className="mb-2 cursor-default hover:text-[#ffd95b] transition">
              {t("footer.about_us")}
            </li>
            <li className="mb-2 cursor-default hover:text-[#ffd95b] transition">
              {t("footer.our_vision")}
            </li>
            <li className="mb-2 cursor-default hover:text-[#ffd95b] transition">
              {t("footer.our_mission")}
            </li>
            <li className="mb-2 cursor-default hover:text-[#ffd95b] transition">
              {t("footer.contact")}
            </li>
          </ul>
        </div>

        {/* Logo */}
        <div className="flex-1 min-w-[160px] flex items-center justify-start md:justify-center">
          <img
            src={logo}
            alt="New Ulm Med Logo"
            className="max-w-[140px] h-auto brightness-0 invert"
          />
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-[#2a3658] w-full pt-3 text-center text-sm text-[#7783a5] mt-8 px-6">
        <p>
          &copy; {new Date().getFullYear()} New Ulm{" "}
          {t("footer.rights_reserved")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronDown, FiShoppingCart, FiBell } from "react-icons/fi";
import avatar from "../../assets/avatar-man.png";
import logo from "../../assets/ulm-care-logo.png";

const CheckoutNavbar = () => {
  const navigate = useNavigate();
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="pt-[5px] bg-[#F9FAFB]">
      <nav className="w-full bg-white border-b border-[#FFFFFF]">
        <div className="max-w-[1440px] h-[42px] mx-auto flex items-center justify-between px-4 md:px-[80px]">
          {/* Left: Logo + Navigation */}
          <div className="flex items-center gap-[42px]">
            <div className="w-[131.54px]">
              <img src={logo} alt="Ulm Care Logo" className="h-[36px]" />
            </div>

            {/* Navigation */}
            <div className="relative flex gap-6 text-[#6F6F6F] text-sm md:text-base font-medium">
              <span
                onClick={() => navigate(-1)}
                className="text-[#0798F1] font-semibold cursor-pointer hover:underline"
              >
                الرئيسية
              </span>

              {/* Dropdown */}
              <div ref={dropdownRef} className="relative">
                <div
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <span>خدماتنا</span>
                  <FiChevronDown className="w-4 h-4 mt-[2px]" />
                </div>

                {servicesOpen && (
                  <div className="absolute top-full mt-2 bg-white border rounded-lg shadow-md py-2 w-56 z-50 text-right">
                    <div
                      onClick={() => {
                        navigate("/medical-tourism");
                        setServicesOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      السياحة العلاجية
                    </div>
                  </div>
                )}
              </div>

              <span className="cursor-pointer">كونكت للأطباء</span>
              <span className="cursor-pointer">الدعم</span>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 text-[#6F6F6F]">
              <FiBell className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" />
              <FiShoppingCart className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer text-sm md:text-base">
              <span>ENG</span>
              <FiChevronDown className="w-4 h-4" />
            </div>
            <img
              src={avatar}
              alt="Avatar"
              className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] rounded-full object-cover"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default CheckoutNavbar;

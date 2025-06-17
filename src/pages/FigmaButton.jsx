import React from "react";
import avatar from "../assets/avatar-man.png";
import logo from "../assets/ulm-care-logo.png";
import { FiChevronDown, FiShoppingCart, FiBell } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB]" dir="rtl">
      {/* Navbar with 64px top spacing */}
      <div className="pt-[64px] bg-[#F9FAFB]">
        <nav className="w-[1440px] bg-white mx-auto border-b border-[#FFFFFF]">
          {/* Navbar content container */}
          <div className="h-[42px] px-[80px] flex items-center justify-between">
            {/* Right section: Logo + Menu */}
            <div className="flex items-center h-[36px] gap-[42px]">
              {/* Logo */}
              <div className="w-[131.54px] h-[36px] flex items-center justify-end">
                <img
                  src={logo}
                  alt="Ulm Care Logo"
                  className="h-full w-auto object-contain"
                  style={{
                    maxWidth: "131.54px",
                    maxHeight: "36px",
                  }}
                />
              </div>

              {/* Updated Menu - Now exactly 298×24 with 16px gaps */}
              <div
                className="flex items-center h-[24px] gap-[16px]"
                style={{ width: "298px" }}
              >
                {/* الرئيسية */}
                <span
                  className="text-[#0798F1] font-semibold text-base leading-[24px] flex items-center"
                  style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
                >
                  الرئيسية
                </span>

                {/* خدماتنا + dropdown */}
                <div
                  className="flex items-center gap-[5px]"
                  style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
                >
                  <span className="text-base font-normal text-[#6F6F6F] leading-[24px]">
                    خدماتنا
                  </span>
                  <FiChevronDown className="w-[8px] h-[16px] text-[#6F6F6F] mt-[4px]" />
                </div>

                {/* كونكت للأطباء */}
                <span
                  className="text-base font-normal text-[#6F6F6F] leading-[24px]"
                  style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
                >
                  كونكت للأطباء
                </span>

                {/* الدعم */}
                <span
                  className="text-base font-normal text-[#6F6F6F] leading-[24px]"
                  style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
                >
                  الدعم
                </span>
              </div>
            </div>

            {/* Left section: Avatar, Language, Icons */}
            <div className="w-[590px] h-[42px] flex items-center justify-end gap-[16px]">
              {/* Icons - Both 24×24 with 16px gap between them */}
              <div className="flex items-center gap-[16px]">
                <FiBell className="w-[24px] h-[24px] text-[#6F6F6F]" />
                <FiShoppingCart className="w-[24px] h-[24px] text-[#6F6F6F]" />
              </div>

              {/* Language selector - Width Hug (55.67×24) */}
              <div className="flex items-center gap-1 h-[24px] text-[#6F6F6F]">
                <span
                  className="text-[16px] font-normal"
                  style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
                >
                  ENG
                </span>
                <FiChevronDown className="w-[24px] h-[24px]" />
              </div>

              {/* Avatar - 42×42 */}
              <div className="w-[42px] h-[42px]">
                <img
                  src={avatar}
                  alt="User Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

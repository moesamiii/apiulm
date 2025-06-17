import React from "react";
import ciImage from "../../assets/ci.png";

const OrderSummary = () => {
  return (
    <div
      className="bg-white p-6 rounded-xl shadow-sm w-full max-w-[582px] text-right"
      dir="rtl"
    >
      <h2 className="text-xl font-bold mb-4 text-[#1C1C1C]">تفاصيل الطلب</h2>

      <div className="flex items-start justify-between gap-4 border-b border-[#E5E5E5] pb-4 mb-4">
        <span className="text-[#4B4B4B] text-[14px] mt-1 whitespace-nowrap">
          1x
        </span>
        <img
          src={ciImage}
          alt="صورة الخدمة"
          className="w-[86px] h-[86px] object-contain rounded-[16px]"
        />
        <div className="flex flex-col items-end flex-1 gap-[2px]">
          <p className="text-[16px] font-bold text-[#1C1C1C] leading-tight">
            جراحة الفم والأسنان
          </p>
          <p className="text-[14px] text-[#6F6F6F] leading-tight">
            إزالة التصبغات والبقع
          </p>
          <p className="text-[14px] text-[#6F6F6F] leading-tight">
            يتطلب الصيام
          </p>
        </div>
        <div className="text-[16px] font-medium text-[#4B4B4B] whitespace-nowrap mt-1">
          250 JOD
        </div>
      </div>

      <div className="flex justify-between text-sm text-[#6F6F6F] mb-2">
        <span>(%16) الضريبة</span>
        <span>35 JOD</span>
      </div>

      <div className="flex justify-between items-center p-4 bg-[#F3FAFF] rounded-[8px]">
        <div className="text-[16px] font-medium text-[#6F6F6F] text-right leading-snug">
          المبلغ المستحق
          <div className="text-[12px] text-[#B3B3B3] font-normal">
            شامل الضريبة
          </div>
        </div>
        <div className="text-[20px] font-bold text-[#0099FF]">285 JOD</div>
      </div>
    </div>
  );
};

export default OrderSummary;

import React from "react";
import ciImage from "../../assets/ci.png";

const OrderSummary = () => {
  return (
    <div
      className="bg-[#FCFCFC] p-6 rounded-[24px] w-full max-w-[630px] text-right flex flex-col gap-4"
      dir="rtl"
    >
      {/* العنوان */}
      <h2 className="text-xl font-bold text-[#1C1C1C]">تفاصيل الطلب</h2>

      {/* الخدمة */}
      <div className="flex justify-between items-start gap-4 border-b border-[#E5E5E5] pb-4">
        {/* النص + الصورة + العدد */}
        <div className="flex items-start gap-4 flex-1">
          {/* صورة + عدد */}
          <div className="flex flex-col items-center gap-1">
            <img
              src={ciImage}
              alt="صورة الخدمة"
              className="w-[86px] h-[86px] object-contain rounded-[16px]"
            />
            <span className="text-[#4B4B4B] text-[14px]">1x</span>
          </div>

          {/* النصوص */}
          <div className="flex flex-col items-end text-right gap-[2px]">
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
        </div>

        {/* السعر */}
        <div className="text-[16px] font-bold text-[#4B4B4B] whitespace-nowrap mt-1">
          250 JOD
        </div>
      </div>

      {/* الضريبة */}
      <div className="flex justify-between text-sm text-[#6F6F6F]">
        <span>(%16) الضريبة</span>
        <span>35 JOD</span>
      </div>

      {/* المجموع */}
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

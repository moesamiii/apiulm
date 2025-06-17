import React from "react";

const CheckoutFooter = () => {
  return (
    <footer className="bg-[#0C1E2C] text-white py-10 px-4 md:px-[80px] text-sm mt-16">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold mb-3">Ulm Care</h4>
          <p>
            تقديم خدمات طبية شاملة بأعلى معايير الجودة والاحترافية، لضمان
            الرعاية المتكاملة لك ولعائلتك.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-3">الشركة</h4>
          <ul className="space-y-1">
            <li>من نحن؟</li>
            <li>انضم لنا</li>
            <li>الدعم</li>
            <li>أسئلة شائعة</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">خدماتنا</h4>
          <ul className="space-y-1">
            <li>التحاليل الطبية</li>
            <li>العيادات</li>
            <li>الأشعة</li>
            <li>الأطباء</li>
            <li>الرعاية المنزلية</li>
            <li>المرافقة الصحية</li>
            <li>السياحة العلاجية</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">تواصل معنا</h4>
          <p>+962790098906</p>
          <p>info@ulmcare.jo</p>
          <p>Wasfi AlTal St. P.O. Box. 5873 Amman - 11953 Jordan</p>
        </div>
      </div>
      <div className="text-center mt-6 text-xs text-gray-300 border-t border-gray-700 pt-4">
        جميع الحقوق محفوظة © New ULM®
      </div>
    </footer>
  );
};

export default CheckoutFooter;

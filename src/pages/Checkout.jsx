import React, { useState } from "react";
import CheckoutNavbar from "../components/Checkout/CheckoutNavbar";
import CheckoutBreadcrumb from "../components/Checkout/CheckoutBreadcrumb";
import OrderSummary from "../components/Checkout/OrderSummary";
import SavedAddresses from "../components/Checkout/SavedAddresses";
import NewAddressForm from "../components/Checkout/NewAddressForm";
import PaymentMethod from "../components/Checkout/PaymentMethod";
import CheckoutFooter from "../components/Checkout/CheckoutFooter";
import confirmationIcon from "../assets/icons/confirmation.png";

// ✅ Modal: Confirm Payment

const PaymentConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#FEFEFE] rounded-[16px] p-6 w-[556px] text-center shadow-lg relative">
        {/* زر الإغلاق */}
        <button
          onClick={onCancel}
          className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center rounded-full shadow-md bg-white text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* أيقونة التأكيد */}
        <div className="flex justify-center mb-4">
          <img
            src={confirmationIcon}
            alt="Confirmation Icon"
            className="w-[72px] h-[82px]"
          />
        </div>

        {/* العنوان */}
        <h2 className="text-[24px] font-bold text-black mb-3 leading-[100%]">
          تأكيد الدفع
        </h2>

        {/* النص */}
        <p className="text-[#6F6F6F] text-base mb-6 leading-snug">
          سيتم خصم المبلغ من بطاقتك بعد تأكيد العملية. هل ترغب في المتابعة؟
        </p>

        {/* الأزرار */}
        <div className="flex justify-center gap-4 w-full">
          <button
            onClick={onCancel}
            className="w-full max-w-[200px] border border-[#0798F1] text-[#0798F1] text-[16px] font-semibold py-2 rounded-[12px]"
          >
            إلغاء
          </button>
          <button
            onClick={onConfirm}
            className="w-full max-w-[200px] bg-[#0798F1] hover:bg-[#007dd1] text-white text-[16px] font-semibold py-2 rounded-[12px]"
          >
            تأكيد الدفع
          </button>
        </div>
      </div>
    </div>
  );
};

import successIcon from "../assets/icons/success.png"; // ✅ غيّر المسار حسب مكان حفظك للصورة

const PaymentSuccessModal = ({ isOpen, onClose, onEdit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#FEFEFE] rounded-[16px] p-6 w-[556px] text-center shadow-lg relative">
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center rounded-full shadow-md bg-white text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* الأيقونة */}
        <div className="flex justify-center mb-4">
          <img
            src={successIcon}
            alt="Success Icon"
            className="w-[72px] h-[72px]"
          />
        </div>

        {/* العنوان */}
        <h2 className="text-[24px] font-bold text-black mb-2">
          تم إرسال طلبك!
        </h2>

        {/* النص */}
        <p className="text-[#6F6F6F] text-base mb-6 leading-snug">
          تم إرسال طلب التأمين بنجاح، سيتم مراجعته والموافقة عليه قريبًا.
        </p>

        {/* الأزرار */}
        <div className="flex justify-center gap-4 w-full">
          <button
            onClick={onEdit}
            className="w-full max-w-[220px] border border-[#0798F1] text-[#0798F1] text-[16px] font-semibold py-[13px] rounded-[8px]"
          >
            تعديل الطلب
          </button>
          <button
            onClick={onClose}
            className="w-full max-w-[220px] bg-[#0798F1] hover:bg-[#007dd1] text-white text-[16px] font-semibold py-[13px] rounded-[8px]"
          >
            موافق
          </button>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handlePaymentClick = () => {
    setShowConfirmModal(true);
  };

  const confirmPayment = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(true); // Show second modal
  };

  const cancelPayment = () => {
    setShowConfirmModal(false);
  };

  const closeSuccess = () => {
    setShowSuccessModal(false);
  };

  const editOrder = () => {
    setShowSuccessModal(false);
    // Navigate or scroll to edit section if needed
    alert("🔧 تعديل الطلب");
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen text-right" dir="rtl">
      <CheckoutNavbar />
      <CheckoutBreadcrumb />

      <main className="max-w-[1280px] mx-auto mt-6 p-4 md:p-8 flex flex-col lg:flex-row-reverse gap-[20px] bg-white rounded-xl shadow-sm">
        {/* OrderSummary on the right with fixed width from Figma */}
        <aside className="w-full lg:w-[630px] flex-shrink-0">
          <div className="bg-white border border-[#FCFCFC] rounded-[24px] p-6 flex flex-col gap-4 text-right">
            <OrderSummary />
          </div>
        </aside>

        {/* Left section: Addresses + Payment */}
        <section className="w-full lg:flex-1 flex flex-col gap-6">
          <SavedAddresses />
          <NewAddressForm />
          <PaymentMethod />
        </section>
      </main>

      <div className="w-full flex justify-center px-4 md:px-[80px] mt-8">
        <button
          onClick={handlePaymentClick}
          className="w-full max-w-[400px] bg-[#0798F1] hover:bg-[#007dd1] text-white py-3 rounded-lg font-semibold text-sm"
        >
          إتمام الدفع
        </button>
      </div>

      {/* First Modal */}
      <PaymentConfirmationModal
        isOpen={showConfirmModal}
        onConfirm={confirmPayment}
        onCancel={cancelPayment}
      />

      {/* Second Modal */}
      <PaymentSuccessModal
        isOpen={showSuccessModal}
        onClose={closeSuccess}
        onEdit={editOrder}
      />

      <CheckoutFooter />
    </div>
  );
};

export default Checkout;

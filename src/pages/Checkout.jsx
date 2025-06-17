import React, { useState } from "react";
import CheckoutNavbar from "../components/Checkout/CheckoutNavbar";
import CheckoutBreadcrumb from "../components/Checkout/CheckoutBreadcrumb";
import OrderSummary from "../components/Checkout/OrderSummary";
import SavedAddresses from "../components/Checkout/SavedAddresses";
import NewAddressForm from "../components/Checkout/NewAddressForm";
import PaymentMethod from "../components/Checkout/PaymentMethod";
import CheckoutFooter from "../components/Checkout/CheckoutFooter";

// ✅ Modal: Confirm Payment
const PaymentConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md text-center shadow-lg relative">
        <button
          onClick={onCancel}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png"
              alt="Lock Icon"
              className="w-8 h-8"
            />
          </div>
        </div>
        <h2 className="text-xl font-bold mb-2">تأكيد الدفع</h2>
        <p className="text-gray-600 mb-6">
          سيتم خصم المبلغ من بطاقتك بعد تأكيد العملية. هل ترغب في المتابعة؟
        </p>
        <div className="flex justify-between gap-4">
          <button
            onClick={onCancel}
            className="w-full border border-[#0798F1] text-[#0798F1] py-2 rounded-lg font-semibold text-sm"
          >
            إلغاء
          </button>
          <button
            onClick={onConfirm}
            className="w-full bg-[#0798F1] hover:bg-[#007dd1] text-white py-2 rounded-lg font-semibold text-sm"
          >
            تأكيد الدفع
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅ Modal: Success After Payment
const PaymentSuccessModal = ({ isOpen, onClose, onEdit }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md text-center shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
              alt="Check Icon"
              className="w-8 h-8"
            />
          </div>
        </div>
        <h2 className="text-xl font-bold mb-2">تم إرسال طلبك!</h2>
        <p className="text-gray-600 mb-6">
          تم إرسال طلب التأمين بنجاح، سيتم مراجعته والموافقة عليه قريباً.
        </p>
        <div className="flex justify-between gap-4">
          <button
            onClick={onEdit}
            className="w-full border border-[#0798F1] text-[#0798F1] py-2 rounded-lg font-semibold text-sm"
          >
            تعديل الطلب
          </button>
          <button
            onClick={onClose}
            className="w-full bg-[#0798F1] hover:bg-[#007dd1] text-white py-2 rounded-lg font-semibold text-sm"
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
        <OrderSummary />
        <section className="w-full lg:w-1/2 flex flex-col gap-6">
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

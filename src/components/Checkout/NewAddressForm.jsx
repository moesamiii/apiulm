import React, { useState } from "react";
import { useAuthContext } from "../../features/auth/context/AuthProvider";

// ✅ الدول المدعومة
const countries = [
  { code: "JO", name: "الأردن", flag: "https://flagcdn.com/w40/jo.png" },
  { code: "SA", name: "السعودية", flag: "https://flagcdn.com/w40/sa.png" },
  { code: "EG", name: "مصر", flag: "https://flagcdn.com/w40/eg.png" },
  { code: "AE", name: "الإمارات", flag: "https://flagcdn.com/w40/ae.png" },
];

const NewAddressForm = () => {
  const { token, tokenReady } = useAuthContext();

  const [formData, setFormData] = useState({
    givenName: "",
    surName: "",
    country: "JO",
    city: "",
    street: "",
    state: "",
    postalCode: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (val) => {
    setFormData((prev) => ({ ...prev, country: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tokenReady || !token) {
      setStatusMessage("⏳ يرجى الانتظار... يتم تحميل التوكن");
      return;
    }

    const { givenName, surName, country, city, street, state, postalCode } =
      formData;

    if (
      !givenName.trim() ||
      !surName.trim() ||
      !country.trim() ||
      city.trim().length < 3 ||
      state.trim().length < 3 ||
      !street.trim() ||
      !postalCode.trim()
    ) {
      setStatusMessage("❌ الرجاء تعبئة جميع الحقول المطلوبة بشكل صحيح");
      return;
    }

    if (country === "JO") {
      const postal = parseInt(postalCode, 10);
      if (isNaN(postal) || postal < 11000 || postal > 19000) {
        setStatusMessage(
          "❌ الرمز البريدي يجب أن يكون بين 11000 و 19000 للأردن"
        );
        return;
      }
    }

    setStatusMessage("جارٍ إرسال البيانات...");

    try {
      const response = await fetch(
        "https://test.newulmmed.com/api/BillingAddress/AddBillingAddress",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setStatusMessage("✅ تم حفظ العنوان بنجاح");
        setFormData({
          givenName: "",
          surName: "",
          country: "JO",
          city: "",
          street: "",
          state: "",
          postalCode: "",
        });
        setTimeout(() => {
          setShowForm(false);
          setStatusMessage("");
        }, 2000);
      } else {
        const data = await response.json();
        console.error("Server Error:", data);
        setStatusMessage(`❌ ${data.statusMessage || "فشل الإرسال"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatusMessage("❌ حدث خطأ أثناء الاتصال بالخادم");
    }
  };

  return (
    <div className="w-full max-w-[582px]">
      {!showForm ? (
        <div className="flex justify-center items-center py-6">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 text-blue-500 hover:text-blue-600 bg-transparent active:bg-transparent focus:bg-transparent underline decoration-current"
          >
            <span className="text-inherit bg-transparent">
              إضافة عنوان جديد
            </span>
            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
              +
            </span>
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-sm" dir="rtl">
          <div className="flex justify-between items-center mb-4 bg-transparent">
            <h3 className="text-base font-semibold text-gray-800 bg-transparent">
              إضافة عنوان جديد
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setStatusMessage("");
              }}
              className="text-gray-500 hover:text-gray-700 bg-transparent focus:bg-transparent active:bg-transparent"
            >
              ✕
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 text-sm text-right"
          >
            <InputField
              name="givenName"
              label="الاسم الأول"
              value={formData.givenName}
              onChange={handleChange}
            />
            <InputField
              name="surName"
              label="الاسم الأخير"
              value={formData.surName}
              onChange={handleChange}
            />
            <CustomCountrySelect
              value={formData.country}
              onChange={handleCountryChange}
              label="الدولة"
            />
            <InputField
              name="city"
              label="المدينة"
              value={formData.city}
              onChange={handleChange}
            />
            <InputField
              name="street"
              label="اسم الشارع"
              value={formData.street}
              onChange={handleChange}
            />
            <InputField
              name="state"
              label="المنطقة / الولاية"
              value={formData.state}
              onChange={handleChange}
            />
            <InputField
              name="postalCode"
              label="الرمز البريدي"
              value={formData.postalCode}
              onChange={handleChange}
            />

            <div className="flex" dir="ltr">
              <button
                type="submit"
                disabled={!tokenReady}
                className={`bg-[#0798F1] hover:bg-[#007dd1] text-white text-sm font-medium px-6 py-2 rounded-[8px] ${
                  !tokenReady ? "opacity-50 cursor-not-allowed" : ""
                } mr-auto`}
              >
                حفظ
              </button>
            </div>

            {statusMessage && (
              <p className="text-red-500 text-sm mt-2 text-right">
                {statusMessage}
              </p>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

// ✅ حقل إدخال قابل لإعادة الاستخدام
const InputField = ({ name, label, value, onChange }) => (
  <div>
    <label className="block mb-1 text-[#1C1C1C] font-medium">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={`أضف ${label}`}
      className="w-full border border-[#D8D8D8] rounded-[8px] p-3 bg-white placeholder:text-gray-400"
    />
  </div>
);

const CustomCountrySelect = ({ label, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const selected = countries.find((c) => c.code === value);

  return (
    <div className="relative text-sm text-right">
      <label className="block mb-1 text-[#1C1C1C] font-medium">{label}</label>

      {/* ✅ جعل الشكل مطابق لباقي الحقول */}
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center border border-[#D8D8D8] rounded-[8px] p-3 bg-white cursor-pointer"
      >
        {selected ? (
          <div className="flex items-center gap-2">
            <img
              src={selected.flag}
              alt={selected.name}
              className="w-[26px] h-[13px] rounded-[4px]"
            />
            <span>{selected.name}</span>
          </div>
        ) : (
          <span className="text-gray-400">اختر الدولة</span>
        )}

        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {open && (
        <div className="absolute z-10 w-full bg-white mt-1 rounded-[8px] shadow-md max-h-60 overflow-auto border border-[#D8D8D8]">
          {countries.map((country) => (
            <div
              key={country.code}
              onClick={() => {
                onChange(country.code);
                setOpen(false);
              }}
              className="flex items-center justify-between gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <span>{country.name}</span>
              <img
                src={country.flag}
                alt={country.name}
                className="w-[26px] h-[13px] rounded-[4px]"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewAddressForm;

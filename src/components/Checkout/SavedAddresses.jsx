import React, { useEffect, useState } from "react";
import trashIcon from "../../assets/icons/trash.png";
import penIcon from "../../assets/icons/pen.png";
import { getToken } from "../../features/auth/utils/tokenUtils";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

const SavedAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    givenName: "",
    surName: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });
  const [selectedAddressId, setSelectedAddressId] = useState(null); // New state for selected address

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    addressId: null,
  });
  const [editModalOpen, setEditModalOpen] = useState(false);

  const token = getToken();

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!token) {
        alert("التوكن غير موجود، الرجاء تسجيل الدخول");
        return;
      }

      try {
        const res = await fetch(
          "https://test.newulmmed.com/api/BillingAddress/GetUserBillingAddresses?pageNumber=1&pageSize=10",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("فشل في تحميل العناوين");

        const data = await res.json();
        setAddresses(data.data || []);
        // Auto-select first address if available
        if (data.data && data.data.length > 0) {
          setSelectedAddressId(data.data[0].id);
        }
      } catch (err) {
        console.error("Error fetching addresses:", err);
        alert("فشل تحميل العناوين");
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [token]);

  const confirmDelete = (id) => {
    setDeleteModal({ isOpen: true, addressId: id });
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `https://test.newulmmed.com/api/BillingAddress/DeleteBillingAddress/${deleteModal.addressId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("فشل الحذف");

      setAddresses((prev) =>
        prev.filter((addr) => addr.id !== deleteModal.addressId)
      );
      // If deleted address was selected, clear selection
      if (selectedAddressId === deleteModal.addressId) {
        setSelectedAddressId(addresses.length > 1 ? addresses[1].id : null);
      }
      setDeleteModal({ isOpen: false, addressId: null });
    } catch (err) {
      console.error("Error deleting address:", err);
      alert("حدث خطأ أثناء الحذف");
    }
  };

  const handleEdit = (address) => {
    setFormData({ ...address });
    setEditingAddress(address.id);
    setEditModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        "https://test.newulmmed.com/api/BillingAddress/UpdateBillingAddress",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("فشل التحديث");

      setAddresses((prev) =>
        prev.map((addr) => (addr.id === formData.id ? { ...formData } : addr))
      );
      setEditModalOpen(false);
      setEditingAddress(null);
    } catch (err) {
      console.error("Error updating address:", err);
      alert("حدث خطأ أثناء التحديث");
    }
  };

  return (
    <div
      className="bg-white p-6 rounded-xl  max-w-[582px] text-right"
      dir="rtl"
    >
      <h2 className="text-xl font-bold mb-4 text-[#1C1C1C]">
        عنوان الفواتير المحفوظة
      </h2>

      {loading ? (
        <p className="text-gray-500">جاري التحميل...</p>
      ) : (
        <div className="space-y-3">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`relative rounded-[8px] border p-4 text-sm transition cursor-pointer ${
                selectedAddressId === address.id
                  ? "bg-[#F3FAFE] border-[#ADE4FF]"
                  : "bg-white border-[#D8D8D8]"
              }`}
              onClick={() => setSelectedAddressId(address.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAddressId === address.id
                        ? "border-[#0099FF] bg-[#0099FF]"
                        : "border-gray-400"
                    }`}
                  >
                    {selectedAddressId === address.id && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0L3.293 9.414a1 1 0 111.414-1.414L9 12.586l6.293-6.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <p className="font-bold text-sm text-[#1C1C1C]">
                    {address.givenName} {address.surName}
                  </p>
                </div>
                <div
                  className="flex gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => handleEdit(address)}
                    className="w-[24px] h-[24px] p-[2px] bg-white rounded-md shadow-sm hover:opacity-80 transition"
                  >
                    <img
                      src={penIcon}
                      alt="Edit"
                      className="w-full h-full object-contain"
                    />
                  </button>
                  <button
                    onClick={() => confirmDelete(address.id)}
                    className="w-[24px] h-[24px] p-[2px] bg-white rounded-md shadow-sm hover:opacity-80 transition"
                  >
                    <img
                      src={trashIcon}
                      alt="Delete"
                      className="w-full h-full object-contain"
                    />
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-gray-500 leading-5">
                  {address.street}، {address.city}، {address.state}،{" "}
                  {address.country}
                </p>
                <p className="text-gray-400 mt-1 text-sm">
                  {address.postalCode}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      <ReactModal
        isOpen={deleteModal.isOpen}
        onRequestClose={() =>
          setDeleteModal({ isOpen: false, addressId: null })
        }
        className="bg-white p-6 max-w-md mx-auto rounded-xl shadow-xl border outline-none text-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
      >
        <div
          className="flex flex-col items-center space-y-4 text-center"
          dir="rtl"
        >
          <div className="text-red-500 text-5xl">⚠️</div>
          <h2 className="text-lg font-bold text-[#1C1C1C]">تأكيد الحذف</h2>
          <p className="text-sm text-gray-600">
            هل أنت متأكد من حذف هذا العنوان؟ لا يمكن التراجع عن هذا الإجراء.
          </p>
          <div className="flex gap-4 justify-center mt-4 w-full">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-6 py-2 rounded-md text-sm hover:bg-red-600 w-full"
            >
              حذف
            </button>
            <button
              onClick={() => setDeleteModal({ isOpen: false, addressId: null })}
              className="bg-gray-200 text-[#1C1C1C] px-6 py-2 rounded-md text-sm hover:bg-gray-300 w-full"
            >
              رجوع
            </button>
          </div>
        </div>
      </ReactModal>

      {/* Edit Modal */}
      <ReactModal
        isOpen={editModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        className="bg-white p-6 max-w-lg mx-auto rounded-xl shadow-xl outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
      >
        <div dir="rtl" className="space-y-4">
          <h2 className="text-lg font-bold text-center">تعديل العنوان</h2>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">الاسم الأخير</label>
              <input
                value={formData.surName}
                onChange={(e) =>
                  setFormData({ ...formData, surName: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="text-sm font-medium">الاسم الأول</label>
              <input
                value={formData.givenName}
                onChange={(e) =>
                  setFormData({ ...formData, givenName: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">الدولة</label>
              <input
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="text-sm font-medium">المدينة</label>
              <input
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">اسم الشارع</label>
            <input
              value={formData.street}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm font-medium">الرمز البريدي</label>
            <input
              value={formData.postalCode}
              onChange={(e) =>
                setFormData({ ...formData, postalCode: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              حفظ
            </button>
            <button
              onClick={() => setEditModalOpen(false)}
              className="border border-blue-500 text-blue-500 px-6 py-2 rounded hover:bg-blue-50"
            >
              إلغاء
            </button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default SavedAddresses;

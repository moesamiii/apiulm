import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Animation variants for the payment options
  const optionVariants = {
    initial: {
      scale: 1,
      y: 0,
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    },
    selected: {
      scale: 1.02,
      y: -5,
      backgroundColor: "#F0F9FF",
      borderColor: "#0798F1",
      boxShadow:
        "0 10px 15px -3px rgba(7, 152, 241, 0.2), 0 4px 6px -2px rgba(7, 152, 241, 0.1)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 20,
      },
    },
    hover: {
      backgroundColor: "#F9FAFB",
      borderColor: "#0798F1",
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  };

  // Animation for radio button selection
  const radioVariants = {
    unselected: {
      scale: 0.5,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    selected: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
      },
    },
  };

  // Animation for payment icons
  const iconVariants = {
    hover: {
      y: -5,
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  // Animation for amount display
  const amountVariants = {
    hover: {
      scale: 1.05,
      x: -5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  const paymentMethods = [
    {
      id: "card",
      label: "الدفع باستخدام البطاقة",
      icons: [
        "https://img.icons8.com/color/48/visa.png",
        "https://img.icons8.com/color/48/mastercard-logo.png",
        "https://img.icons8.com/color/48/paypal.png",
      ],
      amount: null,
    },
    {
      id: "cash",
      label: "الدفع كاش في نيو أولم",
      icons: [],
      amount: null,
    },
    {
      id: "installment-site",
      label: "دفع بالتقسيط عن طريق المواقع",
      icons: [],
      amount: "من 10 إلى 1,000 JOD",
    },
    {
      id: "installment-bank",
      label: "دفع بالتقسيط عن طريق البنك",
      icons: [],
      amount: "من 10 إلى 1,000 JOD",
    },
  ];

  return (
    <motion.div
      className="bg-white p-6 rounded-[24px] shadow-sm w-full max-w-[582px] text-right space-y-4"
      dir="rtl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2
        className="text-[20px] font-medium text-[#686767] leading-[100%]"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        اختر طريقة الدفع
      </motion.h2>

      <AnimatePresence>
        {paymentMethods.map((method) => (
          <motion.label
            key={method.id}
            className={`flex items-center justify-between gap-3 border rounded-[16px] px-4 py-4 cursor-pointer ${
              selectedMethod === method.id
                ? "border-[#0798F1]"
                : "border-[#D8D8D8]"
            }`}
            variants={optionVariants}
            initial="initial"
            animate={selectedMethod === method.id ? "selected" : "initial"}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setSelectedMethod(method.id)}
            layout
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="relative flex items-center">
                <input
                  type="radio"
                  name="payment"
                  className="absolute opacity-0 w-0 h-0 peer"
                  checked={selectedMethod === method.id}
                  onChange={() => {}}
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedMethod === method.id
                      ? "border-[#0798F1]"
                      : "border-[#D8D8D8]"
                  }`}
                >
                  <motion.div
                    className="w-2.5 h-2.5 bg-[#0798F1] rounded-full"
                    variants={radioVariants}
                    animate={
                      selectedMethod === method.id ? "selected" : "unselected"
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col items-end text-right">
                <span className="text-[#1C1C1C] text-[14px] font-normal">
                  {method.label}
                </span>
              </div>
            </div>

            {method.icons.length > 0 && (
              <div className="flex gap-2">
                {method.icons.map((icon, index) => (
                  <motion.img
                    key={index}
                    src={icon}
                    alt="Payment method"
                    className="w-[42px] h-[42px]"
                    variants={iconVariants}
                    whileHover="hover"
                    custom={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  />
                ))}
              </div>
            )}

            {method.amount && (
              <motion.span
                className="text-[#0798F1] text-[14px] font-medium text-left whitespace-nowrap ml-4"
                variants={amountVariants}
                whileHover="hover"
              >
                {method.amount}
              </motion.span>
            )}
          </motion.label>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default PaymentMethod;

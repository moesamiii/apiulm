import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center gap-[8.35px] mt-6 flex-wrap w-full px-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-[53.42px] h-[53.42px] flex items-center justify-center rounded-full border transition-all text-gray-800 text-lg font-semibold ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed bg-gray-100"
            : "bg-white hover:bg-blue-100"
        }`}
      >
        <FiChevronRight className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        let pageNum;
        if (totalPages <= 5) {
          pageNum = i + 1;
        } else if (currentPage <= 3) {
          pageNum = i + 1;
        } else if (currentPage >= totalPages - 2) {
          pageNum = totalPages - 4 + i;
        } else {
          pageNum = currentPage - 2 + i;
        }

        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-[53.42px] h-[53.42px] flex items-center justify-center rounded-full border text-lg font-semibold transition-all ${
              currentPage === pageNum
                ? "bg-[#0798F1] text-white"
                : "bg-white text-gray-800 hover:bg-blue-100"
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Ellipsis + Last Page */}
      {totalPages > 5 && currentPage < totalPages - 2 && (
        <>
          <span className="px-2 text-gray-500 flex items-center justify-center">
            ...
          </span>
          <button
            onClick={() => onPageChange(totalPages)}
            className="w-[53.42px] h-[53.42px] flex items-center justify-center rounded-full border bg-white text-gray-800 text-lg font-semibold hover:bg-blue-100 transition-all"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-[53.42px] h-[53.42px] flex items-center justify-center rounded-full border transition-all text-gray-800 text-lg font-semibold ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed bg-gray-100"
            : "bg-white hover:bg-blue-100"
        }`}
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;

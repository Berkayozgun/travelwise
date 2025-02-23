"use client";

import { useState } from "react";
import FilterModal from "./FilterModal";
import { toast } from "sonner";

export default function Navbar({ onFilterApply }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFeatureClick = (feature) => {
    toast.info(`${feature} feature is coming soon!`, {
      description: "Stay tuned for updates.",
      duration: 2500,
      icon: "ℹ️",
    });
  };

  return (
    <nav className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 sm:p-6 flex justify-between items-center shadow-xl sticky top-0 z-50 transition-all duration-300">
      <div className="flex items-center space-x-4">
        <button
          aria-label="Open filters"
          className="md:hidden text-3xl p-2 hover:bg-primary-600/80 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
          onClick={() => setIsModalOpen(true)}
        >
          ☰
        </button>
        <span className="text-2xl font-extrabold tracking-tight">Travel App</span>
      </div>
      <div className="flex items-center space-x-6 sm:space-x-8">
        <button
          className="hidden md:block text-lg font-medium hover:text-primary-400 transition-colors duration-200 hover:scale-105"
          onClick={() => setIsModalOpen(true)}
        >
          Filters
        </button>
        <div className="hidden md:flex items-center space-x-6 sm:space-x-8">
          <button
            className="text-lg font-medium hover:text-primary-400 transition-colors duration-200 hover:scale-105"
            onClick={() => handleFeatureClick("Favorites")}
          >
            Favorites
          </button>
          <button
            className="text-lg font-medium hover:text-primary-400 transition-colors duration-200 hover:scale-105"
            onClick={() => handleFeatureClick("Cart")}
          >
            Cart
          </button>
          <button
            className="text-lg font-medium hover:text-primary-400 transition-colors duration-200 hover:scale-105 bg-primary-600 px-4 py-1 rounded-full hover:bg-primary-700 transition-all duration-200"
            onClick={() => handleFeatureClick("Login")}
          >
            Login
          </button>
        </div>
      </div>
      {isModalOpen && (
        <FilterModal
          onClose={() => setIsModalOpen(false)}
          onFilterApply={onFilterApply}
        />
      )}
    </nav>
  );
}
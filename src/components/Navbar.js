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
    <nav className="bg-primary-500 text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
      <div className="flex items-center">
        <button
          aria-label="Open filters"
          className="md:hidden text-2xl p-2 hover:bg-primary-600 rounded transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          ☰
        </button>
        <span className="ml-2 text-xl font-bold tracking-wide">Travel App</span>
      </div>
      <div className="flex items-center space-x-4 sm:space-x-6">
        <button
          className="hidden md:block hover:text-primary-400 transition-colors font-medium"
          onClick={() => setIsModalOpen(true)}
        >
          Filters
        </button>
        <div className="hidden md:flex space-x-4 sm:space-x-6">
          <button
            className="hover:text-primary-400 transition-colors font-medium"
            onClick={() => handleFeatureClick("Favorites")}
          >
            Favorites
          </button>
          <button
            className="hover:text-primary-400 transition-colors font-medium"
            onClick={() => handleFeatureClick("Cart")}
          >
            Cart
          </button>
          <button
            className="hover:text-primary-400 transition-colors font-medium"
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
"use client";

import { useState } from "react";
import FilterModal from "./FilterModal";

export default function Navbar({ onFilterApply }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="bg-primary-500 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center">
        <button
          className="md:hidden text-2xl p-2 hover:bg-primary-600 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          ☰
        </button>
        <span className="ml-2 text-xl font-bold tracking-wide">Travel App</span>
      </div>
      <div className="flex items-center space-x-6">
        <button
          className="hidden md:block hover:text-primary-400 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          Filter
        </button>
        <div className="hidden md:flex space-x-6">
          <button className="hover:text-primary-400 transition-colors">
            Favorites
          </button>
          <button className="hover:text-primary-400 transition-colors">Cart</button>
          <button className="hover:text-primary-400 transition-colors">Login</button>
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
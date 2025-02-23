"use client";

import { useState } from "react";

export default function FilterModal({ onClose, onFilterApply }) {
  const [category, setCategory] = useState("Tours");
  const [selectedFilters, setSelectedFilters] = useState({});

  const categories = ["Tours", "Tickets", "Rent", "Transfer"];
  const filters = {
    Tours: [
      { name: "Location", options: ["PN Island", "Chalong Temple"] },
      { name: "Theme", options: ["Island Tour", "Land Tour", "Safari"] },
      { name: "Activity", options: ["Swimming", "Snorkelling"] },
    ],
    Tickets: [{ name: "Event", options: ["Concert", "Museum"] }],
    Rent: [{ name: "Type", options: ["Car", "Bike"] }],
    Transfer: [{ name: "Vehicle", options: ["Yacht", "Speedboat"] }],
  };

  const handleFilterChange = (filterName, option) => {
    setSelectedFilters((prev) => {
      const currentOptions = prev[filterName] || [];
      if (currentOptions.includes(option)) {
        return {
          ...prev,
          [filterName]: currentOptions.filter((opt) => opt !== option),
        };
      } else {
        return {
          ...prev,
          [filterName]: [...currentOptions, option],
        };
      }
    });
  };

  const handleSearch = () => {
    onFilterApply({ category, filters: selectedFilters });
    onClose();
  };

  const handleReset = () => {
    setSelectedFilters({});
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-md text-black max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold">Filters</h2>
          <button className="text-2xl hover:text-gray-600" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`p-2 rounded-md text-sm sm:text-base ${
                category === cat
                  ? "bg-primary-400 text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
              onClick={() => {
                setCategory(cat);
                setSelectedFilters({});
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        {filters[category].map((filter) => (
          <div key={filter.name} className="mb-4">
            <h3 className="font-semibold text-sm sm:text-base mb-2">{filter.name}</h3>
            <div className="space-y-2">
              {filter.options.map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4"
                    checked={selectedFilters[filter.name]?.includes(option) || false}
                    onChange={() => handleFilterChange(filter.name, option)}
                  />
                  <span className="text-sm sm:text-base">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-300 p-2 rounded text-black hover:bg-gray-400 text-sm sm:text-base"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className="bg-primary-500 p-2 rounded text-white hover:bg-primary-600 text-sm sm:text-base"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
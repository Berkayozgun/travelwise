"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FilterModal({ onClose, onFilterApply }) {
  const [category, setCategory] = useState("Tours");
  const [selectedFilters, setSelectedFilters] = useState({});

  const categories = ["Tours", "Tickets", "Rent", "Transfer"];
  const filters = {
    Tours: [
      { name: "Location", options: ["Rassada Pier", "Chalong", "Phuket Jungle", "Patong Beach"] },
      { name: "Theme", options: ["Island Tour", "Land Tour", "Safari", "Cruise"] },
      { name: "Activity", options: ["Snorkelling", "Swimming", "Elephant Care", "Sightseeing"] },
      { name: "Price", type: "range", min: 0, max: 3000 },
      { name: "StartTime", options: ["08:00", "12:00", "15:00", "17:00"] },
      { name: "GroupSize", options: ["Small (1-10)", "Medium (11-20)", "Large (21+)"] },
      { name: "Features", options: ["Transfer", "Vegetarian Food", "Halal Food", "Dinner"] },
    ],
    Tickets: [
      { name: "Event", options: ["Concert", "Museum"] },
      { name: "Price", type: "range", min: 0, max: 1000 },
      { name: "StartTime", options: ["18:00", "20:00"] },
      { name: "Features", options: ["Transfer"] },
    ],
    Rent: [
      { name: "Type", options: ["Bike", "Car"] },
      { name: "Price", type: "range", min: 0, max: 2000 },
      { name: "Features", options: ["Insurance", "GPS"] },
    ],
    Transfer: [
      { name: "Vehicle", options: ["Yacht", "Speedboat"] },
      { name: "Price", type: "range", min: 0, max: 5000 },
      { name: "StartTime", options: ["09:00", "14:00"] },
      { name: "Features", options: ["Refreshments", "Transfer"] },
    ],
  };

  const handleFilterChange = (filterName, option) => {
    setSelectedFilters((prev) => {
      const currentOptions = prev[filterName] || [];
      return {
        ...prev,
        [filterName]: currentOptions.includes(option)
          ? currentOptions.filter((opt) => opt !== option)
          : [...currentOptions, option],
      };
    });
  };

  const handlePriceChange = (filterName, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleSearch = () => {
    onFilterApply({ category, filters: selectedFilters });
    onClose();
  };

  const handleReset = () => {
    setSelectedFilters({});
    setCategory("Tours");
    onFilterApply({ category: "Tours", filters: {} });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-white p-6 rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl relative"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Filters</h2>
            <button className="text-gray-500 hover:text-gray-700 transition-colors text-2xl" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  category === cat
                    ? "bg-primary-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-primary-400 hover:text-white"
                }`}
                onClick={() => {
                  setCategory(cat);
                  setSelectedFilters({});
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {category && (
            <div className="space-y-6">
              {filters[category].map((filter) => (
                <div key={filter.name}>
                  <h3 className="font-medium text-gray-800 mb-3">{filter.name}</h3>
                  {filter.type === "range" ? (
                    <div className="space-y-2">
                      <input
                        type="range"
                        min={filter.min}
                        max={filter.max}
                        value={selectedFilters[filter.name] || filter.min}
                        onChange={(e) => handlePriceChange(filter.name, Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{filter.name === "Price" ? "THB " : ""}{selectedFilters[filter.name] || filter.min}</span>
                        <span>{filter.max}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {filter.options.map((option) => (
                        <label key={option} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-primary-500 border-gray-300 rounded focus:ring-primary-400 transition-colors"
                            checked={selectedFilters[filter.name]?.includes(option) || false}
                            onChange={() => handleFilterChange(filter.name, option)}
                          />
                          <span className="text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              onClick={handleReset}
            >
              Reset
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
              onClick={handleSearch}
            >
              Apply Filters
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
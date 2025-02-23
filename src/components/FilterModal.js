"use client";

import { useState } from "react";

export default function FilterModal({ onClose, onFilterApply }) {
  const [category, setCategory] = useState("Tours");
  const [selectedFilters, setSelectedFilters] = useState({});

  const categories = ["Tours", "Tickets", "Rent", "Transfer"];
  const filters = {
    Tours: [
      {
        name: "Location",
        options: ["Rassada Pier", "Chalong", "Phuket Jungle", "Patong Beach"],
      },
      {
        name: "Theme",
        options: ["Island Tour", "Land Tour", "Safari", "Cruise"],
      },
      {
        name: "Activity",
        options: ["Snorkelling", "Swimming", "Elephant Care", "Sightseeing"],
      },
      { name: "Price", type: "range", min: 0, max: 3000 },
      { name: "StartTime", options: ["08:00", "12:00", "15:00", "17:00"] },
      {
        name: "GroupSize",
        options: ["Small (1-10)", "Medium (11-20)", "Large (21+)"],
      },
      {
        name: "Features",
        options: ["Transfer", "Vegetarian Food", "Halal Food", "Dinner"],
      },
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
    setCategory(null);
    onFilterApply({ category: null, filters: {} });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
      onClick={handleBackdropClick}
    >
      <div className='bg-white p-6 rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto shadow-xl'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-bold text-gray-800'>Filters</h2>
          <button
            className='text-2xl text-gray-600 hover:text-gray-800 transition-colors'
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className='mb-6 flex flex-wrap gap-2'>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-primary-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-primary-400 hover:text-white"
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
        {category &&
          filters[category].map((filter) => (
            <div key={filter.name} className='mb-4'>
              <h3 className='font-semibold text-gray-700 mb-2'>
                {filter.name}
              </h3>
              {filter.type === "range" ? (
                <div>
                  <input
                    type='range'
                    min={filter.min}
                    max={filter.max}
                    value={selectedFilters[filter.name] || filter.min}
                    onChange={(e) =>
                      handlePriceChange(filter.name, Number(e.target.value))
                    }
                    className='w-full accent-primary-500'
                  />
                  <span className='text-sm text-gray-600'>
                    {filter.name === "Price" ? "THB " : ""}
                    {selectedFilters[filter.name] || filter.min} - {filter.max}
                  </span>
                </div>
              ) : (
                <div className='space-y-2'>
                  {filter.options.map((option) => (
                    <label key={option} className='flex items-center'>
                      <input
                        type='checkbox'
                        className='mr-2 h-4 w-4 text-primary-500 focus:ring-primary-400'
                        checked={
                          selectedFilters[filter.name]?.includes(option) ||
                          false
                        }
                        onChange={() => handleFilterChange(filter.name, option)}
                      />
                      <span className='text-sm text-gray-700'>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        <div className='flex justify-between mt-6'>
          <button
            className='bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors'
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className='bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors'
            onClick={handleSearch}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import TourCard from "../components/TourCard";
import { Toaster } from "sonner";

const initialData = [
  {
    category: "Tours",
    title: "Phi Phi, Khai Islands Tour with Speedboat Full Day",
    location: "Rassada Pier",
    price: 1400,
    theme: "Island Tour",
    activity: "Snorkelling",
    startTime: "08:00",
    groupSize: "Medium (11-20)",
    features: ["Transfer"],
  },
  {
    category: "Tours",
    title: "Chalong Temple Land Tour",
    location: "Chalong",
    price: 900,
    theme: "Land Tour",
    activity: "Swimming",
    startTime: "12:00",
    groupSize: "Small (1-10)",
    features: ["Vegetarian Food"],
  },
  {
    category: "Tours",
    title: "Safari Adventure in Phuket",
    location: "Phuket Jungle",
    price: 2000,
    theme: "Safari",
    activity: "Elephant Care",
    startTime: "15:00",
    groupSize: "Large (21+)",
    features: ["Halal Food"],
  },
  {
    category: "Tours",
    title: "Sunset Cruise",
    location: "Patong Beach",
    price: 1800,
    theme: "Cruise",
    activity: "Sightseeing",
    startTime: "17:00",
    groupSize: "Medium (11-20)",
    features: ["Dinner"],
  },
  {
    category: "Tickets",
    title: "Phuket Cultural Concert",
    location: "Phuket Town",
    price: 500,
    event: "Concert",
    startTime: "18:00",
    features: ["Transfer"],
  },
  {
    category: "Tickets",
    title: "Historical Museum Entry",
    location: "Old Phuket",
    price: 300,
    event: "Museum",
    startTime: "20:00",
    features: [],
  },
  {
    category: "Rent",
    title: "Scooter Rental - Full Day",
    location: "Patong Beach",
    price: 400,
    type: "Bike",
    features: ["Insurance"],
  },
  {
    category: "Rent",
    title: "Car Rental - SUV",
    location: "Phuket Airport",
    price: 1200,
    type: "Car",
    features: ["GPS"],
  },
  {
    category: "Transfer",
    title: "Yacht Transfer to Phi Phi",
    location: "Rassada Pier",
    price: 3000,
    vehicle: "Yacht",
    startTime: "09:00",
    features: ["Refreshments"],
  },
  {
    category: "Transfer",
    title: "Speedboat Shuttle to Krabi",
    location: "Ao Nang",
    price: 1800,
    vehicle: "Speedboat",
    startTime: "14:00",
    features: ["Transfer"],
  },
];

export default function Home() {
  const [category, setCategory] = useState(null);
  const [filters, setFilters] = useState({});

  const filteredData = useMemo(() => {
    let result = category
      ? initialData.filter((item) => item.category === category)
      : initialData;

    if (Object.keys(filters).length > 0) {
      result = result.filter((item) =>
        Object.entries(filters).every(([key, value]) => {
          const normalizedKey = key.toLowerCase();
          if (!value || (Array.isArray(value) && value.length === 0))
            return true;

          if (normalizedKey === "price") {
            return item.price <= value;
          }

          if (Array.isArray(value) && value.length === 1) {
            return item[normalizedKey] === value[0];
          } else if (Array.isArray(value)) {
            return value.some((val) => item[normalizedKey]?.includes(val));
          }

          return item[normalizedKey] === value;
        })
      );
    }
    return result;
  }, [category, filters]);

  const handleFilterApply = ({ category, filters = {} }) => {
    setCategory(category);
    setFilters(filters);
  };

  const getHeaderText = () => {
    if (!category && Object.keys(filters).length === 0) {
      return "All Travel Options";
    }
    if (category && Object.keys(filters).length === 0) {
      return `${category} Options`;
    }
    return `Filtered ${category} Options`;
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100'>
      <Navbar onFilterApply={handleFilterApply} />

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='mb-10 text-center animate-fade-in'>
          <h1 className='text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight'>
            {getHeaderText()}
          </h1>
          <p className='text-lg text-gray-600'>
            {filteredData.length} result{filteredData.length !== 1 ? "s" : ""}{" "}
            found
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-300 ease-in-out'>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <div
                key={index}
                className='animate-fade-up'
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <TourCard tour={item} />
              </div>
            ))
          ) : (
            <p className='text-center col-span-full text-gray-500 text-xl font-medium animate-fade-in'>
              No results found. Try adjusting your filters!
            </p>
          )}
        </div>
      </main>

      <Toaster
        position='bottom-right'
        toastOptions={{
          style: {
            background: "rgba(255, 255, 255, 0.95)",
            color: "#1F2937",
            border: "2px solid #F78410",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
            padding: "14px 20px",
            borderRadius: "12px",
            fontWeight: "500",
            backdropFilter: "blur(5px)",
          },
          className: "custom-toast",
        }}
      />
    </div>
  );
}

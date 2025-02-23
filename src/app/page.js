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
          }
         
          else if (Array.isArray(value)) {
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
    <div className='min-h-screen bg-gray-50'>
      <Navbar onFilterApply={handleFilterApply} />
      <main className='max-w-7xl mx-auto p-4 sm:p-6 lg:p-8'>
        <div className='mb-6 text-center'>
          <h1 className='text-2xl font-bold text-gray-800 mb-2'>
            {getHeaderText()}
          </h1>
          <p className='text-gray-600'>
            {filteredData.length} result{filteredData.length !== 1 ? "s" : ""}{" "}
            found
          </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <TourCard key={index} tour={item} />
            ))
          ) : (
            <p className='text-center col-span-full text-gray-500 text-lg font-semibold'>
              No results found. Try adjusting your filters!
            </p>
          )}
        </div>
      </main>
      <Toaster
        position='bottom-right'
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "#1F2937",
            border: "2px solid #F78410",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 1)",
            padding: "12px 16px",
            borderRadius: "8px",
            fontWeight: "500",
          },
          className: "custom-toast",
        }}
      />
    </div>
  );
}

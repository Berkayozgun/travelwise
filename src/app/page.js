"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import TourCard from "../components/TourCard";

const initialData = [
  // Tours Kategorisi
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
  // Tickets Kategorisi
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
  // Rent Kategorisi
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
  // Transfer Kategorisi
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
  const [filteredData, setFilteredData] = useState(initialData);

  const handleFilterApply = ({ category, filters }) => {
    // Eğer filtreler boşsa ve kategori belirtilmemişse, tüm verileri döndür
    if (!filters || Object.keys(filters).length === 0) {
      setFilteredData(initialData);
      return;
    }

    let result = initialData.filter((item) => item.category === category);

    if (Object.keys(filters).length > 0) {
      result = result.filter((item) => {
        return Object.entries(filters).every(([key, value]) => {
          if (!value || (Array.isArray(value) && value.length === 0))
            return true;
          if (key === "Price") return item.price <= value;
          if (Array.isArray(value))
            return value.every((val) => item[key.toLowerCase()]?.includes(val));
          return item[key.toLowerCase()] === value;
        });
      });
    }

    setFilteredData(result);
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar onFilterApply={handleFilterApply} />
      <main className='max-w-7xl mx-auto p-4 sm:p-6 lg:p-8'>
        <div className='mb-4 text-center'>
          <p className='text-gray-700'>{filteredData.length} results found</p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <TourCard key={index} tour={item} />
            ))
          ) : (
            <p className='text-center col-span-full text-gray-500'>
              No results found.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

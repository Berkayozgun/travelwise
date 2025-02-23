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
    price: "THB 1,400",
    theme: "Island Tour",
    activity: "Snorkelling",
  },
  {
    category: "Tours",
    title: "Chalong Temple Land Tour",
    location: "Chalong",
    price: "THB 900",
    theme: "Land Tour",
    activity: "Swimming",
  },
  {
    category: "Tours",
    title: "Safari Adventure in Phuket",
    location: "Phuket Jungle",
    price: "THB 2,000",
    theme: "Safari",
    activity: "Elephant Care",
  },
  // Tickets Kategorisi
  {
    category: "Tickets",
    title: "Phuket Cultural Concert",
    location: "Phuket Town",
    price: "THB 500",
    event: "Concert",
  },
  {
    category: "Tickets",
    title: "Historical Museum Entry",
    location: "Old Phuket",
    price: "THB 300",
    event: "Museum",
  },
  // Rent Kategorisi
  {
    category: "Rent",
    title: "Scooter Rental - Full Day",
    location: "Patong Beach",
    price: "THB 400",
    type: "Bike",
  },
  {
    category: "Rent",
    title: "Car Rental - SUV",
    location: "Phuket Airport",
    price: "THB 1,200",
    type: "Car",
  },
  // Transfer Kategorisi
  {
    category: "Transfer",
    title: "Yacht Transfer to Phi Phi",
    location: "Rassada Pier",
    price: "THB 3,000",
    vehicle: "Yacht",
  },
  {
    category: "Transfer",
    title: "Speedboat Shuttle to Krabi",
    location: "Ao Nang",
    price: "THB 1,800",
    vehicle: "Speedboat",
  },
];

export default function Home() {
  const [filteredData, setFilteredData] = useState(initialData);

  const handleFilterApply = ({ category, filters }) => {
    let result = initialData.filter((item) => item.category === category);

    if (Object.keys(filters).length > 0) {
      result = result.filter((item) => {
        return Object.entries(filters).every(([key, values]) => {
          if (values.length === 0) return true;
          return values.includes(item[key.toLowerCase()]);
        });
      });
    }

    setFilteredData(result);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onFilterApply={handleFilterApply} />
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <TourCard key={index} tour={item} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No results found.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
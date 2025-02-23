export default function TourCard({ tour }) {
    return (
      <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow bg-white">
        <h3 className="font-bold text-sm sm:text-base md:text-lg line-clamp-2">
          {tour.title}
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm">{tour.location}</p>
        {tour.theme && (
          <p className="text-gray-500 text-xs sm:text-sm">Theme: {tour.theme}</p>
        )}
        {tour.activity && (
          <p className="text-gray-500 text-xs sm:text-sm">Activity: {tour.activity}</p>
        )}
        {tour.event && (
          <p className="text-gray-500 text-xs sm:text-sm">Event: {tour.event}</p>
        )}
        {tour.type && (
          <p className="text-gray-500 text-xs sm:text-sm">Type: {tour.type}</p>
        )}
        {tour.vehicle && (
          <p className="text-gray-500 text-xs sm:text-sm">Vehicle: {tour.vehicle}</p>
        )}
        <p className="text-primary-600 font-semibold text-sm sm:text-base md:text-lg mt-2">
          {tour.price}
        </p>
        <button className="bg-primary-500 text-white px-3 py-1 sm:px-4 sm:py-2 mt-3 rounded hover:bg-primary-600 transition-colors w-full sm:w-auto">
          Book Now
        </button>
      </div>
    );
  }
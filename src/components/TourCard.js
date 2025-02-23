export default function TourCard({ tour }) {
    return (
      <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 bg-white">
        <img
          src="/tour-placeholder.jpg"
          alt={tour.title}
          className="w-full h-32 object-cover rounded-t-lg mb-3"
        />
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
        {tour.startTime && (
          <p className="text-gray-500 text-xs sm:text-sm">Start: {tour.startTime}</p>
        )}
        {tour.groupSize && (
          <p className="text-gray-500 text-xs sm:text-sm">Group: {tour.groupSize}</p>
        )}
        {tour.features?.length > 0 && (
          <p className="text-gray-500 text-xs sm:text-sm">
            Features: {tour.features.join(", ")}
          </p>
        )}
        <p className="text-primary-600 font-semibold text-sm sm:text-base md:text-lg mt-2">
          THB {tour.price.toLocaleString()}
        </p>
        <button className="bg-primary-500 text-white px-3 py-1 sm:px-4 sm:py-2 mt-3 rounded hover:bg-primary-600 transition-colors w-full sm:w-auto">
          Book Now
        </button>
      </div>
    );
  }
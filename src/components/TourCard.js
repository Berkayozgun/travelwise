import Image from "next/image";
import { motion } from "framer-motion";
import { FiStar, FiClock, FiUsers, FiMapPin, FiShoppingCart } from "react-icons/fi";
import { toast } from "sonner";

export default function TourCard({ tour }) {
  const renderDetail = (icon, value, label) =>
    value ? (
      <div className="flex items-center gap-2 text-gray-600">
        {icon}
        <span className="text-xs sm:text-sm truncate">
          {value} {label && <span className="text-gray-400 ml-1">{label}</span>}
        </span>
      </div>
    ) : null;

  const categorySpecificDetail = () => {
    switch (tour.category) {
      case "Tours":
      case "Tickets":
      case "Transfer":
        return renderDetail(<FiClock className="w-4 h-4" />, tour.startTime);
      case "Rent":
        return null;
      default:
        return null;
    }
  };

  const handleBookNow = () => {
    toast.success("Booking is not yet available!", {
      description: "We're working on it. Check back soon!",
      duration: 3000,
      icon: "🛒",
    });
  };

  // Varsayılan değerler ile eksik verileri dolduruyoruz
  const defaultTour = {
    title: "Unnamed Tour",
    image: "https://www.gezgincift.com/wp-content/uploads/2016/06/koh-phi-phi-adasi-1920x1453.jpg",
    price: 0,
    features: [],
    isPopular: false,
    ...tour,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="tour-card group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 flex flex-col w-full max-w-[340px] mx-auto"
      style={{ minHeight: "450px", overflow: "hidden" }} // Mobil için daha esnek yükseklik
    >
      {/* Image Section - Sabit oran, responsive yükseklik */}
      <div className="relative h-40 sm:h-48 overflow-hidden flex-shrink-0">
        <Image
          src={defaultTour.image}
          alt={defaultTour.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        {defaultTour.isPopular && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-primary-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-md"
          >
            <FiStar className="w-3 h-3" />
            <span className="hidden sm:inline">Popular</span>
          </motion.div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow space-y-3 sm:space-y-4">
        {/* Title - Sabit yükseklik */}
        <h3 className="font-semibold text-gray-900 text-base sm:text-lg line-clamp-2 leading-tight h-10 sm:h-12 overflow-hidden">
          {defaultTour.title}
        </h3>

        {/* Details Section - Sabit yükseklik */}
        <div className="space-y-2 text-gray-600 h-16 sm:h-20 overflow-hidden">
          {renderDetail(<FiMapPin className="w-4 h-4" />, defaultTour.location)}
          {categorySpecificDetail()}
          {renderDetail(<FiUsers className="w-4 h-4" />, defaultTour.groupSize)}
        </div>

        {/* Features Section - Sabit yükseklik */}
        <div className="h-14 sm:h-16 overflow-hidden">
          {defaultTour.features.length > 0 ? (
            <div className="flex flex-wrap gap-1 sm:gap-2 pt-1 sm:pt-2">
              {defaultTour.features.map((feature) => (
                <motion.span
                  key={feature}
                  whileHover={{ scale: 1.05 }}
                  className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-primary-400/20 text-primary-500 rounded-full text-xs font-medium transition-colors hover:bg-primary-400/30 truncate"
                >
                  {feature}
                </motion.span>
              ))}
            </div>
          ) : (
            <div className="h-full" /> // Boşluk doldurucu
          )}
        </div>

        {/* Price and Button Section - Sabit konum */}
        <div className="mt-auto flex justify-between items-center pt-3 sm:pt-4 border-t border-gray-100">
          <div className="space-y-1">
            <div className="text-lg sm:text-xl font-bold text-primary-500">
              THB {defaultTour.price.toLocaleString()}
            </div>
            {defaultTour.originalPrice && (
              <div className="text-xs sm:text-sm text-gray-400 line-through">
                THB {defaultTour.originalPrice.toLocaleString()}
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary-500 text-white px-3 sm:px-5 py-2 rounded-lg flex items-center gap-1 sm:gap-2 hover:bg-primary-600 transition-colors shadow-md"
            onClick={handleBookNow}
          >
            <FiShoppingCart className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-medium hidden sm:inline">Book Now</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
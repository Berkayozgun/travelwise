import Image from "next/image";
import { motion } from "framer-motion";
import { FiStar, FiClock, FiUsers, FiMapPin, FiShoppingCart } from "react-icons/fi";
import { toast } from "sonner";

export default function TourCard({ tour }) {
  const renderDetail = (icon, value, label) =>
    value && (
      <div className="flex items-center gap-2 text-gray-600">
        {icon}
        <span className="text-sm">
          {value} {label && <span className="text-gray-400 ml-1">{label}</span>}
        </span>
      </div>
    );

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
      description: "We’re working on it. Check back soon!",
      duration: 3000,
      icon: "🛒",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 overflow-hidden"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={
            tour.image ||
            "https://www.gezgincift.com/wp-content/uploads/2016/06/koh-phi-phi-adasi-1920x1453.jpg"
          }
          alt={tour.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        {tour.isPopular && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="absolute top-3 left-3 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-md"
          >
            <FiStar className="w-3 h-3" />
            Popular
          </motion.div>
        )}
      </div>

      <div className="p-5 space-y-4">
        <h3 className="font-semibold text-gray-900 text-lg line-clamp-2 leading-tight">
          {tour.title}
        </h3>

        <div className="space-y-3 text-gray-600">
          {renderDetail(<FiMapPin className="w-4 h-4" />, tour.location)}
          {categorySpecificDetail()}
          {renderDetail(<FiUsers className="w-4 h-4" />, tour.groupSize)}
        </div>

        {tour.features?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {tour.features.map((feature) => (
              <motion.span
                key={feature}
                whileHover={{ scale: 1.05 }}
                className="px-2.5 py-1 bg-primary-400/20 text-primary-500 rounded-full text-xs font-medium transition-colors hover:bg-primary-400/30"
              >
                {feature}
              </motion.span>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="space-y-1">
            <div className="text-xl font-bold text-primary-500">
              THB {tour.price.toLocaleString()}
            </div>
            {tour.originalPrice && (
              <div className="text-sm text-gray-400 line-through">
                THB {tour.originalPrice.toLocaleString()}
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary-500 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-primary-600 transition-colors shadow-md"
            onClick={handleBookNow}
          >
            <FiShoppingCart className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Book Now</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
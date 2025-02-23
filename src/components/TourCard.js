import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiStar,
  FiClock,
  FiUsers,
  FiMapPin,
  FiShoppingCart,
} from "react-icons/fi";
import { toast } from "sonner";

export default function TourCard({ tour }) {
  const renderDetail = (icon, value, label) =>
    value && (
      <div className='flex items-center gap-2 text-gray-600'>
        {icon}
        <span className='text-sm'>
          {value} {label && <span className='text-gray-400 ml-1'>{label}</span>}
        </span>
      </div>
    );

  const categorySpecificDetail = () => {
    switch (tour.category) {
      case "Tours":
        return renderDetail(<FiClock className='w-4 h-4' />, tour.startTime);
      case "Tickets":
        return renderDetail(<FiClock className='w-4 h-4' />, tour.startTime);
      case "Transfer":
        return renderDetail(<FiClock className='w-4 h-4' />, tour.startTime);
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
      whileHover={{ y: -5 }}
      className='group bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 overflow-hidden'
    >
      <div className='relative aspect-video'>
        <Image
          src={
            tour.image ||
            "https://www.gezgincift.com/wp-content/uploads/2016/06/koh-phi-phi-adasi-1920x1453.jpg"
          }
          alt={tour.title}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          priority={false}
        />
        {tour.isPopular && (
          <div className='absolute top-2 left-2 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1'>
            <FiStar className='w-3 h-3' />
            Popular
          </div>
        )}
      </div>

      <div className='p-4 space-y-3'>
        <h3 className='font-semibold text-gray-800 text-lg line-clamp-2'>
          {tour.title}
        </h3>

        <div className='space-y-2'>
          {renderDetail(<FiMapPin className='w-4 h-4' />, tour.location)}
          {categorySpecificDetail()}
          {renderDetail(<FiUsers className='w-4 h-4' />, tour.groupSize)}
        </div>

        {tour.features?.length > 0 && (
          <div className='flex flex-wrap gap-2 pt-2'>
            {tour.features.map((feature) => (
              <span
                key={feature}
                className='px-2 py-1 bg-primary-400/10 text-primary-600 rounded-md text-xs font-medium'
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        <div className='flex justify-between items-center pt-3'>
          <div className='space-y-1'>
            <div className='text-lg font-bold text-primary-600'>
              THB {tour.price.toLocaleString()}
            </div>
            {tour.originalPrice && (
              <div className='text-sm text-gray-400 line-through'>
                THB {tour.originalPrice.toLocaleString()}
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-600 transition-colors'
            onClick={handleBookNow}
          >
            <FiShoppingCart className='w-4 h-4' />
            <span className='hidden sm:inline'>Book Now</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

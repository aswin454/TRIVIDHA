import { motion } from 'framer-motion';
import './WhatsAppButton.css';

export default function WhatsAppButton() {
  const phoneNumber = '917736687371';
  const message = encodeURIComponent("Hi Trividha! I'm browsing your website and would love to know more about your collection.");
  const waLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-wa"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 2 // Show after 2 seconds to not clutter the initial load
      }}
      aria-label="Contact us on WhatsApp"
    >
      <div className="wa-pulse" />
      <svg viewBox="0 0 24 24" fill="currentColor" className="wa-icon">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.522 5.858L0 24l6.343-1.499A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.815 9.815 0 0 1-5.006-1.371l-.36-.213-3.764.89.941-3.664-.233-.373A9.831 9.831 0 0 1 2.182 12C2.182 6.557 6.557 2.182 12 2.182S21.818 6.557 21.818 12 17.443 21.818 12 21.818z" />
      </svg>
      <span className="wa-tooltip">Enquire Now</span>
    </motion.a>
  );
}

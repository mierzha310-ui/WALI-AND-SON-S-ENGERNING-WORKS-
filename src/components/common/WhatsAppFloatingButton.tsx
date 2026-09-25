import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export interface WhatsAppFloatingButtonProps {
  customMessage?: string;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({ customMessage }) => {
  const { settings } = useShop();

  const handleWhatsAppClick = () => {
    const rawNumber = settings.whatsapp || settings.phone;
    // Strip non-numeric characters except +
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const defaultText = `Hello ${settings.businessName}, I would like to inquire about your engineering and fabrication services.`;
    const textToSend = encodeURIComponent(customMessage || defaultText);
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${textToSend}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      <button
        type="button"
        onClick={handleWhatsAppClick}
        className="flex items-center gap-2.5 px-4 py-3 bg-[#25D366] text-white hover:bg-[#20ba5a] active:scale-95 rounded-full shadow-2xl shadow-emerald-950/40 border border-emerald-400/40 transition-all duration-200 cursor-pointer"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-xs font-bold tracking-wide uppercase pr-1 hidden sm:inline-block">
          WhatsApp Us
        </span>
      </button>
    </div>
  );
};

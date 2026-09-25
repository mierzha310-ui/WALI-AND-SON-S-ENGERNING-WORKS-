import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ServicesSection } from '../../components/public/ServicesSection';
import { MessageCircle } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ServicesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const { settings } = useShop();

  const handleWhatsApp = () => {
    const rawNumber = settings.whatsapp || settings.phone;
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`Hello ${settings.businessName}, I would like to inquire about your engineering and fabrication services.`);
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-12 bg-[#0c0e12]">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#121620] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500 block mb-2">
              Capabilities Catalog
            </span>
            <h1 className="text-3xl sm:text-4xl font-black uppercase text-white font-heading tracking-tight mb-2">
              Industrial Engineering Services
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore our full suite of welding, heavy steel fabrication, architectural gates, rolling shutters, and lathe machinery repairs.
            </p>
          </div>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-lg cursor-pointer whitespace-nowrap self-start md:self-auto"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Consult on WhatsApp</span>
          </button>
        </div>
      </div>

      <ServicesSection initialCategory={initialCategory} showTitle={false} />
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, FileText, CheckCircle2, Flame, Hammer, Shield, PanelTop, Wrench, Boxes, Cog, Cpu } from 'lucide-react';
import { Service } from '../../types';
import { useShop } from '../../context/ShopContext';

interface ServiceCardProps {
  service: Service;
  onViewDetails: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onViewDetails }) => {
  const { settings } = useShop();

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rawNumber = settings.whatsapp || settings.phone;
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hello ${settings.businessName}, I am interested in your "${service.title}". Please provide more information and pricing details.`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-5 h-5 text-amber-400" />;
      case 'Hammer': return <Hammer className="w-5 h-5 text-amber-400" />;
      case 'Shield': return <Shield className="w-5 h-5 text-amber-400" />;
      case 'PanelTop': return <PanelTop className="w-5 h-5 text-amber-400" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-amber-400" />;
      case 'Boxes': return <Boxes className="w-5 h-5 text-amber-400" />;
      case 'Cog': return <Cog className="w-5 h-5 text-amber-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-amber-400" />;
      default: return <Hammer className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="flex flex-col bg-[#121620] border border-slate-800/90 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-200 group shadow-lg">
      {/* Service Image Banner with Fallback */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900 cursor-pointer" onClick={() => onViewDetails(service)}>
        <img
          src={service.image}
          alt={service.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={e => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121620] via-[#121620]/30 to-transparent" />
        
        {/* Category Unboxed Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-sm border border-slate-700/60 text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
          {getServiceIcon(service.icon)}
          <span>{service.category}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3
            className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-amber-400 transition-colors cursor-pointer mb-2.5 font-heading"
            onClick={() => onViewDetails(service)}
          >
            {service.title}
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
            {service.shortDescription}
          </p>

          {/* Capabilities quick preview */}
          {service.capabilities && service.capabilities.length > 0 && (
            <div className="space-y-1.5 mb-6">
              {service.capabilities.slice(0, 3).map((cap, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">{cap}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => onViewDetails(service)}
            className="text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="p-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 border border-emerald-500/30 rounded-lg transition-colors cursor-pointer"
              title={`Inquire about ${service.title} on WhatsApp`}
              aria-label={`Inquire about ${service.title} on WhatsApp`}
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </button>

            <Link
              to={`/quote?service=${encodeURIComponent(service.title)}`}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Get Quote</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

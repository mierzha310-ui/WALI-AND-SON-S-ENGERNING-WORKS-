import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Footer: React.FC = () => {
  const { settings, services } = useShop();

  const handleWhatsApp = () => {
    const rawNumber = settings.whatsapp || settings.phone;
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`Hello ${settings.businessName}, I would like to make an inquiry.`);
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-[#090b10] border-t border-slate-800/80 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-lg shadow-md shadow-amber-500/20 border border-amber-400/40">
                W
              </div>
              <div>
                <span className="block text-base font-black tracking-tight text-white uppercase font-heading leading-tight">
                  {settings.businessName.split('&')[0]} &amp; SON&apos;S
                </span>
                <span className="block text-[11px] font-semibold tracking-wider text-slate-400 uppercase leading-none">
                  Engineering Works
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {settings.description}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-md shadow-emerald-950/40 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Instant WhatsApp Chat</span>
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-amber-500" />
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-amber-400 transition-colors">
                  About Our Workshop
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Engineering Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Portfolio &amp; Case Studies
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Facility Gallery
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Client Feedback
                </Link>
              </li>
              <li>
                <Link to="/quote" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Request an Estimate
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Contact Workshop
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Engineering Capabilities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-amber-500" />
              Core Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs">
              {services.slice(0, 6).map(srv => (
                <li key={srv.id}>
                  <Link
                    to={`/services?category=${encodeURIComponent(srv.category)}`}
                    className="text-slate-400 hover:text-amber-400 transition-colors flex items-center justify-between"
                  >
                    <span>{srv.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Workshop Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-amber-500" />
              Workshop Details
            </h4>
            
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{settings.address}</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <a href={`tel:${settings.phone}`} className="hover:text-amber-400 transition-colors">
                {settings.phone}
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-amber-500 shrink-0" />
              <a href={`mailto:${settings.email}`} className="hover:text-amber-400 transition-colors">
                {settings.email}
              </a>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-slate-300 pt-1">
              <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{settings.openingHours}</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} {settings.businessName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-slate-500 text-[11px]">Industrial Metalworking &amp; Precision Fabrication</span>
            <span className="text-slate-700">|</span>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

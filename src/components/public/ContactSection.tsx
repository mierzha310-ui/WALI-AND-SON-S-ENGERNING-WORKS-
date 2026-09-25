import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Share2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ContactForm } from './ContactForm';

export const ContactSection: React.FC<{ showTitle?: boolean }> = ({ showTitle = true }) => {
  const { settings } = useShop();

  const handleWhatsApp = () => {
    const rawNumber = settings.whatsapp || settings.phone;
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`Hello ${settings.businessName}, I would like to visit or speak with your engineering team.`);
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 bg-[#0c0e12] text-slate-100" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
                Get In Touch
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-heading">
                Contact Our Workshop
              </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Visit our fabrication facility, talk directly with an experienced engineer, or send your technical inquiry below.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Workshop Details & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-xl bg-[#121620] border border-slate-800 space-y-5">
              <h3 className="text-base font-bold text-white uppercase tracking-tight font-heading pb-2 border-b border-slate-800">
                Workshop Headquarters
              </h3>

              <div className="flex items-start gap-3.5 text-xs text-slate-300">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white mb-0.5">Physical Facility:</strong>
                  <span className="leading-relaxed text-slate-400">{settings.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-slate-300">
                <Phone className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white mb-0.5">Telephone / Calling:</strong>
                  <a href={`tel:${settings.phone}`} className="text-amber-400 hover:underline">
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-slate-300">
                <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white mb-0.5">WhatsApp Priority Desk:</strong>
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="text-emerald-400 hover:underline cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>{settings.whatsapp}</span>
                    <span className="text-[10px] bg-emerald-950 px-1.5 py-0.5 rounded text-emerald-300 border border-emerald-800">
                      Chat Now
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-slate-300">
                <Mail className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white mb-0.5">Email Inquiries:</strong>
                  <a href={`mailto:${settings.email}`} className="text-slate-300 hover:text-white">
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-slate-300">
                <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white mb-0.5">Operating Hours:</strong>
                  <span className="text-slate-400 leading-relaxed">{settings.openingHours}</span>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="rounded-xl overflow-hidden border border-slate-800 h-64 bg-slate-900 shadow-inner">
              <iframe
                title="Workshop Location Map"
                src={settings.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-xl bg-[#121620] border border-slate-800 shadow-xl">
              <div className="mb-6">
                <h3 className="text-xl font-black text-white uppercase tracking-tight font-heading mb-1">
                  Send Technical Inquiry
                </h3>
                <p className="text-xs text-slate-400">
                  Fill in your details below and an experienced engineer will review your request.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

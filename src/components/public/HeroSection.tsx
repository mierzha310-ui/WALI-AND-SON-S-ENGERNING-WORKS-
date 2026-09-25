import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, FileText, CheckCircle2, Shield, Wrench, Award, Hammer } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const HeroSection: React.FC = () => {
  const { settings } = useShop();

  const handleWhatsAppClick = () => {
    const rawNumber = settings.whatsapp || settings.phone;
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`Hello ${settings.businessName}, I would like to get a quotation for an engineering project.`);
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const heroImageSrc = settings.hero.heroImage || '/src/assets/images/hero_welding_fabrication_1790345623126.jpg';

  const trustPoints = [
    { title: 'Quality Work', desc: 'ISO standard welds & certified steel grades' },
    { title: 'Experienced Team', desc: '28+ years master metallurgical expertise' },
    { title: 'Custom Solutions', desc: 'Precision fabrication tailored to CAD specs' },
    { title: 'Reliable Service', desc: 'Strict milestone delivery & on-site support' },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0a0d13] border-b border-slate-850">
      {/* Background Hero Image with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImageSrc}
          alt="Structural welding and metal fabrication workshop"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-[0.38] contrast-110"
          onError={e => {
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Gradients to guarantee high contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12] via-[#0c0e12]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0e12] via-[#0c0e12]/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          {/* Natural editorial badge */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Industrial Engineering &amp; Metal Fabrication Facility</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase font-heading leading-[1.08] text-balance mb-5">
            {settings.hero.title || "Wali & Son's Engineering Works"}
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl font-bold text-amber-400/90 tracking-tight mb-4">
            {settings.hero.subtitle || "Professional Engineering, Fabrication & Welding Solutions"}
          </p>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mb-8">
            {settings.hero.description ||
              "From structural steel fabrication and certified high-tensile welding to motorized rolling shutters, architectural gates, and industrial machinery overhauls—we deliver heavy-duty reliability for commercial and industrial infrastructure."}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 mb-14">
            <Link
              to="/services"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-xl shadow-amber-500/20 border border-amber-400/40 transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/quote"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 rounded-lg transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Get a Quote</span>
            </Link>

            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2.5 px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-lg shadow-emerald-950/30 border border-emerald-500/40 transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Us</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/90">
            {trustPoints.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { AboutSection } from '../../components/public/AboutSection';
import { StatsSection } from '../../components/public/StatsSection';
import { Target, Compass, Award, CheckCircle2, Shield, ArrowRight, MessageCircle } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ABOUT_WORKSHOP_IMAGE, HERO_IMAGE } from '../../services/storageService';

export const AboutPage: React.FC = () => {
  const { settings } = useShop();

  const handleWhatsApp = () => {
    const rawNumber = settings.whatsapp || settings.phone;
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`Hello ${settings.businessName}, I would like to schedule a workshop visit or technical consultation.`);
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-12 bg-[#0c0e12] text-slate-100">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#121620] border border-slate-800 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500 block mb-2">
              Established 1996 · Industrial Heritage
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase text-white font-heading tracking-tight mb-4">
              About Wali &amp; Son&apos;s Engineering Works
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Delivering high-tensile structural steel fabrication, certified industrial welding, custom architectural security metalwork, and mechanical lathe machining for over 28 years.
            </p>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden md:block">
            <img
              src={ABOUT_WORKSHOP_IMAGE}
              alt="Workshop Facility"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Narrative & Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white font-heading">
              Our Journey: From Specialized Tooling to Full-Scale Industrial Fabrication
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Wali &amp; Son&apos;s Engineering Works began as a modest mechanical lathe and repair shop dedicated to serving local industrial units. Through uncompromising commitment to metallurgy, dimensional precision, and dependable client relations, we expanded our capabilities into heavy structural steel, motorized security shutters, and custom industrial manufacturing.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              Today, our facility houses heavy hydraulic press brakes, profile shears, plasma cutting beds, and an array of MIG, TIG, and submerged arc welding machines. Our workforce consists of veteran master welders and seasoned mechanical engineers who understand that structural failure is never an option.
            </p>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-tight">Our Mission</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  To provide industrial and commercial clients with structurally unyielding, precision-engineered metal products that exceed regulatory standards and provide decades of reliable service.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-tight">Our Vision</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  To be the benchmark of excellence in regional metal fabrication and machinery overhauls, renowned for rapid turnaround, honest pricing, and metallurgical integrity.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl overflow-hidden border border-slate-800 shadow-xl bg-slate-900 h-64">
              <img
                src={HERO_IMAGE}
                alt="Precision Welding Craft"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2 flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                Workshop Technical Profile
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Total Workshop Space</span>
                  <span className="font-semibold text-white">18,000 sq ft</span>
                </li>
                <li className="flex items-center justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Overhead Crane Capacity</span>
                  <span className="font-semibold text-white">10 Metric Tons</span>
                </li>
                <li className="flex items-center justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Lathe Machining Length</span>
                  <span className="font-semibold text-white">Up to 24 Feet Beds</span>
                </li>
                <li className="flex items-center justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Welding Certifications</span>
                  <span className="font-semibold text-white">AWS D1.1 / ISO 9606</span>
                </li>
                <li className="flex items-center justify-between py-1">
                  <span className="text-slate-400">Plate Bending Capacity</span>
                  <span className="font-semibold text-white">Up to 16mm Mild Steel</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Stats Section */}
      <StatsSection />

      {/* Embedded Why Choose Us Section */}
      <AboutSection />

      {/* Action CTA */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#121620] to-[#171d2b] border border-amber-500/30 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-white font-heading tracking-tight mb-3">
            Have a Technical Blueprint or Structural Requirement?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed mb-6">
            Consult with our engineering team for on-site surveying, CAD drafting, and itemized material takeoffs.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-lg transition-all"
            >
              <span>Request Project Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-lg transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Direct WhatsApp Discussion</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

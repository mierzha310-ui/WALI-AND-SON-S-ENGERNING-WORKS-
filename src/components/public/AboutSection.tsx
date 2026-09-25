import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Users2,
  Clock,
  CircleDollarSign,
  Compass,
  ArrowRight,
  Hammer,
} from 'lucide-react';
import { ABOUT_WORKSHOP_IMAGE } from '../../services/storageService';

export const AboutSection: React.FC<{ showFullStory?: boolean }> = ({ showFullStory = false }) => {
  const whyChooseUsCards = [
    {
      title: 'Experienced Workers',
      desc: 'Master welders, lathe operators, and structural fitters with decades of certified industry experience.',
      icon: Users2,
    },
    {
      title: 'Quality Materials',
      desc: 'Tested prime steel, calibrated pipes, high-gauge sheet metal, and durable anti-corrosive epoxy coatings.',
      icon: ShieldCheck,
    },
    {
      title: 'Custom Designs',
      desc: 'Tailored fabrication from customer CAD drawings or on-site engineering dimension surveys.',
      icon: Compass,
    },
    {
      title: 'Reliable Service',
      desc: 'Sturdy structural integrity backed by quality control inspections and operational warranties.',
      icon: Hammer,
    },
    {
      title: 'Reasonable Pricing',
      desc: 'Transparent, competitive itemized estimates with no hidden fabrication surcharges.',
      icon: CircleDollarSign,
    },
    {
      title: 'On-Time Completion',
      desc: 'Rigid production schedules with proactive milestone tracking to meet client project deadlines.',
      icon: Clock,
    },
  ];

  return (
    <section className="py-20 bg-[#0c0e12] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
              Our Legacy &amp; Standards
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-heading">
              Engineering Built on Precision &amp; Integrity
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            Founded with a commitment to industrial-grade metallurgical excellence, Wali &amp; Son&apos;s Engineering Works has grown from a specialized tooling shop into a premier engineering and fabrication facility.
          </p>
        </div>

        {/* Narrative & Workshop Imagery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl font-black tracking-tight text-white uppercase font-heading">
              Comprehensive Workshop Facilities &amp; Master Craftsmanship
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              At Wali &amp; Son&apos;s, we handle everything from heavy structural steel trusses and industrial warehouses to intricate architectural security gates, motorized commercial shutters, and specialized machinery overhaul.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              Our workshop is equipped with heavy lathe machinery, hydraulic bending presses, plasma cutters, and certified multi-process welding gear. Every project is reviewed by experienced engineers to guarantee structural endurance under real-world loads.
            </p>

            {/* Core Values Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>AWS &amp; ISO Weld Standards</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Structural Deflection Proofing</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Mobile On-Site Installation</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Rapid Machinery Breakdown Support</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>Read Full Company Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
              <img
                src={ABOUT_WORKSHOP_IMAGE}
                alt="Wali & Son's Engineering Works Workshop Facility"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                onError={e => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider block">
                      Heavy Fabrication &amp; Machine Floor
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Overhead Gantry, Heavy Lathes &amp; Precision Assembly
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                    28+ YRS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Subsection */}
        <div className="pt-10 border-t border-slate-800/80">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500 block mb-2">
              Why Partner With Us
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white font-heading">
              Built To Last A Lifetime
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUsCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-[#12161f] border border-slate-800/80 hover:border-amber-500/40 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white uppercase tracking-tight mb-2">
                    {card.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

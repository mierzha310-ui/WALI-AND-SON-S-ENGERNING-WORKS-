import React from 'react';
import { ReviewsSection } from '../../components/public/ReviewsSection';

export const ReviewsPage: React.FC = () => {
  return (
    <div className="py-12 bg-[#0a0d13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#121620] border border-slate-800">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500 block mb-2">
            Reputation &amp; Trust
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase text-white font-heading tracking-tight mb-2">
            Client Testimonials &amp; Quality Feedback
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Real feedback from commercial developers, industrial unit managers, and residential property owners who entrust their fabrication to Wali &amp; Son&apos;s Engineering Works.
          </p>
        </div>
      </div>

      <ReviewsSection />
    </div>
  );
};

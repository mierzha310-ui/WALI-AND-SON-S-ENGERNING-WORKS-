import React from 'react';
import { ContactSection } from '../../components/public/ContactSection';

export const ContactPage: React.FC = () => {
  return (
    <div className="py-12 bg-[#0c0e12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#121620] border border-slate-800">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500 block mb-2">
            Reach Out To Our Engineers
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase text-white font-heading tracking-tight mb-2">
            Contact &amp; Location Details
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Whether you require an emergency on-site welding crew, a formal bill of materials quotation, or a workshop consultation, we are ready to assist.
          </p>
        </div>
      </div>

      <ContactSection showTitle={false} />
    </div>
  );
};

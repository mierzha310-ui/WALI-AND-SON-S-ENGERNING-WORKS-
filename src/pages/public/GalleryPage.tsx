import React from 'react';
import { GallerySection } from '../../components/public/GallerySection';

export const GalleryPage: React.FC = () => {
  return (
    <div className="py-12 bg-[#0c0e12]">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#121620] border border-slate-800">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500 block mb-2">
            Visual Documentation
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase text-white font-heading tracking-tight mb-2">
            Engineering Workshop &amp; Field Gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            High-resolution visual archives of certified welding operations, structural crane bays, precision lathe tooling, and finished architectural metal installations.
          </p>
        </div>
      </div>

      <GallerySection showTitle={false} />
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../../components/public/HeroSection';
import { StatsSection } from '../../components/public/StatsSection';
import { AboutSection } from '../../components/public/AboutSection';
import { ServicesSection } from '../../components/public/ServicesSection';
import { ProjectsSection } from '../../components/public/ProjectsSection';
import { GallerySection } from '../../components/public/GallerySection';
import { ReviewsSection } from '../../components/public/ReviewsSection';
import { ContactSection } from '../../components/public/ContactSection';
import { ArrowRight, Wrench, ShieldAlert } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      {/* 1. Powerful Industrial Hero */}
      <HeroSection />

      {/* 2. Configurable Business Statistics */}
      <StatsSection />

      {/* 3. About Company & Why Choose Us */}
      <AboutSection />

      {/* 4. Core Services (Limited on Home, with link to full) */}
      <div>
        <ServicesSection limit={6} />
        <div className="bg-[#0c0e12] pb-16 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-bold uppercase tracking-wider text-amber-400 border border-slate-800 transition-colors"
          >
            <span>View All Engineering Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 5. Projects Portfolio */}
      <div>
        <ProjectsSection limit={3} />
        <div className="bg-[#0a0d13] pb-16 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-bold uppercase tracking-wider text-amber-400 border border-slate-800 transition-colors"
          >
            <span>View Complete Project Portfolio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 6. Facility & Workshop Gallery */}
      <div>
        <GallerySection limit={6} />
        <div className="bg-[#0c0e12] pb-16 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-bold uppercase tracking-wider text-amber-400 border border-slate-800 transition-colors"
          >
            <span>Explore Full Photo Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 7. Client Reviews & Sample Data Transparency */}
      <ReviewsSection />

      {/* 8. Workshop Location & Contact Form */}
      <ContactSection />
    </div>
  );
};

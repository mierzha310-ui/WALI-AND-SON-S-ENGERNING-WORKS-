import React, { useState, useMemo } from 'react';
import { Search, Filter, Layers } from 'lucide-react';
import { Service } from '../../types';
import { useShop } from '../../context/ShopContext';
import { ServiceCard } from './ServiceCard';
import { ServiceDetailModal } from './ServiceDetailModal';
import { EmptyState } from '../common/EmptyState';

interface ServicesSectionProps {
  limit?: number;
  initialCategory?: string;
  showTitle?: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  limit,
  initialCategory = 'All',
  showTitle = true,
}) => {
  const { activeServices } = useShop();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    activeServices.forEach(s => set.add(s.category));
    return ['All', ...Array.from(set)];
  }, [activeServices]);

  // Filtered services list
  const filteredServices = useMemo(() => {
    return activeServices.filter(s => {
      const matchCat = selectedCategory === 'All' || s.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeServices, selectedCategory, searchQuery]);

  const displayedServices = limit ? filteredServices.slice(0, limit) : filteredServices;

  return (
    <section className="py-20 bg-[#0c0e12] text-slate-100" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
                Specialized Solutions
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-heading">
                Engineering &amp; Fabrication Services
              </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Industrial grade metallurgical solutions built to exact specifications, backed by certified welders and heavy fabrication equipment.
            </p>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
          {/* Category Tabs (Segmented Buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search services (e.g. welding, gates)..."
              className="w-full bg-[#121620] border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Services Grid or Empty State */}
        {displayedServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedServices.map(service => (
              <ServiceCard
                key={service.id}
                service={service}
                onViewDetails={srv => setSelectedService(srv)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Services Found"
            description={
              searchQuery
                ? `No engineering services matched your search "${searchQuery}". Try selecting another category or clear search filter.`
                : 'There are currently no active services listed under this category.'
            }
            actionText="Reset Filters"
            onAction={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
          />
        )}

        {/* Service Details Modal */}
        <ServiceDetailModal
          service={selectedService}
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
        />
      </div>
    </section>
  );
};

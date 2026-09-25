import React, { useState, useMemo } from 'react';
import { Search, ZoomIn } from 'lucide-react';
import { GalleryItem } from '../../types';
import { useShop } from '../../context/ShopContext';
import { ImageViewer, LightboxImage } from '../common/ImageViewer';
import { EmptyState } from '../common/EmptyState';

export const GallerySection: React.FC<{ limit?: number; showTitle?: boolean }> = ({
  limit,
  showTitle = true,
}) => {
  const { gallery } = useShop();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = useMemo(() => {
    const set = new Set<string>();
    gallery.forEach(item => set.add(item.category));
    return ['All', ...Array.from(set)];
  }, [gallery]);

  const filteredItems = useMemo(() => {
    return gallery.filter(item => {
      const matchCat = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [gallery, selectedCategory, searchQuery]);

  const displayedItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const lightboxImages: LightboxImage[] = useMemo(() => {
    return displayedItems.map(item => ({
      src: item.image,
      title: item.title,
      category: item.category,
      description: item.description,
    }));
  }, [displayedItems]);

  const openLightboxAt = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="py-20 bg-[#0c0e12] text-slate-100" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
                Workshop &amp; On-Site Photography
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-heading">
                Engineering Works Gallery
              </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Visual glimpses of structural steel fabrication, high-precision machining, custom gates, and industrial welding at our facility.
            </p>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
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

          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search gallery..."
              className="w-full bg-[#121620] border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        {displayedItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightboxAt(index)}
                className="group relative h-72 rounded-xl overflow-hidden border border-slate-800 bg-[#10141d] cursor-pointer shadow-lg hover:border-amber-500/50 transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                  }}
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm border border-slate-700/60 text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                  {item.category}
                </div>

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-slate-700/60 flex items-center justify-center text-slate-300 group-hover:text-amber-400 transition-colors">
                  <ZoomIn className="w-4 h-4" />
                </div>

                {/* Caption bottom */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-tight font-heading mb-1 group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Gallery Images Found"
            description="No workshop or project images match your filter criteria."
            actionText="Reset Filter"
            onAction={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
          />
        )}

        {/* Fullscreen Lightbox Viewer */}
        <ImageViewer
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          images={lightboxImages}
          currentIndex={currentImageIndex}
          onIndexChange={setCurrentImageIndex}
        />
      </div>
    </section>
  );
};

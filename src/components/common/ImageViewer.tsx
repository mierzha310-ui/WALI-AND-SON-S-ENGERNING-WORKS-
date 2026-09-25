import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export interface LightboxImage {
  src: string;
  title: string;
  category?: string;
  description?: string;
}

export interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  images: LightboxImage[];
  currentIndex: number;
  onIndexChange: (newIndex: number) => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
}) => {
  const currentImage = images[currentIndex] || null;

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return;
    onIndexChange(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
  }, [currentIndex, images.length, onIndexChange]);

  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    onIndexChange(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
  }, [currentIndex, images.length, onIndexChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md select-none animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      {/* Top action bar */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-between p-4 z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div className="text-slate-300 text-xs font-medium">
          {images.length > 1 && (
            <span>
              {currentIndex + 1} / {images.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close full screen image"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Prev / Next controls */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/80 border border-slate-700/60 text-white rounded-full transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/80 border border-slate-700/60 text-white rounded-full transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Main Image Stage */}
      <div className="flex flex-col items-center justify-center max-w-6xl max-h-[85vh] p-4 z-10 w-full">
        <div className="relative max-w-full max-h-[72vh] flex items-center justify-center overflow-hidden rounded-lg border border-slate-800 bg-[#07090d]">
          <img
            src={currentImage.src}
            alt={currentImage.title}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[72vh] object-contain transition-transform duration-200"
            onError={e => {
              // Zero broken image fallback
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center max-w-2xl px-4">
          <h4 className="text-base font-bold text-white tracking-tight">{currentImage.title}</h4>
          {currentImage.description && (
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{currentImage.description}</p>
          )}
          {currentImage.category && (
            <div className="flex items-center justify-center gap-2 text-xs text-amber-400 mt-1">
              <span>{currentImage.category}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

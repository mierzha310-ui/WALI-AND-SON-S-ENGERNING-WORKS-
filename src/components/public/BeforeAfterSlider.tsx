import React, { useState, useRef, useCallback } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before Work',
  afterLabel = 'Finished Result',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-80 sm:h-96 overflow-hidden rounded-xl border border-slate-800 select-none cursor-ew-resize bg-slate-950"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Background layer) */}
      <img
        src={afterImage}
        alt={afterLabel}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover"
        onError={e => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-amber-400 border border-amber-500/30 text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
        {afterLabel}
      </div>

      {/* Before Image (Clipped layer) */}
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          referrerPolicy="no-referrer"
          className="absolute inset-y-0 left-0 w-full h-full object-cover max-w-none"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
          onError={e => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-slate-300 border border-slate-700 text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
          {beforeLabel}
        </div>
      </div>

      {/* Center Divider Line & Handle */}
      <div
        className="absolute inset-y-0 w-0.5 bg-amber-400 pointer-events-none shadow-[0_0_10px_rgba(245,158,11,0.8)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-500 border-2 border-slate-950 flex items-center justify-center text-slate-950 shadow-xl cursor-ew-resize">
          <div className="flex gap-0.5">
            <span className="w-0.5 h-3 bg-slate-950 rounded-full" />
            <span className="w-0.5 h-3 bg-slate-950 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

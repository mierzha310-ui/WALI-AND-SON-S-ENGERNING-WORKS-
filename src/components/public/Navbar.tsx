import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, MessageCircle, FileText } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ThemeToggle } from '../common/ThemeToggle';

export const Navbar: React.FC = () => {
  const { settings } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleWhatsAppClick = () => {
    const rawNumber = settings.whatsapp || settings.phone;
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`Hello ${settings.businessName}, I would like to inquire about your engineering services.`);
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#0a0d13]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40'
          : 'bg-[#0c0e12]/90 backdrop-blur-sm border-b border-slate-900/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Single element brand wordmark */}
          <Link
            to="/"
            className="flex items-center gap-3 text-left group focus:outline-none"
            aria-label="Wali & Son's Engineering Works - Home"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center text-lg shadow-md shadow-amber-500/20 border border-amber-400/40 group-hover:bg-amber-400 transition-colors">
              W
            </div>
            <div>
              <span className="block text-base sm:text-lg font-black tracking-tight text-white uppercase group-hover:text-amber-400 transition-colors leading-tight font-heading">
                {settings.businessName.split('&')[0]} &amp; SON&apos;S
              </span>
              <span className="block text-[11px] font-semibold tracking-wider text-slate-400 uppercase leading-none">
                Engineering Works
              </span>
            </div>
          </Link>

          {/* Zone 2: 4-7 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors py-1 ${
                    isActive
                      ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />

            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-emerald-400 hover:text-white hover:bg-emerald-600/20 border border-emerald-500/40 rounded-lg transition-colors cursor-pointer"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp</span>
            </button>

            <Link
              to="/quote"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 active:bg-amber-500 rounded-lg shadow-md shadow-amber-500/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-4 h-4" />
              <span>Get a Quote</span>
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="p-2.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg focus:outline-none cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#0d1017] px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-1.5 mb-5">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-400 font-semibold border-l-2 border-amber-400'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5 pt-2 border-t border-slate-800/80">
            <Link
              to="/quote"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Request a Quote</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppClick();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 rounded-lg hover:bg-emerald-900/30 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Direct WhatsApp Contact</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

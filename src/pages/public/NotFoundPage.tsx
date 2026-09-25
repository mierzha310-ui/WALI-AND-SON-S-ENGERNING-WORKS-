import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Home, ArrowLeft, Wrench } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-[#0c0e12] text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto shadow-xl">
          <Wrench className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block mb-2">
            Error 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase text-white font-heading tracking-tight mb-2">
            Blueprint Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            The page or document you requested does not exist in our workshop directory or has been relocated.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Link to="/">
            <Button variant="primary" leftIcon={<Home className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>
          <Link to="/services">
            <Button variant="outline">
              View Services
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

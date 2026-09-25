import React from 'react';
import { QuoteForm } from '../../components/public/QuoteForm';

export const QuotePage: React.FC = () => {
  return (
    <div className="py-12 bg-[#0a0d13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuoteForm />
      </div>
    </div>
  );
};

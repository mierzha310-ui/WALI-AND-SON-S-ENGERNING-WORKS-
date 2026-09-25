import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Service } from '../../types';
import { CheckCircle2, MessageCircle, FileText, Calendar, Clock, Wrench } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

interface ServiceDetailModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
}) => {
  const { settings } = useShop();
  if (!service) return null;

  const handleWhatsApp = () => {
    const rawNumber = settings.whatsapp || settings.phone;
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hello ${settings.businessName}, I would like more information and a quote for "${service.title}".`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={service.title}
      subtitle={`Category: ${service.category}`}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Visual Header Image */}
        <div className="relative h-60 w-full rounded-lg overflow-hidden border border-slate-800 bg-slate-900">
          <img
            src={service.image}
            alt={service.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={e => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
            <span className="font-semibold uppercase tracking-wider text-amber-400">
              {service.category} Fabrication &amp; Engineering
            </span>
            {service.featured && (
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded text-[11px] font-bold">
                Featured Specialty
              </span>
            )}
          </div>
        </div>

        {/* Overview */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Scope &amp; Engineering Specifications
          </h4>
          <p className="text-sm text-slate-200 leading-relaxed">
            {service.description || service.shortDescription}
          </p>
        </div>

        {/* Technical Capabilities List */}
        {service.capabilities && service.capabilities.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Technical Capabilities &amp; Standards
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.capabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quality Guarantee Box */}
        <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs text-amber-300 leading-relaxed">
          <strong className="block font-bold mb-1 text-amber-400">
            Quality Assurance &amp; Warranty:
          </strong>
          Every fabrication job undergoes structural alignment verification, weld penetration testing, and surface anti-rust preparation before delivery or on-site erection.
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Link
            to={`/quote?service=${encodeURIComponent(service.title)}`}
            onClick={onClose}
            className="w-full sm:w-1/2 flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-md transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Request Quotation</span>
          </Link>

          <Button
            type="button"
            variant="whatsapp"
            onClick={handleWhatsApp}
            fullWidth
            leftIcon={<MessageCircle className="w-4 h-4 fill-current" />}
            className="sm:w-1/2"
          >
            WhatsApp Inquiry
          </Button>
        </div>
      </div>
    </Modal>
  );
};

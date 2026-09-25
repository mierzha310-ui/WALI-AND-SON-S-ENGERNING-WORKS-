import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { Select } from '../common/Select';
import { useShop } from '../../context/ShopContext';
import {
  FileText,
  CheckCircle2,
  Upload,
  AlertCircle,
  MessageCircle,
  Info,
} from 'lucide-react';

export const QuoteForm: React.FC = () => {
  const { services, settings, submitInquiry } = useShop();
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    service: preselectedService || (services[0]?.title ?? 'Certified Welding Works'),
    description: '',
    quantity: '',
    preferredDate: '',
    budget: '',
    notes: '',
  });

  const [attachmentName, setAttachmentName] = useState<string>('');
  const [attachmentDataUrl, setAttachmentDataUrl] = useState<string>('');
  const [fileError, setFileError] = useState<string>('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit for LocalStorage (~500KB cap)
    if (file.size > 500 * 1024) {
      setFileError('File exceeds 500KB limit for local storage. For larger technical CAD files or blueprints, you can send them directly to our WhatsApp after submitting.');
      return;
    }

    setAttachmentName(file.name);
    const reader = new FileReader();
    reader.onload = event => {
      setAttachmentDataUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Customer name is required';
    if (!formData.phone.trim()) errs.phone = 'Contact phone number is required';
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email';
    }
    if (!formData.service) errs.service = 'Please select an engineering service';
    if (!formData.description.trim()) errs.description = 'Please detail your project specifications';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const created = submitInquiry({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        whatsapp: formData.whatsapp.trim() || formData.phone.trim(),
        email: formData.email.trim() || undefined,
        service: formData.service,
        description: formData.description.trim(),
        quantity: formData.quantity.trim() || undefined,
        preferredDate: formData.preferredDate || undefined,
        budget: formData.budget.trim() || undefined,
        notes: formData.notes.trim() || undefined,
        attachmentName: attachmentName || undefined,
        attachmentDataUrl: attachmentDataUrl || undefined,
        status: 'New',
      });

      setSubmittedInquiryId(created.id);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 450);
  };

  const handleForwardToWhatsApp = () => {
    const rawNumber = settings.whatsapp || settings.phone;
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hello ${settings.businessName},\nI have submitted an online quotation request (Ref: ${submittedInquiryId}).\nName: ${formData.name}\nService: ${formData.service}\nDetails: ${formData.description}\nQuantity: ${formData.quantity || 'N/A'}`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const serviceOptions = services.map(s => ({
    value: s.title,
    label: s.title,
  }));

  const budgetOptions = [
    { value: '', label: 'Select estimated budget tier (Optional)' },
    { value: 'Under PKR 100,000', label: 'Under PKR 100,000 (Small Repair/Gates)' },
    { value: 'PKR 100,000 - 300,000', label: 'PKR 100,000 - 300,000 (Standard Fabrication)' },
    { value: 'PKR 300,000 - 1,000,000', label: 'PKR 300,000 - 1,000,000 (Commercial/Motorized)' },
    { value: 'PKR 1,000,000+', label: 'PKR 1,000,000+ (Heavy Structural / Warehouse)' },
    { value: 'Quote Required', label: 'Formal Quotation Required' },
  ];

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-[#121620] border border-emerald-500/40 shadow-2xl text-center animate-in fade-in duration-300">
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs font-mono font-bold text-amber-400 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20 inline-block mb-3">
          REF: {submittedInquiryId}
        </span>

        <h3 className="text-2xl font-black text-white uppercase tracking-tight font-heading mb-2">
          Quotation Request Logged!
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto mb-6">
          Thank you <strong className="text-white">{formData.name}</strong>. Your inquiry for <strong className="text-amber-400">{formData.service}</strong> has been saved. Our technical estimator will review your dimensions and get in touch with you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            type="button"
            variant="whatsapp"
            onClick={handleForwardToWhatsApp}
            leftIcon={<MessageCircle className="w-4 h-4 fill-current" />}
          >
            Forward Specs to WhatsApp
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: '',
                phone: '',
                whatsapp: '',
                email: '',
                service: services[0]?.title ?? 'Certified Welding Works',
                description: '',
                quantity: '',
                preferredDate: '',
                budget: '',
                notes: '',
              });
              setAttachmentName('');
              setAttachmentDataUrl('');
            }}
          >
            Submit Another Quote
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-[#121620] border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
      <div className="mb-8 pb-6 border-b border-slate-800">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-500 block mb-1">
          Formal Engineering Estimate
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-heading">
          Request a Quotation &amp; Feasibility
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Provide your project dimensions, metal grade requirements, or machinery details for an itemized estimate.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Customer Contact Info */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            1. Customer &amp; Contact Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name / Company Name"
              required
              placeholder="e.g. Asad Ullah (Al-Rehman Builders)"
              value={formData.name}
              onChange={e => {
                setFormData(prev => ({ ...prev, name: e.target.value }));
                if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
              }}
              error={errors.name}
            />

            <Input
              label="Primary Phone Number"
              required
              type="tel"
              placeholder="e.g. +92 300 9876543"
              value={formData.phone}
              onChange={e => {
                setFormData(prev => ({ ...prev, phone: e.target.value }));
                if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
              }}
              error={errors.phone}
            />

            <Input
              label="WhatsApp Number (Optional)"
              type="tel"
              placeholder="If different from phone number"
              value={formData.whatsapp}
              onChange={e => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
            />

            <Input
              label="Email Address (Optional)"
              type="email"
              placeholder="asad@example.com"
              value={formData.email}
              onChange={e => {
                setFormData(prev => ({ ...prev, email: e.target.value }));
                if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
              }}
              error={errors.email}
            />
          </div>
        </div>

        {/* Section 2: Project Specifications */}
        <div className="pt-4 border-t border-slate-800/80">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            2. Engineering Requirements
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Select
              label="Selected Engineering Service"
              required
              options={serviceOptions}
              value={formData.service}
              onChange={e => {
                setFormData(prev => ({ ...prev, service: e.target.value }));
                if (errors.service) setErrors(prev => ({ ...prev, service: '' }));
              }}
              error={errors.service}
            />

            <Input
              label="Estimated Quantity / Dimensions"
              placeholder="e.g. 2 sets / 20x10 ft / 1500 sq ft"
              value={formData.quantity}
              onChange={e => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
            />

            <Input
              label="Preferred Completion Date"
              type="date"
              value={formData.preferredDate}
              onChange={e => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
            />

            <Select
              label="Estimated Budget Tier"
              options={budgetOptions}
              value={formData.budget}
              onChange={e => setFormData(prev => ({ ...prev, budget: e.target.value }))}
            />
          </div>

          <Textarea
            label="Detailed Project Description"
            required
            rows={4}
            placeholder="Specify steel grade (e.g. MS, SS304), thickness, whether drawing blueprints exist, site address for on-site welding, etc."
            value={formData.description}
            onChange={e => {
              setFormData(prev => ({ ...prev, description: e.target.value }));
              if (errors.description) setErrors(prev => ({ ...prev, description: '' }));
            }}
            error={errors.description}
          />
        </div>

        {/* Section 3: File Attachment & LocalStorage Notice */}
        <div className="pt-4 border-t border-slate-800/80">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            3. Blueprints / Reference Image (Optional)
          </h3>

          <div className="p-4 rounded-xl border border-dashed border-slate-800 bg-slate-900/50 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-lg cursor-pointer transition-colors border border-slate-700">
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Choose Reference File</span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {attachmentName && (
                <span className="text-xs text-amber-400 font-medium truncate max-w-xs">
                  Attached: {attachmentName}
                </span>
              )}
            </div>

            {fileError && (
              <p className="text-xs text-rose-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{fileError}</span>
              </p>
            )}

            {/* Crucial LocalStorage limitation disclosure required by prompt */}
            <div className="flex items-start gap-2 text-[11px] text-slate-400 pt-1">
              <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p>
                <strong>Architecture Notice:</strong> Since this version uses client-side LocalStorage, attached images are restricted to small preview sizes (≤ 500KB). For high-res architectural blueprints, heavy CAD DWG, or PDF packets, please send them directly via WhatsApp after submitting.
              </p>
            </div>
          </div>
        </div>

        <Textarea
          label="Additional Notes / Special Instructions (Optional)"
          rows={2}
          placeholder="e.g. Site requires evening hoisting; emergency turnaround needed..."
          value={formData.notes}
          onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
        />

        <div className="pt-4 flex items-center justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            leftIcon={<FileText className="w-5 h-5" />}
          >
            Submit Quotation Request
          </Button>
        </div>
      </form>
    </div>
  );
};

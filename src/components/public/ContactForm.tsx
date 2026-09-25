import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { Select } from '../common/Select';
import { useShop } from '../../context/ShopContext';
import { Send, CheckCircle2 } from 'lucide-react';

interface ContactFormProps {
  defaultService?: string;
  onSuccess?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ defaultService = '', onSuccess }) => {
  const { services, submitInquiry } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: defaultService || (services[0]?.title ?? 'General Engineering'),
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+() -]{7,20}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please provide a valid phone number';
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!formData.service) {
      newErrors.service = 'Please select an engineering service';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide your message or project requirements';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      submitInquiry({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        service: formData.service,
        description: formData.message.trim(),
        status: 'New',
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onSuccess) onSuccess();
    }, 400);
  };

  if (isSubmitted) {
    return (
      <div className="p-8 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-center animate-in fade-in duration-200">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Message Dispatched!</h3>
        <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed mb-6">
          Thank you for reaching out to Wali &amp; Son&apos;s Engineering Works. Our technical estimators will contact your phone number promptly.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: '',
              phone: '',
              email: '',
              service: services[0]?.title ?? 'General Engineering',
              message: '',
            });
          }}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  const serviceOptions = services.map(s => ({
    value: s.title,
    label: s.title,
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          required
          placeholder="e.g. Tariq Mehmood"
          value={formData.name}
          onChange={e => {
            setFormData(prev => ({ ...prev, name: e.target.value }));
            if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
          }}
          error={errors.name}
        />

        <Input
          label="Phone Number"
          required
          type="tel"
          placeholder="e.g. +92 300 1234567"
          value={formData.phone}
          onChange={e => {
            setFormData(prev => ({ ...prev, phone: e.target.value }));
            if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
          }}
          error={errors.phone}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Email Address (Optional)"
          type="email"
          placeholder="tariq@example.com"
          value={formData.email}
          onChange={e => {
            setFormData(prev => ({ ...prev, email: e.target.value }));
            if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
          }}
          error={errors.email}
        />

        <Select
          label="Required Engineering Service"
          required
          options={serviceOptions}
          value={formData.service}
          onChange={e => {
            setFormData(prev => ({ ...prev, service: e.target.value }));
            if (errors.service) setErrors(prev => ({ ...prev, service: '' }));
          }}
          error={errors.service}
        />
      </div>

      <Textarea
        label="Message / Project Requirements"
        required
        rows={4}
        placeholder="Briefly describe dimensions, material type, or machinery issues requiring attention..."
        value={formData.message}
        onChange={e => {
          setFormData(prev => ({ ...prev, message: e.target.value }));
          if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
        }}
        error={errors.message}
      />

      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isSubmitting}
        leftIcon={<Send className="w-4 h-4" />}
      >
        Send Inquiry
      </Button>
    </form>
  );
};

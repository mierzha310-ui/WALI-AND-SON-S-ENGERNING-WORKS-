import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Textarea } from '../../components/common/Textarea';
import { Select } from '../../components/common/Select';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { Modal } from '../../components/common/Modal';
import {
  Save,
  Download,
  Upload,
  RotateCcw,
  Trash2,
  Building,
  Share2,
  MapPin,
  BarChart3,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';
import { HERO_IMAGE, ABOUT_WORKSHOP_IMAGE, GATES_GRILLS_IMAGE, MACHINERY_REPAIR_IMAGE, ROLLING_SHUTTER_IMAGE } from '../../services/storageService';

export const AdminSettingsPage: React.FC = () => {
  const {
    settings,
    updateSettings,
    exportDataJson,
    importDataJson,
    resetDemoData,
    clearAllData,
  } = useShop();

  // Local state for editable settings
  const [form, setForm] = useState(settings);

  // Dangerous action modal triggers
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [jsonImportText, setJsonImportText] = useState('');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `walisons-engineering-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExecuteImport = () => {
    if (!jsonImportText.trim()) return;
    const ok = importDataJson(jsonImportText);
    if (ok) {
      setImportModalOpen(false);
      setJsonImportText('');
      setForm(settings);
    }
  };

  const imagePresets = [
    { label: 'Welding Sparks & Steel', value: HERO_IMAGE },
    { label: 'Heavy Workshop Bay', value: ABOUT_WORKSHOP_IMAGE },
    { label: 'Gates & Grills Precision', value: GATES_GRILLS_IMAGE },
    { label: 'Machinery Lathe & Overhaul', value: MACHINERY_REPAIR_IMAGE },
    { label: 'Motorized Rolling Shutters', value: ROLLING_SHUTTER_IMAGE },
  ];

  return (
    <div className="space-y-10 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black uppercase text-white font-heading tracking-tight">
            System Settings &amp; Data Backup
          </h1>
          <p className="text-xs text-slate-400">
            Configure company identity, contact numbers, homepage hero, metrics, and JSON backups.
          </p>
        </div>

        <Button
          type="button"
          variant="primary"
          onClick={handleSaveSettings}
          leftIcon={<Save className="w-4 h-4" />}
        >
          Save All Settings
        </Button>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-8">
        {/* Section 1: Business Information */}
        <div className="p-6 rounded-2xl bg-[#10141c] border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-sm font-bold text-white uppercase font-heading">
            <Building className="w-4 h-4 text-amber-500" />
            <span>1. Core Business Information</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Business Name"
              required
              value={form.businessName}
              onChange={e => setForm(prev => ({ ...prev, businessName: e.target.value }))}
            />

            <Input
              label="Company Tagline"
              value={form.tagline}
              onChange={e => setForm(prev => ({ ...prev, tagline: e.target.value }))}
            />

            <Input
              label="Primary Phone Number"
              required
              value={form.phone}
              onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
            />

            <Input
              label="WhatsApp Business Number"
              required
              value={form.whatsapp}
              onChange={e => setForm(prev => ({ ...prev, whatsapp: e.target.value }))}
              helperText="Used for pre-filled chat messages across all pages"
            />

            <Input
              label="Email Address"
              required
              value={form.email}
              onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
            />

            <Input
              label="Operating Hours"
              value={form.openingHours}
              onChange={e => setForm(prev => ({ ...prev, openingHours: e.target.value }))}
            />
          </div>

          <Input
            label="Physical Workshop Address"
            required
            value={form.address}
            onChange={e => setForm(prev => ({ ...prev, address: e.target.value }))}
          />

          <Textarea
            label="Company Description"
            rows={3}
            value={form.description}
            onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>

        {/* Section 2: Business Statistics */}
        <div className="p-6 rounded-2xl bg-[#10141c] border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-sm font-bold text-white uppercase font-heading">
            <BarChart3 className="w-4 h-4 text-amber-500" />
            <span>2. Dynamic Business Statistics</span>
          </div>
          <p className="text-xs text-slate-400">
            These figures update the animated counters on the public homepage and about page.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Input
              label="Years Experience"
              type="number"
              value={form.stats.yearsExperience}
              onChange={e =>
                setForm(prev => ({
                  ...prev,
                  stats: { ...prev.stats, yearsExperience: parseInt(e.target.value) || 0 },
                }))
              }
            />

            <Input
              label="Projects Done"
              type="number"
              value={form.stats.projectsCompleted}
              onChange={e =>
                setForm(prev => ({
                  ...prev,
                  stats: { ...prev.stats, projectsCompleted: parseInt(e.target.value) || 0 },
                }))
              }
            />

            <Input
              label="Happy Clients"
              type="number"
              value={form.stats.happyClients}
              onChange={e =>
                setForm(prev => ({
                  ...prev,
                  stats: { ...prev.stats, happyClients: parseInt(e.target.value) || 0 },
                }))
              }
            />

            <Input
              label="Services Count"
              type="number"
              value={form.stats.servicesCount}
              onChange={e =>
                setForm(prev => ({
                  ...prev,
                  stats: { ...prev.stats, servicesCount: parseInt(e.target.value) || 0 },
                }))
              }
            />
          </div>
        </div>

        {/* Section 3: Homepage Hero Section */}
        <div className="p-6 rounded-2xl bg-[#10141c] border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-sm font-bold text-white uppercase font-heading">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>3. Homepage Hero Visual &amp; Messaging</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Hero Main Title"
              value={form.hero.title}
              onChange={e =>
                setForm(prev => ({
                  ...prev,
                  hero: { ...prev.hero, title: e.target.value },
                }))
              }
            />

            <Input
              label="Hero Subtitle"
              value={form.hero.subtitle}
              onChange={e =>
                setForm(prev => ({
                  ...prev,
                  hero: { ...prev.hero, subtitle: e.target.value },
                }))
              }
            />

            <Select
              label="Hero Background Preset"
              options={imagePresets}
              value={form.hero.heroImage}
              onChange={e =>
                setForm(prev => ({
                  ...prev,
                  hero: { ...prev.hero, heroImage: e.target.value },
                }))
              }
            />

            <Input
              label="Custom Hero Image URL"
              value={form.hero.heroImage}
              onChange={e =>
                setForm(prev => ({
                  ...prev,
                  hero: { ...prev.hero, heroImage: e.target.value },
                }))
              }
            />
          </div>

          <Textarea
            label="Hero Supporting Description"
            rows={2}
            value={form.hero.description}
            onChange={e =>
              setForm(prev => ({
                ...prev,
                hero: { ...prev.hero, description: e.target.value },
              }))
            }
          />
        </div>

        {/* Section 4: Social Media & Google Maps */}
        <div className="p-6 rounded-2xl bg-[#10141c] border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-sm font-bold text-white uppercase font-heading">
            <Share2 className="w-4 h-4 text-amber-500" />
            <span>4. Social Media &amp; Google Maps</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Facebook Profile URL"
              value={form.social.facebook}
              onChange={e =>
                setForm(prev => ({
                  ...prev,
                  social: { ...prev.social, facebook: e.target.value },
                }))
              }
            />

            <Input
              label="Instagram Profile URL"
              value={form.social.instagram}
              onChange={e =>
                setForm(prev => ({
                  ...prev,
                  social: { ...prev.social, instagram: e.target.value },
                }))
              }
            />

            <Input
              label="YouTube Channel URL"
              value={form.social.youtube}
              onChange={e =>
                setForm(prev => ({
                  ...prev,
                  social: { ...prev.social, youtube: e.target.value },
                }))
              }
            />

            <Input
              label="TikTok Profile URL"
              value={form.social.tiktok}
              onChange={e =>
                setForm(prev => ({
                  ...prev,
                  social: { ...prev.social, tiktok: e.target.value },
                }))
              }
            />
          </div>

          <Input
            label="Google Maps Embed URL"
            value={form.googleMapsEmbedUrl}
            onChange={e => setForm(prev => ({ ...prev, googleMapsEmbedUrl: e.target.value }))}
            helperText="Paste the iframe src URL from Google Maps share embed"
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="lg" leftIcon={<Save className="w-4 h-4" />}>
            Save All Settings
          </Button>
        </div>
      </form>

      {/* Section 5: Data Backup, Import, and Reset (Prompt Requirement #26) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#10141c] border border-slate-800 space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-sm font-bold text-white uppercase font-heading">
          <ShieldAlert className="w-4 h-4 text-amber-500" />
          <span>5. Application Data Backup &amp; Disaster Recovery</span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
          Because this version persists entirely in the browser&apos;s LocalStorage, you can export all services, portfolio projects, gallery images, inquiries, and reviews into a single JSON file. You can restore this file anytime.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleDownloadBackup}
            leftIcon={<Download className="w-4 h-4 text-amber-400" />}
          >
            Export JSON Backup
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => setImportModalOpen(true)}
            leftIcon={<Upload className="w-4 h-4 text-sky-400" />}
          >
            Import JSON Backup
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={() => setResetConfirmOpen(true)}
            leftIcon={<RotateCcw className="w-4 h-4 text-amber-400" />}
          >
            Reset Demo Data
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={() => setClearConfirmOpen(true)}
            leftIcon={<Trash2 className="w-4 h-4" />}
          >
            Clear All Data
          </Button>
        </div>
      </div>

      {/* Import JSON Modal */}
      <Modal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        title="Import Application JSON Backup"
        subtitle="Paste valid exported JSON data to restore all services, projects, reviews, and inquiries"
        maxWidth="lg"
      >
        <div className="space-y-4">
          <Textarea
            label="JSON Payload"
            rows={8}
            placeholder='{ "version": "1.0.0", "settings": {...}, "services": [...] }'
            value={jsonImportText}
            onChange={e => setJsonImportText(e.target.value)}
          />

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setImportModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleExecuteImport}>
              Validate &amp; Restore
            </Button>
          </div>
        </div>
      </Modal>

      {/* Reset Demo Data Confirmation */}
      <ConfirmDialog
        isOpen={resetConfirmOpen}
        onClose={() => setResetConfirmOpen(false)}
        onConfirm={() => {
          resetDemoData();
          setResetConfirmOpen(false);
          setForm(settings);
        }}
        title="Reset Demo Dataset?"
        message="This will overwrite current edits and re-populate the application with the initial engineering services, portfolio projects, and workshop gallery."
        confirmText="Yes, Restore Demo"
        variant="primary"
      />

      {/* Clear Application Data Confirmation */}
      <ConfirmDialog
        isOpen={clearConfirmOpen}
        onClose={() => setClearConfirmOpen(false)}
        onConfirm={() => {
          clearAllData();
          setClearConfirmOpen(false);
        }}
        title="Wipe All Application Data?"
        message="This will delete all services, projects, reviews, and inquiries from your browser's LocalStorage. This operation cannot be undone unless you have a JSON backup."
        confirmText="Yes, Wipe Data"
        variant="danger"
      />
    </div>
  );
};

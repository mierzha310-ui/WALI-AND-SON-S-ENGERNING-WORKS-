import React, { useState, useMemo } from 'react';
import { useShop } from '../../context/ShopContext';
import { Service } from '../../types';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Textarea } from '../../components/common/Textarea';
import { Select } from '../../components/common/Select';
import { Modal } from '../../components/common/Modal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Star,
  CheckCircle,
  XCircle,
  Eye,
  Layers,
} from 'lucide-react';
import { HERO_IMAGE, ABOUT_WORKSHOP_IMAGE, GATES_GRILLS_IMAGE, MACHINERY_REPAIR_IMAGE, ROLLING_SHUTTER_IMAGE } from '../../services/storageService';

export const AdminServicesPage: React.FC = () => {
  const { services, addService, updateService, deleteService } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Confirm delete dialog
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Welding');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(HERO_IMAGE);
  const [icon, setIcon] = useState('Flame');
  const [capabilitiesStr, setCapabilitiesStr] = useState('');
  const [featured, setFeatured] = useState(false);
  const [active, setActive] = useState(true);

  const categories = useMemo(() => {
    const set = new Set<string>();
    services.forEach(s => set.add(s.category));
    return ['All', ...Array.from(set)];
  }, [services]);

  const filteredServices = useMemo(() => {
    return services.filter(s => {
      const matchCat = selectedCategory === 'All' || s.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [services, selectedCategory, searchQuery]);

  const handleOpenCreateModal = () => {
    setEditingService(null);
    setTitle('');
    setCategory('Welding');
    setShortDescription('');
    setDescription('');
    setImage(HERO_IMAGE);
    setIcon('Flame');
    setCapabilitiesStr('High-Tensile Welding, Structural Alignment, On-Site Inspection');
    setFeatured(false);
    setActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (s: Service) => {
    setEditingService(s);
    setTitle(s.title);
    setCategory(s.category);
    setShortDescription(s.shortDescription);
    setDescription(s.description);
    setImage(s.image);
    setIcon(s.icon || 'Hammer');
    setCapabilitiesStr(s.capabilities?.join(', ') || '');
    setFeatured(s.featured);
    setActive(s.active);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !shortDescription.trim()) return;

    const capabilities = capabilitiesStr
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    if (editingService) {
      updateService(editingService.id, {
        title: title.trim(),
        slug,
        category,
        shortDescription: shortDescription.trim(),
        description: description.trim() || shortDescription.trim(),
        image,
        icon,
        capabilities,
        featured,
        active,
      });
    } else {
      addService({
        title: title.trim(),
        slug,
        category,
        shortDescription: shortDescription.trim(),
        description: description.trim() || shortDescription.trim(),
        image,
        icon,
        capabilities,
        featured,
        active,
      });
    }

    setIsModalOpen(false);
  };

  const availableImagePresets = [
    { label: 'Welding Sparks', value: HERO_IMAGE },
    { label: 'Heavy Workshop Floor', value: ABOUT_WORKSHOP_IMAGE },
    { label: 'Security Gates & Grills', value: GATES_GRILLS_IMAGE },
    { label: 'Machinery Lathe & Gears', value: MACHINERY_REPAIR_IMAGE },
    { label: 'Rolling Shutters', value: ROLLING_SHUTTER_IMAGE },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Top action row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black uppercase text-white font-heading tracking-tight">
            Manage Engineering Services
          </h1>
          <p className="text-xs text-slate-400">
            Create, update, activate, and feature services displayed on the public website.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={handleOpenCreateModal}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add New Service
        </Button>
      </div>

      {/* Filter and search bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#10141c] border border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#0d1017] border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Services Table */}
      {filteredServices.length > 0 ? (
        <div className="rounded-xl border border-slate-800 bg-[#10141c] overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#0b0e14] border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredServices.map(service => (
                  <tr key={service.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                          <img
                            src={service.image}
                            alt={service.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                            onError={e => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                        <div>
                          <strong className="block text-white font-bold text-xs">
                            {service.title}
                          </strong>
                          <span className="text-[11px] text-slate-400 line-clamp-1">
                            {service.shortDescription}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-slate-300 font-medium">{service.category}</span>
                    </td>

                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => updateService(service.id, { active: !service.active })}
                        className="cursor-pointer"
                        title="Click to toggle active state"
                      >
                        {service.active ? (
                          <Badge variant="success" dot size="sm">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="default" dot size="sm">
                            Inactive
                          </Badge>
                        )}
                      </button>
                    </td>

                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => updateService(service.id, { featured: !service.featured })}
                        className="cursor-pointer text-slate-400 hover:text-amber-400"
                        title="Click to toggle featured spotlight"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            service.featured ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                          }`}
                        />
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(service)}
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
                          title="Edit Service"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setServiceToDelete(service)}
                          className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded transition-colors cursor-pointer"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
          title="No Services Found"
          description="Create your first engineering service to display on the public website."
          actionText="Add Service"
          onAction={handleOpenCreateModal}
        />
      )}

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingService ? 'Edit Engineering Service' : 'Add New Engineering Service'}
        maxWidth="xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Service Title"
            required
            placeholder="e.g. Certified High-Tensile Welding"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Category"
              required
              options={[
                { value: 'Welding', label: 'Welding' },
                { value: 'Fabrication', label: 'Fabrication' },
                { value: 'Gates & Grills', label: 'Gates & Grills' },
                { value: 'Shutters', label: 'Shutters' },
                { value: 'Machinery', label: 'Machinery' },
                { value: 'Maintenance', label: 'Maintenance' },
              ]}
              value={category}
              onChange={e => setCategory(e.target.value)}
            />

            <Select
              label="Visual Asset Preset"
              options={availableImagePresets}
              value={image}
              onChange={e => setImage(e.target.value)}
            />
          </div>

          <Input
            label="Custom Image URL (Optional)"
            placeholder="Or enter custom URL..."
            value={image}
            onChange={e => setImage(e.target.value)}
            helperText="Uses generated high-resolution assets by default"
          />

          <Textarea
            label="Short Summary (Card Preview)"
            required
            rows={2}
            placeholder="Brief 1-2 sentence overview for cards..."
            value={shortDescription}
            onChange={e => setShortDescription(e.target.value)}
          />

          <Textarea
            label="Full Engineering Description"
            rows={4}
            placeholder="Detailed metallurgical standards, processes, and applications..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <Input
            label="Key Capabilities (Comma-separated)"
            placeholder="MIG/TIG Welding, High-Tensile, On-Site Rigging"
            value={capabilitiesStr}
            onChange={e => setCapabilitiesStr(e.target.value)}
            helperText="Separate distinct features with commas"
          />

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={active}
                onChange={e => setActive(e.target.checked)}
                className="rounded border-slate-700 text-amber-500 focus:ring-amber-500"
              />
              <span>Active (Visible on Website)</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={e => setFeatured(e.target.checked)}
                className="rounded border-slate-700 text-amber-500 focus:ring-amber-500"
              />
              <span>Featured Service (Spotlight)</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingService ? 'Save Changes' : 'Create Service'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!serviceToDelete}
        onClose={() => setServiceToDelete(null)}
        onConfirm={() => {
          if (serviceToDelete) {
            deleteService(serviceToDelete.id);
            setServiceToDelete(null);
          }
        }}
        title="Delete Service?"
        message={`Are you sure you want to permanently remove "${serviceToDelete?.title}" from service records?`}
        confirmText="Yes, Delete"
        variant="danger"
      />
    </div>
  );
};

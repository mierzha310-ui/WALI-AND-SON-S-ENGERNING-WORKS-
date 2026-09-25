import React, { useState, useMemo } from 'react';
import { useShop } from '../../context/ShopContext';
import { GalleryItem } from '../../types';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Textarea } from '../../components/common/Textarea';
import { Select } from '../../components/common/Select';
import { Modal } from '../../components/common/Modal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { EmptyState } from '../../components/common/EmptyState';
import { Plus, Edit2, Trash2, Search, Eye } from 'lucide-react';
import { HERO_IMAGE, ABOUT_WORKSHOP_IMAGE, GATES_GRILLS_IMAGE, MACHINERY_REPAIR_IMAGE, ROLLING_SHUTTER_IMAGE } from '../../services/storageService';

export const AdminGalleryPage: React.FC = () => {
  const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Workshop');
  const [image, setImage] = useState(ABOUT_WORKSHOP_IMAGE);
  const [description, setDescription] = useState('');

  const categories = useMemo(() => {
    const set = new Set<string>();
    gallery.forEach(g => set.add(g.category));
    return ['All', ...Array.from(set)];
  }, [gallery]);

  const filteredItems = useMemo(() => {
    return gallery.filter(item => {
      const matchCat = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [gallery, selectedCategory, searchQuery]);

  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setTitle('');
    setCategory('Workshop');
    setImage(ABOUT_WORKSHOP_IMAGE);
    setDescription('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setImage(item.image);
    setDescription(item.description);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !image.trim()) return;

    if (editingItem) {
      updateGalleryItem(editingItem.id, {
        title: title.trim(),
        category,
        image,
        description: description.trim(),
      });
    } else {
      addGalleryItem({
        title: title.trim(),
        category,
        image,
        description: description.trim(),
      });
    }

    setIsModalOpen(false);
  };

  const imagePresets = [
    { label: 'Workshop Main Floor', value: ABOUT_WORKSHOP_IMAGE },
    { label: 'Precision Welding In Action', value: HERO_IMAGE },
    { label: 'Gates & Grills Fabrication', value: GATES_GRILLS_IMAGE },
    { label: 'Machinery Lathe & Cylinders', value: MACHINERY_REPAIR_IMAGE },
    { label: 'Commercial Rolling Shutters', value: ROLLING_SHUTTER_IMAGE },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black uppercase text-white font-heading tracking-tight">
            Gallery Assets Management
          </h1>
          <p className="text-xs text-slate-400">
            Curate workshop media, fabrication snapshots, and field installation photography.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={handleOpenCreateModal}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Gallery Asset
        </Button>
      </div>

      {/* Filter and Search */}
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
            placeholder="Search gallery..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#0d1017] border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Gallery Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-[#10141c] border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={e => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-amber-400 uppercase tracking-wider border border-slate-800">
                    {item.category}
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <h3 className="text-sm font-bold text-white uppercase tracking-tight line-clamp-1 font-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-3.5 border-t border-slate-800/80 bg-slate-900/40 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(item)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
                    title="Edit Information"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setItemToDelete(item)}
                    className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded transition-colors cursor-pointer"
                    title="Delete Image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Gallery Images"
          description="Upload or configure images to appear in the public photo gallery."
          actionText="Add Image"
          onAction={handleOpenCreateModal}
        />
      )}

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Gallery Asset' : 'Add New Gallery Asset'}
        maxWidth="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Image Title"
            required
            placeholder="e.g. Multi-Pass MIG Welding On Structural Flange"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Category"
              required
              options={[
                { value: 'Workshop', label: 'Workshop' },
                { value: 'Welding', label: 'Welding' },
                { value: 'Fabrication', label: 'Fabrication' },
                { value: 'Gates', label: 'Gates' },
                { value: 'Grills', label: 'Grills' },
                { value: 'Shutters', label: 'Shutters' },
                { value: 'Machinery', label: 'Machinery' },
                { value: 'Completed Projects', label: 'Completed Projects' },
              ]}
              value={category}
              onChange={e => setCategory(e.target.value)}
            />

            <Select
              label="Preset Asset"
              options={imagePresets}
              value={image}
              onChange={e => setImage(e.target.value)}
            />
          </div>

          <Input
            label="Image URL"
            required
            value={image}
            onChange={e => setImage(e.target.value)}
          />

          {/* Live Image Preview in Modal */}
          {image && (
            <div className="p-2 rounded-lg border border-slate-800 bg-slate-950">
              <span className="text-[11px] text-slate-500 block mb-1">Image Preview:</span>
              <div className="h-36 rounded overflow-hidden bg-slate-900">
                <img
                  src={image}
                  alt="Preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <Textarea
            label="Description / Technical Caption"
            rows={3}
            placeholder="Provide context on machinery model, weld position, or client application..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingItem ? 'Save Changes' : 'Add to Gallery'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={() => {
          if (itemToDelete) {
            deleteGalleryItem(itemToDelete.id);
            setItemToDelete(null);
          }
        }}
        title="Delete Gallery Item?"
        message={`Are you sure you want to remove "${itemToDelete?.title}" from the gallery?`}
        confirmText="Yes, Delete"
        variant="danger"
      />
    </div>
  );
};

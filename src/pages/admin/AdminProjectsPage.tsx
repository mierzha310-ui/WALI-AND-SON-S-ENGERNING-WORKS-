import React, { useState, useMemo } from 'react';
import { useShop } from '../../context/ShopContext';
import { Project } from '../../types';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Textarea } from '../../components/common/Textarea';
import { Select } from '../../components/common/Select';
import { Modal } from '../../components/common/Modal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { EmptyState } from '../../components/common/EmptyState';
import { Plus, Edit2, Trash2, Search, Star, Layers, MapPin, Calendar } from 'lucide-react';
import { ABOUT_WORKSHOP_IMAGE, ROLLING_SHUTTER_IMAGE, GATES_GRILLS_IMAGE, MACHINERY_REPAIR_IMAGE, HERO_IMAGE } from '../../services/storageService';

export const AdminProjectsPage: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Fabrication');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [client, setClient] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(ABOUT_WORKSHOP_IMAGE);
  const [beforeImage, setBeforeImage] = useState('');
  const [afterImage, setAfterImage] = useState('');
  const [scopeStr, setScopeStr] = useState('');
  const [featured, setFeatured] = useState(false);

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => set.add(p.category));
    return ['All', ...Array.from(set)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchCat = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  const handleOpenCreateModal = () => {
    setEditingProject(null);
    setTitle('');
    setCategory('Fabrication');
    setLocation('Industrial Sector 7-A');
    setDate('March 2024');
    setClient('Commercial Client');
    setDescription('');
    setImage(ABOUT_WORKSHOP_IMAGE);
    setBeforeImage('');
    setAfterImage('');
    setScopeStr('Structural Trusses, Bolt Anchoring, On-Site Hoisting');
    setFeatured(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: Project) => {
    setEditingProject(p);
    setTitle(p.title);
    setCategory(p.category);
    setLocation(p.location);
    setDate(p.date);
    setClient(p.client || '');
    setDescription(p.description);
    setImage(p.image);
    setBeforeImage(p.beforeImage || '');
    setAfterImage(p.afterImage || '');
    setScopeStr(p.scope?.join(', ') || '');
    setFeatured(p.featured);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const scope = scopeStr
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    if (editingProject) {
      updateProject(editingProject.id, {
        title: title.trim(),
        slug,
        category,
        location: location.trim(),
        date: date.trim(),
        client: client.trim() || undefined,
        description: description.trim(),
        image,
        beforeImage: beforeImage.trim() || undefined,
        afterImage: afterImage.trim() || undefined,
        scope,
        featured,
      });
    } else {
      addProject({
        title: title.trim(),
        slug,
        category,
        location: location.trim(),
        date: date.trim(),
        client: client.trim() || undefined,
        description: description.trim(),
        image,
        beforeImage: beforeImage.trim() || undefined,
        afterImage: afterImage.trim() || undefined,
        scope,
        featured,
      });
    }

    setIsModalOpen(false);
  };

  const imagePresets = [
    { label: 'Workshop / Structural Assembly', value: ABOUT_WORKSHOP_IMAGE },
    { label: 'Industrial Rolling Shutters', value: ROLLING_SHUTTER_IMAGE },
    { label: 'Architectural Gates & Grills', value: GATES_GRILLS_IMAGE },
    { label: 'Machinery Lathe Machining', value: MACHINERY_REPAIR_IMAGE },
    { label: 'Welding Sparks & Beams', value: HERO_IMAGE },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black uppercase text-white font-heading tracking-tight">
            Portfolio &amp; Project Management
          </h1>
          <p className="text-xs text-slate-400">
            Publish case studies, before &amp; after comparisons, and structural milestones.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={handleOpenCreateModal}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add New Project
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
            placeholder="Search projects..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#0d1017] border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Projects List */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="bg-[#10141c] border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={e => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-amber-400 uppercase tracking-wider border border-slate-800">
                    {project.category}
                  </div>
                  {project.beforeImage && (
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-[10px] font-medium text-slate-300 border border-slate-800 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-amber-400" />
                      <span>Before / After</span>
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-2.5">
                  <h3 className="text-sm font-bold text-white uppercase tracking-tight line-clamp-1 font-heading">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 truncate max-w-[130px]">
                      <MapPin className="w-3 h-3 text-amber-500" />
                      {project.location}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {project.date}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="p-4 border-t border-slate-800/80 bg-slate-900/40 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => updateProject(project.id, { featured: !project.featured })}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 cursor-pointer"
                  title="Toggle Featured"
                >
                  <Star
                    className={`w-4 h-4 ${
                      project.featured ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                    }`}
                  />
                  <span className="text-[11px]">
                    {project.featured ? 'Featured' : 'Not Featured'}
                  </span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(project)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
                    title="Edit Project"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setProjectToDelete(project)}
                    className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded transition-colors cursor-pointer"
                    title="Delete Project"
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
          title="No Projects Found"
          description="Publish your first completed engineering project to build client trust."
          actionText="Add Project"
          onAction={handleOpenCreateModal}
        />
      )}

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Project Title"
            required
            placeholder="e.g. Pre-Engineered Steel Warehouse Structure"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Category"
              required
              options={[
                { value: 'Fabrication', label: 'Fabrication' },
                { value: 'Welding', label: 'Welding' },
                { value: 'Gates & Grills', label: 'Gates & Grills' },
                { value: 'Shutters', label: 'Shutters' },
                { value: 'Machinery', label: 'Machinery' },
              ]}
              value={category}
              onChange={e => setCategory(e.target.value)}
            />

            <Input
              label="Location / City"
              placeholder="e.g. Plot 42, North Industrial Area"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />

            <Input
              label="Completion Date / Month"
              placeholder="e.g. February 2024"
              value={date}
              onChange={e => setDate(e.target.value)}
            />

            <Input
              label="Client / Facility Name (Optional)"
              placeholder="e.g. Al-Madina Logistics Ltd"
              value={client}
              onChange={e => setClient(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Primary Project Image"
              options={imagePresets}
              value={image}
              onChange={e => setImage(e.target.value)}
            />

            <Input
              label="Custom Image URL"
              placeholder="Or enter image link..."
              value={image}
              onChange={e => setImage(e.target.value)}
            />
          </div>

          <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              Before &amp; After Comparison Images (Optional)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Before Image URL"
                placeholder="e.g. /src/assets/images/..."
                value={beforeImage}
                onChange={e => setBeforeImage(e.target.value)}
                helperText="Initial raw or damaged condition"
              />
              <Input
                label="After Image URL"
                placeholder="e.g. /src/assets/images/..."
                value={afterImage}
                onChange={e => setAfterImage(e.target.value)}
                helperText="Finished polished fabrication"
              />
            </div>
          </div>

          <Textarea
            label="Project Case Study Description"
            required
            rows={3}
            placeholder="Details of materials used, tonnage, structural challenges solved, and operational outcome..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <Input
            label="Scope of Work Items (Comma-separated)"
            placeholder="Truss Fabrication, Crane Rails, Anchoring, Epoxy Coating"
            value={scopeStr}
            onChange={e => setScopeStr(e.target.value)}
          />

          <label className="flex items-center gap-2 text-xs text-slate-300 pt-1 cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={e => setFeatured(e.target.checked)}
              className="rounded border-slate-700 text-amber-500 focus:ring-amber-500"
            />
            <span>Feature this case study prominently on homepage</span>
          </label>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingProject ? 'Save Project' : 'Create Project'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        onConfirm={() => {
          if (projectToDelete) {
            deleteProject(projectToDelete.id);
            setProjectToDelete(null);
          }
        }}
        title="Delete Project?"
        message={`Are you sure you want to delete "${projectToDelete?.title}" from the portfolio?`}
        confirmText="Yes, Delete"
        variant="danger"
      />
    </div>
  );
};

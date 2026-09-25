import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Review } from '../../types';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Textarea } from '../../components/common/Textarea';
import { Modal } from '../../components/common/Modal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import {
  Star,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Check,
  X,
  MessageSquare,
} from 'lucide-react';

export const AdminReviewsPage: React.FC = () => {
  const { reviews, addReview, updateReview, deleteReview, toggleReviewApproval } = useShop();

  const [filterApproved, setFilterApproved] = useState<'All' | 'Approved' | 'Pending'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [projectType, setProjectType] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [approved, setApproved] = useState(true);
  const [isSampleData, setIsSampleData] = useState(false);

  const filteredReviews = reviews.filter(r => {
    if (filterApproved === 'Approved') return r.approved;
    if (filterApproved === 'Pending') return !r.approved;
    return true;
  });

  const handleOpenCreateModal = () => {
    setEditingReview(null);
    setCustomerName('');
    setProjectType('');
    setRating(5);
    setReviewText('');
    setApproved(true);
    setIsSampleData(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (r: Review) => {
    setEditingReview(r);
    setCustomerName(r.customerName);
    setProjectType(r.projectType || '');
    setRating(r.rating);
    setReviewText(r.review);
    setApproved(r.approved);
    setIsSampleData(r.isSampleData);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !reviewText.trim()) return;

    if (editingReview) {
      updateReview(editingReview.id, {
        customerName: customerName.trim(),
        projectType: projectType.trim() || undefined,
        rating,
        review: reviewText.trim(),
        approved,
        isSampleData,
      });
    } else {
      addReview({
        customerName: customerName.trim(),
        projectType: projectType.trim() || undefined,
        rating,
        review: reviewText.trim(),
        date: new Date().toISOString().split('T')[0],
        approved,
        isSampleData,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black uppercase text-white font-heading tracking-tight">
            Client Review Moderation
          </h1>
          <p className="text-xs text-slate-400">
            Moderate, approve, and manage customer feedback. Only approved reviews appear on the live site.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={handleOpenCreateModal}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Testimonial
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#10141c] border border-slate-800 w-fit">
        {(['All', 'Approved', 'Pending'] as const).map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilterApproved(tab)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filterApproved === tab
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab} {tab === 'Pending' && `(${reviews.filter(r => !r.approved).length})`}
          </button>
        ))}
      </div>

      {/* Reviews Table */}
      {filteredReviews.length > 0 ? (
        <div className="rounded-xl border border-slate-800 bg-[#10141c] overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#0b0e14] border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Review Content</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredReviews.map(r => (
                  <tr key={r.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                      {r.customerName}
                      {r.projectType && (
                        <span className="block text-[11px] font-normal text-amber-400">
                          {r.projectType}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex text-amber-400">
                        {[...Array(r.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 max-w-md">
                      <p className="line-clamp-2 text-slate-300 leading-relaxed italic">
                        &ldquo;{r.review}&rdquo;
                      </p>
                      <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                        {r.date}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => toggleReviewApproval(r.id)}
                        className="cursor-pointer"
                        title="Click to toggle approval status"
                      >
                        {r.approved ? (
                          <Badge variant="success" dot size="sm">
                            Approved
                          </Badge>
                        ) : (
                          <Badge variant="warning" dot size="sm">
                            Pending Review
                          </Badge>
                        )}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {r.isSampleData ? (
                        <span className="text-[10px] text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                          Demo Sample
                        </span>
                      ) : (
                        <span className="text-[10px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/40">
                          Live Submission
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => toggleReviewApproval(r.id)}
                          className={`p-1.5 rounded transition-colors cursor-pointer ${
                            r.approved
                              ? 'text-amber-400 hover:bg-amber-950/40'
                              : 'text-emerald-400 hover:bg-emerald-950/40'
                          }`}
                          title={r.approved ? 'Unapprove' : 'Approve'}
                        >
                          {r.approved ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(r)}
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
                          title="Edit Review"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setReviewToDelete(r)}
                          className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded transition-colors cursor-pointer"
                          title="Delete Review"
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
          title="No Reviews Found"
          description="No customer reviews match your selected filter."
        />
      )}

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingReview ? 'Edit Review' : 'Add Testimonial'}
        maxWidth="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Customer Name"
            required
            placeholder="e.g. Tariq Mehmood"
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}
          />

          <Input
            label="Service / Project Title"
            placeholder="e.g. Heavy Steel Trusses / Motorized Rolling Shutter"
            value={projectType}
            onChange={e => setProjectType(e.target.value)}
          />

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Rating
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 cursor-pointer"
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs text-slate-400 font-bold ml-2">{rating} Stars</span>
            </div>
          </div>

          <Textarea
            label="Review Text"
            required
            rows={4}
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
          />

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-800">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={approved}
                onChange={e => setApproved(e.target.checked)}
                className="rounded border-slate-700 text-amber-500 focus:ring-amber-500"
              />
              <span>Approved (Published on live website)</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isSampleData}
                onChange={e => setIsSampleData(e.target.checked)}
                className="rounded border-slate-700 text-amber-500 focus:ring-amber-500"
              />
              <span>Mark as Representative Sample Data</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingReview ? 'Save Review' : 'Create Review'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!reviewToDelete}
        onClose={() => setReviewToDelete(null)}
        onConfirm={() => {
          if (reviewToDelete) {
            deleteReview(reviewToDelete.id);
            setReviewToDelete(null);
          }
        }}
        title="Delete Review?"
        message={`Are you sure you want to delete the review by "${reviewToDelete?.customerName}"?`}
        confirmText="Yes, Delete"
        variant="danger"
      />
    </div>
  );
};

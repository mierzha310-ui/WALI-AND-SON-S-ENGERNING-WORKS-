import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, ShieldCheck, User, Info } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { EmptyState } from '../common/EmptyState';

export const ReviewsSection: React.FC = () => {
  const { approvedReviews, addReview } = useShop();
  const [modalOpen, setModalOpen] = useState(false);

  // New review form state
  const [customerName, setCustomerName] = useState('');
  const [projectType, setProjectType] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !reviewText.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addReview({
        customerName: customerName.trim(),
        projectType: projectType.trim() || 'General Engineering',
        rating,
        review: reviewText.trim(),
        date: new Date().toISOString().split('T')[0],
        approved: false, // Requires admin review
        isSampleData: false,
      });

      setIsSubmitting(false);
      setModalOpen(false);
      setCustomerName('');
      setProjectType('');
      setReviewText('');
      setRating(5);
    }, 300);
  };

  // Average Rating
  const averageRating = approvedReviews.length
    ? (approvedReviews.reduce((acc, r) => acc + r.rating, 0) / approvedReviews.length).toFixed(1)
    : '5.0';

  return (
    <section className="py-20 bg-[#0a0d13] text-slate-100" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
              Client Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-heading">
              Engineering Reviews &amp; Testimonials
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              <span className="font-black text-amber-400 text-sm font-heading">{averageRating}</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-slate-400">({approvedReviews.length} Verified)</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setModalOpen(true)}
              leftIcon={<MessageSquarePlus className="w-4 h-4 text-amber-400" />}
            >
              Write a Review
            </Button>
          </div>
        </div>

        {/* Demo Data Disclaimer Bar */}
        <div className="mb-8 p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-400">
          <Info className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            <strong>Transparency Notice:</strong> All initial entries marked as &quot;Sample Data&quot; reflect representative engineering client use-cases. Live client submissions require admin moderation before publication.
          </span>
        </div>

        {/* Reviews Cards Grid */}
        {approvedReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {approvedReviews.map(item => (
              <div
                key={item.id}
                className="flex flex-col justify-between p-6 rounded-xl bg-[#121620] border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-amber-400 uppercase text-xs">
                        {item.customerName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-tight">
                          {item.customerName}
                        </h4>
                        {item.projectType && (
                          <span className="text-xs text-amber-400/90 font-medium block">
                            {item.projectType}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-4">
                    &ldquo;{item.review}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{item.date}</span>
                  {item.isSampleData ? (
                    <span className="text-[10px] uppercase font-semibold text-slate-400 px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/60">
                      Representative Sample
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Client
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Approved Reviews Yet"
            description="Be the first to share your experience with Wali & Son's Engineering Works."
            actionText="Submit Review"
            onAction={() => setModalOpen(true)}
          />
        )}

        {/* Submit Review Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Submit Client Review"
          subtitle="Your feedback helps us continuously elevate our fabrication standards"
          maxWidth="md"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Your Full Name"
              required
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
              placeholder="e.g. Engr. Aslam Munir"
            />

            <Input
              label="Project or Service Type"
              value={projectType}
              onChange={e => setProjectType(e.target.value)}
              placeholder="e.g. Steel Mezzanine / Motorized Shutter"
              helperText="Optional: mention the work we completed for you"
            />

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Rating <span className="text-amber-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 rounded hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-600 hover:text-slate-500'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs text-slate-400 ml-2 font-bold">{rating} / 5 Stars</span>
              </div>
            </div>

            <Textarea
              label="Your Review / Comments"
              required
              rows={4}
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              placeholder="Describe the quality of fabrication, welding precision, timeline adherence..."
            />

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
              <strong>Admin Moderation Policy:</strong> To prevent spam, all customer submissions are reviewed by the shop administrator before appearing publicly.
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" isLoading={isSubmitting}>
                Submit For Review
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </section>
  );
};

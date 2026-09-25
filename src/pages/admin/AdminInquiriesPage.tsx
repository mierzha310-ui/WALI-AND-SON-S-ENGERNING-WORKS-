import React, { useState, useMemo } from 'react';
import { useShop } from '../../context/ShopContext';
import { Inquiry, InquiryStatus } from '../../types';
import { Button } from '../../components/common/Button';
import { Select } from '../../components/common/Select';
import { Modal } from '../../components/common/Modal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import {
  Search,
  Trash2,
  Eye,
  Phone,
  MessageCircle,
  Calendar,
  Mail,
  User,
  ArrowUpDown,
  FileText,
  Clock,
} from 'lucide-react';

export const AdminInquiriesPage: React.FC = () => {
  const { inquiries, updateInquiryStatus, deleteInquiry, settings } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | InquiryStatus>('All');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Drawer / Detail Modal
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [inquiryToDelete, setInquiryToDelete] = useState<Inquiry | null>(null);

  const statuses: InquiryStatus[] = ['New', 'Contacted', 'In Progress', 'Completed', 'Cancelled'];

  const filteredInquiries = useMemo(() => {
    return inquiries
      .filter(item => {
        const matchStatus = statusFilter === 'All' || item.status === statusFilter;
        const matchSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchStatus && matchSearch;
      })
      .sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
      });
  }, [inquiries, statusFilter, searchQuery, sortOrder]);

  const handleWhatsAppContact = (inq: Inquiry) => {
    const rawNumber = inq.whatsapp || inq.phone;
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hello ${inq.name},\nThis is ${settings.businessName} reaching out regarding your inquiry for "${inq.service}". We are ready to discuss your requirements.`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const getStatusBadge = (st: InquiryStatus) => {
    switch (st) {
      case 'New':
        return <Badge variant="amber" dot size="sm">New</Badge>;
      case 'Contacted':
        return <Badge variant="info" dot size="sm">Contacted</Badge>;
      case 'In Progress':
        return <Badge variant="warning" dot size="sm">In Progress</Badge>;
      case 'Completed':
        return <Badge variant="success" dot size="sm">Completed</Badge>;
      case 'Cancelled':
        return <Badge variant="danger" dot size="sm">Cancelled</Badge>;
      default:
        return <Badge variant="default" dot size="sm">{st}</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black uppercase text-white font-heading tracking-tight">
            Client Inquiries &amp; Quotation Requests
          </h1>
          <p className="text-xs text-slate-400">
            Track incoming leads, update project progression status, and contact customers via WhatsApp or phone.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(prev => (prev === 'desc' ? 'asc' : 'desc'))}
            leftIcon={<ArrowUpDown className="w-3.5 h-3.5" />}
          >
            {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#10141c] border border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {(['All', ...statuses] as const).map(st => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st} {st !== 'All' && `(${inquiries.filter(i => i.status === st).length})`}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, phone, service..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#0d1017] border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Inquiries Table */}
      {filteredInquiries.length > 0 ? (
        <div className="rounded-xl border border-slate-800 bg-[#10141c] overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#0b0e14] border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Phone / WhatsApp</th>
                  <th className="py-3 px-4">Service Required</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Received</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredInquiries.map(inq => (
                  <tr key={inq.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <strong className="block text-white font-bold">{inq.name}</strong>
                      {inq.email && (
                        <span className="text-[11px] text-slate-400 truncate block">
                          {inq.email}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <a
                          href={`tel:${inq.phone}`}
                          className="hover:text-amber-400 transition-colors"
                        >
                          {inq.phone}
                        </a>
                        <button
                          type="button"
                          onClick={() => handleWhatsAppContact(inq)}
                          className="p-1 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 rounded transition-colors"
                          title="Message on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-amber-400 whitespace-nowrap">
                      {inq.service}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <select
                        value={inq.status}
                        onChange={e => updateInquiryStatus(inq.id, e.target.value as InquiryStatus)}
                        className="bg-[#0c0f16] border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                      >
                        {statuses.map(st => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedInquiry(inq)}
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
                          title="View Full Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setInquiryToDelete(inq)}
                          className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded transition-colors cursor-pointer"
                          title="Delete Record"
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
          title="No Inquiries Found"
          description="Customer quotation requests and contact submissions will appear here."
        />
      )}

      {/* Inquiry Detail Modal */}
      <Modal
        isOpen={!!selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        title={`Inquiry Details: ${selectedInquiry?.name}`}
        subtitle={`Reference ID: ${selectedInquiry?.id}`}
        maxWidth="xl"
      >
        {selectedInquiry && (
          <div className="space-y-5">
            {/* Status Selector Header */}
            <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Current Status
              </span>
              <div className="flex items-center gap-2">
                {getStatusBadge(selectedInquiry.status)}
                <select
                  value={selectedInquiry.status}
                  onChange={e => {
                    const nextSt = e.target.value as InquiryStatus;
                    updateInquiryStatus(selectedInquiry.id, nextSt);
                    setSelectedInquiry(prev => (prev ? { ...prev, status: nextSt } : null));
                  }}
                  className="bg-[#0b0e14] border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-200 focus:outline-none"
                >
                  {statuses.map(st => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Customer Contact Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block mb-0.5">Customer Name</span>
                <strong className="text-white text-sm block">{selectedInquiry.name}</strong>
              </div>

              <div>
                <span className="text-slate-500 block mb-0.5">Phone Call</span>
                <a
                  href={`tel:${selectedInquiry.phone}`}
                  className="text-amber-400 hover:underline font-mono"
                >
                  {selectedInquiry.phone}
                </a>
              </div>

              <div>
                <span className="text-slate-500 block mb-0.5">WhatsApp</span>
                <span className="text-slate-300 font-mono">
                  {selectedInquiry.whatsapp || selectedInquiry.phone}
                </span>
              </div>

              <div>
                <span className="text-slate-500 block mb-0.5">Email</span>
                <span className="text-slate-300">{selectedInquiry.email || 'Not Provided'}</span>
              </div>
            </div>

            {/* Scope & Details */}
            <div className="space-y-3">
              <div>
                <span className="text-slate-500 text-xs block mb-1 uppercase font-semibold">
                  Required Service
                </span>
                <p className="text-sm font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20 inline-block">
                  {selectedInquiry.service}
                </p>
              </div>

              <div>
                <span className="text-slate-500 text-xs block mb-1 uppercase font-semibold">
                  Project Description &amp; Specifications
                </span>
                <div className="p-3.5 rounded-lg bg-[#0a0d14] border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.description}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                {selectedInquiry.quantity && (
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block mb-0.5">Quantity / Size</span>
                    <strong className="text-white">{selectedInquiry.quantity}</strong>
                  </div>
                )}
                {selectedInquiry.preferredDate && (
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block mb-0.5">Target Date</span>
                    <strong className="text-white">{selectedInquiry.preferredDate}</strong>
                  </div>
                )}
                {selectedInquiry.budget && (
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block mb-0.5">Budget Tier</span>
                    <strong className="text-amber-400">{selectedInquiry.budget}</strong>
                  </div>
                )}
              </div>

              {selectedInquiry.notes && (
                <div>
                  <span className="text-slate-500 text-xs block mb-1 uppercase font-semibold">
                    Additional Notes
                  </span>
                  <p className="text-xs text-slate-300 p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    {selectedInquiry.notes}
                  </p>
                </div>
              )}

              {/* Attachment Preview */}
              {selectedInquiry.attachmentName && (
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                  <span className="text-slate-500 block mb-1">Attached Reference File:</span>
                  <span className="text-amber-400 font-medium">
                    {selectedInquiry.attachmentName}
                  </span>
                  {selectedInquiry.attachmentDataUrl && (
                    <div className="mt-2 h-32 rounded overflow-hidden bg-black">
                      <img
                        src={selectedInquiry.attachmentDataUrl}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-slate-800">
              <Button
                variant="whatsapp"
                fullWidth
                onClick={() => handleWhatsAppContact(selectedInquiry)}
                leftIcon={<MessageCircle className="w-4 h-4 fill-current" />}
              >
                Reach Out On WhatsApp
              </Button>
              <Button
                variant="outline"
                fullWidth
                onClick={() => setSelectedInquiry(null)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!inquiryToDelete}
        onClose={() => setInquiryToDelete(null)}
        onConfirm={() => {
          if (inquiryToDelete) {
            deleteInquiry(inquiryToDelete.id);
            setInquiryToDelete(null);
          }
        }}
        title="Delete Customer Inquiry?"
        message={`Are you sure you want to permanently delete the inquiry record for "${inquiryToDelete?.name}"?`}
        confirmText="Yes, Delete"
        variant="danger"
      />
    </div>
  );
};

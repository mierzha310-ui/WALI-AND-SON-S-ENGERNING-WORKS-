import React from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench,
  FolderKanban,
  Image as ImageIcon,
  Star,
  Inbox,
  CheckCircle2,
  PlusCircle,
  Settings,
  ArrowRight,
  Clock,
  Phone,
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Badge } from '../../components/common/Badge';

export const AdminDashboardPage: React.FC = () => {
  const { services, projects, gallery, reviews, inquiries, settings } = useShop();

  // Compute metrics
  const newInquiries = inquiries.filter(i => i.status === 'New');
  const completedInquiries = inquiries.filter(i => i.status === 'Completed');
  const pendingReviews = reviews.filter(r => !r.approved);

  const statsCards = [
    {
      title: 'Total Services',
      value: services.length,
      desc: `${services.filter(s => s.active).length} Active Services`,
      icon: Wrench,
      path: '/admin/services',
    },
    {
      title: 'Total Projects',
      value: projects.length,
      desc: `${projects.filter(p => p.featured).length} Featured In Portfolio`,
      icon: FolderKanban,
      path: '/admin/projects',
    },
    {
      title: 'Gallery Assets',
      value: gallery.length,
      desc: 'High-res photos & workshop media',
      icon: ImageIcon,
      path: '/admin/gallery',
    },
    {
      title: 'Customer Reviews',
      value: reviews.length,
      desc: `${pendingReviews.length} Pending Approval`,
      icon: Star,
      path: '/admin/reviews',
    },
    {
      title: 'New Inquiries',
      value: newInquiries.length,
      desc: 'Requires immediate phone response',
      icon: Inbox,
      path: '/admin/inquiries',
      highlight: newInquiries.length > 0,
    },
    {
      title: 'Completed Jobs',
      value: completedInquiries.length,
      desc: 'Delivered customer inquiries',
      icon: CheckCircle2,
      path: '/admin/inquiries',
    },
  ];

  const recentInquiries = inquiries.slice(0, 5);
  const recentProjects = projects.slice(0, 4);

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Top Banner / Welcome */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#121620] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500 block mb-1">
            Operations Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-white font-heading tracking-tight">
            Engineering Works Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Overview of inquiries, service configurations, portfolio items, and shop metadata.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/admin/services"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Add Service</span>
          </Link>
          <Link
            to="/admin/projects"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Add Project</span>
          </Link>
          <Link
            to="/admin/gallery"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Add Gallery</span>
          </Link>
          <Link
            to="/admin/settings"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Edit Settings</span>
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {statsCards.map((c, i) => {
          const Icon = c.icon;
          return (
            <Link
              key={i}
              to={c.path}
              className={`p-4 rounded-xl border transition-all block group ${
                c.highlight
                  ? 'bg-amber-950/20 border-amber-500/50 hover:border-amber-400'
                  : 'bg-[#10141c] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-black text-white font-heading tabular-nums group-hover:text-amber-400 transition-colors">
                  {c.value}
                </span>
                <Icon
                  className={`w-4 h-4 ${
                    c.highlight ? 'text-amber-400' : 'text-slate-500 group-hover:text-amber-400'
                  }`}
                />
              </div>
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-tight mb-0.5">
                {c.title}
              </h3>
              <p className="text-[11px] text-slate-400 line-clamp-1">{c.desc}</p>
            </Link>
          );
        })}
      </div>

      {/* Split Grid: Recent Inquiries & Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Inquiries List */}
        <div className="lg:col-span-7 bg-[#10141c] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-tight font-heading">
                Recent Customer Inquiries
              </h3>
              <p className="text-xs text-slate-400">Incoming requests from website forms</p>
            </div>
            <Link
              to="/admin/inquiries"
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentInquiries.length > 0 ? (
            <div className="space-y-3">
              {recentInquiries.map(inq => {
                const badgeVariant = {
                  New: 'amber',
                  Contacted: 'info',
                  'In Progress': 'warning',
                  Completed: 'success',
                  Cancelled: 'danger',
                }[inq.status] as any;

                return (
                  <div
                    key={inq.id}
                    className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <strong className="text-xs font-bold text-white truncate">
                          {inq.name}
                        </strong>
                        <Badge variant={badgeVariant} dot size="sm">
                          {inq.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 truncate">{inq.service}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {inq.description}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[11px] text-slate-500 block mb-1">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </span>
                      <a
                        href={`tel:${inq.phone}`}
                        className="inline-flex items-center gap-1 text-xs text-amber-400 hover:underline font-mono"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{inq.phone}</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-slate-500 py-6 text-center">No inquiries logged yet.</p>
          )}
        </div>

        {/* Recent Projects List */}
        <div className="lg:col-span-5 bg-[#10141c] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-tight font-heading">
                Recent Portfolio Projects
              </h3>
              <p className="text-xs text-slate-400">Public showcase items</p>
            </div>
            <Link
              to="/admin/projects"
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentProjects.map(proj => (
              <div
                key={proj.id}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800"
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={e => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-white truncate mb-0.5">{proj.title}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="text-amber-400">{proj.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{proj.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

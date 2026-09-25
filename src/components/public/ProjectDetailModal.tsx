import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '../common/Modal';
import { Project } from '../../types';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { MapPin, Calendar, CheckCircle2, User, FileText, ArrowRight } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  if (!project) return null;

  const hasBeforeAfter = !!(project.beforeImage && project.afterImage);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project.title}
      subtitle={`Category: ${project.category} · Completed: ${project.date}`}
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Before / After Slider or Single Visual */}
        {hasBeforeAfter ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Interactive Before / After Comparison
              </span>
              <span className="text-[11px] text-amber-400">Drag center slider to inspect</span>
            </div>
            <BeforeAfterSlider
              beforeImage={project.beforeImage!}
              afterImage={project.afterImage!}
            />
          </div>
        ) : (
          <div className="relative h-72 w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={e => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Project Meta Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">Location</span>
            <span className="font-semibold text-white flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              {project.location}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Timeline</span>
            <span className="font-semibold text-white flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              {project.date}
            </span>
          </div>
          {project.client && (
            <div className="col-span-2 sm:col-span-1">
              <span className="text-slate-400 block mb-0.5">Client / Partner</span>
              <span className="font-semibold text-white flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-amber-500" />
                {project.client}
              </span>
            </div>
          )}
        </div>

        {/* Project Description */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Project Overview &amp; Engineering Execution
          </h4>
          <p className="text-sm text-slate-200 leading-relaxed">{project.description}</p>
        </div>

        {/* Scope of Work */}
        {project.scope && project.scope.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Technical Scope &amp; Deliverables
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.scope.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inquire CTA */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Need a similar custom engineering solution for your facility?
          </p>
          <Link
            to={`/quote?service=${encodeURIComponent(project.category)}`}
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Request Similar Quote</span>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

import React from 'react';
import { Project } from '../../types';
import { MapPin, Calendar, ArrowRight, Eye, Layers } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewDetails }) => {
  return (
    <div
      onClick={() => onViewDetails(project)}
      className="flex flex-col bg-[#121620] border border-slate-800/90 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-200 group cursor-pointer shadow-lg"
    >
      {/* Project Thumbnail Image */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-900">
        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={e => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121620] via-[#121620]/20 to-transparent" />

        {/* Category Unboxed Tag */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-sm border border-slate-700/60 text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
          {project.category}
        </div>

        {project.beforeImage && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-slate-700 text-[10px] font-medium text-slate-300 flex items-center gap-1">
            <Layers className="w-3 h-3 text-amber-400" />
            <span>Before / After</span>
          </div>
        )}
      </div>

      {/* Card Info */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Row with typographic separator */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-500/80" />
              <span className="truncate max-w-[140px]">{project.location}</span>
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{project.date}</span>
            </span>
          </div>

          <h3 className="text-base font-bold text-white uppercase tracking-tight group-hover:text-amber-400 transition-colors mb-2.5 font-heading line-clamp-2">
            {project.title}
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">
            {project.client ? `Client: ${project.client}` : 'Structural Engineering'}
          </span>
          <span className="inline-flex items-center gap-1 text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
            <span>View Case</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};

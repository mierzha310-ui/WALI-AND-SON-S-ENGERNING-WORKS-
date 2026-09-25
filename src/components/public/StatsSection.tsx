import React from 'react';
import { Award, Briefcase, Users, Wrench } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const StatsSection: React.FC = () => {
  const { settings } = useShop();
  const { stats } = settings;

  const statItems = [
    {
      label: 'Years of Experience',
      value: `${stats.yearsExperience}+`,
      sub: 'Dedicated Engineering Since 1996',
      icon: Award,
    },
    {
      label: 'Projects Completed',
      value: `${stats.projectsCompleted.toLocaleString()}+`,
      sub: 'Industrial, Commercial & Structural',
      icon: Briefcase,
    },
    {
      label: 'Satisfied Clients',
      value: `${stats.happyClients.toLocaleString()}+`,
      sub: 'Factories, Contractors & Builders',
      icon: Users,
    },
    {
      label: 'Specialized Services',
      value: `${stats.servicesCount}+`,
      sub: 'In-House Welding & Machine Shop',
      icon: Wrench,
    },
  ];

  return (
    <section className="bg-[#0f131a] border-b border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {statItems.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="relative p-6 rounded-xl bg-[#141a24] border border-slate-800/80 hover:border-amber-500/40 transition-colors group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight tabular-nums group-hover:text-amber-400 transition-colors">
                    {stat.value}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-1">
                  {stat.label}
                </h3>
                <p className="text-xs text-slate-400">{stat.sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

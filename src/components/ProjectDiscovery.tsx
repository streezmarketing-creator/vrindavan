import React, { useState } from 'react';
import { MapPin, Eye, ArrowRight, Check } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS_DATA } from '../data/projectsData';
import { ProjectDetailModal } from './ProjectDetailModal';

import { PeacockMotif } from './PeacockMotif';

interface ProjectDiscoveryProps {
  onEnquireProject: (projectName: string) => void;
}

export const ProjectDiscovery: React.FC<ProjectDiscoveryProps> = ({ onEnquireProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'Township', label: 'Townships' },
    { id: 'Villas', label: 'Villas' },
    { id: 'Service Apartments', label: 'Studio & Suites' }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#EAE0D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#766144]">
            <PeacockMotif size={16} />
            <span>Vrindavan Property Portfolio</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F1A17] tracking-tight">
            Explore Projects in Vrindavan
          </h2>
          <p className="text-base sm:text-lg text-[#524439] leading-relaxed">
            Discover residential property options across Suncity Projects and find an option matching your requirements.
          </p>

          {/* Interactive Filter Tabs (functional segmented buttons) */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-[#EFE9DF] rounded-xs max-w-md mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xs transition-all uppercase tracking-wider ${
                  selectedCategory === cat.id
                    ? 'bg-[#2C241E] text-[#FAF8F5] shadow-xs'
                    : 'text-[#5C4D41] hover:text-[#1F1A17] hover:bg-[#E5DDD2]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="bg-white border border-[#E5DACD] rounded-xs overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col text-left group"
            >
              {/* Image Container */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-[#2C241E]">
                <img
                  src={project.image}
                  alt={`${project.name} property development in Vrindavan`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Quiet unboxed category label */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 text-[11px] font-semibold tracking-wider uppercase text-[#2C241E] border border-[#E0D5C7]">
                  {project.categoryLabel}
                </div>

                {/* Location overlay */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center gap-1.5 text-xs text-white/95">
                  <MapPin className="w-3.5 h-3.5 text-[#E5C9A6] shrink-0" />
                  <span className="truncate">{project.location}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1A17] tracking-tight group-hover:text-[#8A6736] transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-sm text-[#5C4D41] leading-relaxed line-clamp-3">
                    {project.shortDescription}
                  </p>

                  {/* Highlights / Options list */}
                  <div className="pt-2 border-t border-[#F0EAE1]">
                    <div className="text-xs font-semibold text-[#8C7A6B] uppercase tracking-wider mb-2">
                      Verified Options
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#3E3228]">
                      {project.propertyOptions.map((opt, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#2E7D52] shrink-0" />
                          <span>{opt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-[#EAE0D3] grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveModalProject(project)}
                    className="py-3 px-3 bg-[#FAF8F5] text-[#2C241E] border border-[#D5C7B6] hover:bg-[#F2ECE2] text-xs font-semibold rounded-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#9E7B4E]" />
                    <span>View Project</span>
                  </button>

                  <button
                    id={`project-enquire-${project.id}`}
                    type="button"
                    onClick={() => onEnquireProject(project.name)}
                    className="py-3 px-3 bg-[#2C241E] text-[#FAF8F5] hover:bg-[#43362C] text-xs font-semibold rounded-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Verification note underneath the grid */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-xs text-[#857466] leading-relaxed">
            * Project entries are published for enquiry and discovery purposes. Dimensions, pricing structures, layouts, and legal documentation are verified directly with the developer&apos;s authorised office prior to transaction.
          </p>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        onEnquire={onEnquireProject}
      />
    </section>
  );
};

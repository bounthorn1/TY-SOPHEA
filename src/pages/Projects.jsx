import { useEffect, useState } from 'react';
import api from '../services/api';
import SectionTitle from '../components/SectionTitle';
import { X, Eye, Wrench, CheckCircle2, CalendarDays } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => { api.get('/projects').then(res => setProjects(res.data)); }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  return (
    <section id="projects" className="container mx-auto px-6 py-20 scroll-mt-20">
      <SectionTitle title="My Projects" subtitle="Accounting Work" />
      
      {/* Added max-w-6xl mx-auto to reduce card width by ~10% */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map(proj => (
          <div key={proj.id} className="card flex flex-col !p-0 overflow-hidden group">
            {/* Image Top */}
            <div className="w-full h-48 overflow-hidden">
              <img 
                src={proj.image} 
                alt={proj.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
            </div>
            
            {/* Content Bottom */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{proj.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                {proj.description}
              </p>
              
              {/* Tags Preview */}
              <div className="flex flex-wrap gap-2 mb-6">
                {proj.tools?.slice(0, 2).map((tool, i) => (
                  <span key={i} className="bg-rose-100 text-primary-600 dark:bg-slate-700 dark:text-primary-400 text-xs px-3 py-1 rounded-full">
                    {tool}
                  </span>
                ))}
              </div>

              {/* Read More Button */}
              <button 
                onClick={() => setSelectedProject(proj)}
                className="btn-outline w-full mt-auto !py-2.5 text-sm flex items-center justify-center"
              >
                <Eye size={16} className="mr-2" /> Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup - A4 Size Layout */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm" 
          onClick={() => setSelectedProject(null)}
        >
          {/* A4 Aspect Ratio Container */}
          <div 
            className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl animate-fade-in w-full max-w-[800px] aspect-[210/297] max-h-[90vh] relative flex flex-col overflow-hidden" 
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 p-2 bg-rose-50 dark:bg-slate-700 rounded-full text-gray-500 hover:text-primary-500 hover:bg-rose-100 transition-colors z-20 shadow-md" 
              onClick={() => setSelectedProject(null)}
            >
              <X size={20} />
            </button>

            {/* Scrollable Content Area */}
            <div className="h-full overflow-y-auto p-8 md:p-12">
              <img 
                src={selectedProject.image} 
                className="w-full h-72 object-cover rounded-2xl mb-8 shadow-md" 
                alt={selectedProject.title} 
              />
              
              <div className="flex flex-wrap justify-between items-center mb-4 gap-2 pr-12">
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{selectedProject.title}</h3>
                {selectedProject.date && (
                  <span className="text-xs font-bold text-primary-600 bg-primary-50 dark:bg-slate-700 px-3 py-1.5 rounded-full inline-flex items-center">
                    <CalendarDays size={14} className="mr-1.5" /> {selectedProject.date}
                  </span>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-8">
                {selectedProject.description}
              </p>

              {/* Skills Used */}
              {selectedProject.skills && selectedProject.skills.length > 0 && (
                <div className="mb-8">
                  <h4 className="flex items-center text-sm font-bold text-gray-800 dark:text-white mb-4 uppercase tracking-wide">
                    <CheckCircle2 size={18} className="mr-2 text-primary-500" /> Skills Applied
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.skills.map((skill, i) => (
                      <span key={i} className="bg-rose-50 text-primary-600 dark:bg-slate-700 dark:text-primary-400 text-base px-5 py-2 rounded-full font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools Used */}
              {selectedProject.tools && selectedProject.tools.length > 0 && (
                <div className="mb-8">
                  <h4 className="flex items-center text-sm font-bold text-gray-800 dark:text-white mb-4 uppercase tracking-wide">
                    <Wrench size={18} className="mr-2 text-primary-500" /> Tools Used
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.tools.map((tool, i) => (
                      <span key={i} className="bg-slate-100 text-gray-700 dark:bg-slate-600 dark:text-gray-200 text-base px-5 py-2 rounded-full font-medium">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
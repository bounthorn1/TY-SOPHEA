import { useEffect, useState } from 'react';
import api from '../services/api';
import SectionTitle from '../components/SectionTitle';
import { Briefcase, ChevronRight } from 'lucide-react';

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  useEffect(() => { api.get('/experiences').then(res => setExperiences(res.data)); }, []);

  return (
    <section id="experience" className="container mx-auto px-6 py-20 scroll-mt-20">
      <SectionTitle title="Work Experience" subtitle="My Professional Journey" />
      
      <div className="max-w-4xl mx-auto relative">
        {/* Central/Left Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-100 dark:bg-slate-700 md:-translate-x-1/2"></div>
        
        <div className="space-y-12">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div key={exp.id} className={`relative flex w-full ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
                
                {/* Experience Card Wrapper - Increased width by reducing gap */}
                <div className={`w-full md:w-[calc(50%-1.5rem)] pl-14 md:pl-0 ${isLeft ? 'md:pr-6 md:text-right' : 'md:pl-6 md:text-left'}`}>
                  <div className="card hover:border-primary-200 transition-all duration-300 text-left">
                    
                    <div className={`flex flex-wrap justify-between items-center mb-3 gap-2 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                      <span className="text-sm font-bold text-primary-500 bg-rose-50 dark:bg-slate-700 px-4 py-1.5 rounded-full">
                        {exp.startDate} - {exp.endDate}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium flex items-center">
                        <ChevronRight size={16} className="mr-1 text-primary-400" /> {exp.location}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{exp.position}</h3>
                    <p className="text-lg font-semibold text-primary-600 mb-3">{exp.company}</p>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Responsibilities List */}
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className={`mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400 border-t border-rose-50 dark:border-slate-700 pt-4 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                        {exp.responsibilities.map((r, i) => (
                          <li key={i} className={`flex items-start ${isLeft ? 'md:flex-row-reverse md:inline-flex' : ''}`}>
                            <span className={`text-primary-400 mt-1 ${isLeft ? 'md:ml-3 ml-3' : 'mr-3'}`}>▹</span> 
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Timeline Dot/Icon */}
                <div className="absolute left-4 md:left-1/2 top-4 md:top-6 md:-translate-x-1/2 flex items-center justify-center w-10 h-10 bg-primary-500 rounded-full ring-8 ring-rose-50 dark:ring-slate-900 z-10 shadow-lg">
                  <Briefcase className="text-white w-5 h-5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
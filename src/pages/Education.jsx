import { useEffect, useState } from 'react';
import api from '../services/api';
import SectionTitle from '../components/SectionTitle';
import { GraduationCap, CalendarDays, MapPin } from 'lucide-react';

export default function Education() {
  const [education, setEducation] = useState([]);
  
  useEffect(() => { 
    api.get('/education').then(res => setEducation(res.data)); 
  }, []);

  return (
    <section id="education" className="container mx-auto px-6 py-20 scroll-mt-20">
      <SectionTitle title="My Education" subtitle="Academic Background" />
      
      {/* Updated to max-w-6xl to match other sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {education.map(edu => (
          <div key={edu.id} className="card !p-0 overflow-hidden flex flex-col hover:border-primary-200 transition-all duration-300 group">
            
            {/* Image Top */}
            <div className="w-full h-44 overflow-hidden">
              <img 
                src={edu.image || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80"} 
                alt={edu.university} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Content Bottom */}
            <div className="p-6 flex-1 flex flex-col">
              <span className="text-xs font-bold text-primary-600 bg-primary-50 dark:bg-slate-700 px-3 py-1.5 rounded-full inline-flex items-center w-fit mb-4">
                <CalendarDays size={14} className="mr-1.5" /> {edu.startYear} - {edu.graduationYear}
              </span>
              
              <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-start mb-2">
                <GraduationCap size={22} className="mr-2 text-primary-500 flex-shrink-0 mt-1" />
                {edu.degree}
              </h3>
              
              <p className="text-primary-600 font-semibold mb-4 flex items-center text-sm">
                <MapPin size={16} className="mr-1.5 text-gray-400" /> {edu.university}
              </p>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {edu.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
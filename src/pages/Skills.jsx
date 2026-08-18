import { useEffect, useState } from 'react';
import api from '../services/api';
import { Calculator, BookOpenCheck, FileText, Landmark, ReceiptText, Table2, Heart } from 'lucide-react';

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => { api.get('/skills').then(res => setSkills(res.data)); }, []);

  // Function to match the skill name with the correct icon
  const getIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('financial')) return Calculator;
    if (lowerName.includes('bookkeeping')) return BookOpenCheck;
    if (lowerName.includes('reporting')) return FileText;
    if (lowerName.includes('bank')) return Landmark;
    if (lowerName.includes('tax')) return ReceiptText;
    if (lowerName.includes('excel') || lowerName.includes('office')) return Table2;
    return Heart; // Default fallback icon
  };

  return (
    <section id="skills" className="container mx-auto px-6 py-20 scroll-mt-20">
      {/* Centered Header with Heart Icons */}
      <div className="text-center mb-16">
        <div className="flex justify-center items-center gap-4">
          <Heart className="text-primary-400 w-6 h-6 fill-primary-300" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">My Skills</h2>
          <Heart className="text-primary-400 w-6 h-6 fill-primary-300" />
        </div>
        <div className="w-20 h-1 bg-primary-300 mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 max-w-4xl mx-auto">
        {skills.map(skill => {
          const Icon = getIcon(skill.name);
          return (
            <div key={skill.id} className="group flex items-start space-x-4">
              {/* Icon Box */}
              <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 bg-primary-100 dark:bg-slate-700 rounded-2xl group-hover:bg-primary-500 transition-colors duration-300 shadow-sm">
                <Icon className="w-7 h-7 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" />
              </div>
              
              {/* Skill Content */}
              <div className="flex-1 mt-1 w-full">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800 dark:text-white text-lg">{skill.name}</h3>
                  <span className="text-primary-500 font-bold text-sm">{skill.percentage}%</span>
                </div>
                <div className="w-full bg-rose-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-primary-400 to-primary-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
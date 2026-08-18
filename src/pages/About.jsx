import { useEffect, useState } from 'react';
import api from '../services/api';
import SectionTitle from '../components/SectionTitle';
import { Heart, CheckCircle2, Briefcase, FolderKanban, FileText, Award } from 'lucide-react';

export default function About() {
  const [profile, setProfile] = useState(null);

  useEffect(() => { api.get('/profile').then(res => setProfile(res.data)); }, []);
  
  if (!profile) return <div className="text-center py-20">Loading...</div>;

  // Static services and stats to match the design
  const services = [
    "Financial Services",
    "Bookkeeping & Reporting",
    "Budget & Forecasting",
    "Tax Preparation",
    "Bank Reconciliation"
  ];

  const stats = [
    { value: "3+", label: "Years Experience", icon: Briefcase },
    { value: "20+", label: "Projects", icon: FolderKanban },
    { value: "10+", label: "Reports", icon: FileText },
    { value: "5+", label: "Certifications", icon: Award }
  ];

  return (
    <section id="about" className="container mx-auto px-6 py-20 scroll-mt-20">
      <SectionTitle title="About Me" subtitle="Get to know me" />
      
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Left Side - Image */}
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-primary-100 rounded-[3rem] transform rotate-6"></div>
          <div className="relative w-80 h-96 md:w-96 md:h-[500px] rounded-[3rem] overflow-hidden shadow-xl border-4 border-white dark:border-slate-800 z-10">
            <img 
              src={profile.profileImage} 
              alt="About Me" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side - Content */}
        <div>
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            Professional Accountant 
            <Heart className="ml-3 text-primary-500 fill-primary-300" size={28} />
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            I am a detail-oriented and reliable accountant passionate about numbers and delivering accurate financial results. With a strong commitment to excellence, I help businesses streamline their financial operations and achieve their goals.
          </p>

          {/* Services List */}
          <div className="mb-10 space-y-3">
            {services.map((service, index) => (
              <div key={index} className="flex items-center space-x-3 group">
                <CheckCircle2 className="text-primary-500 flex-shrink-0" size={22} />
                <span className="text-gray-700 dark:text-gray-200 font-medium group-hover:text-primary-600 transition-colors">
                  {service}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
        {stats.map((stat, index) => (
          <div key={index} className="card text-center !p-6 hover:-translate-y-2 hover:border-primary-200">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 dark:bg-slate-700 rounded-2xl mb-4">
              <stat.icon className="text-primary-600 dark:text-primary-400" size={26} />
            </div>
            <h4 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">{stat.value}</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
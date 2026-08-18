import { useEffect, useState } from 'react';
import api from '../services/api';
import { Download } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

export default function Resume() {
  const [data, setData] = useState({ profile: null, experiences: [], education: [] });

  useEffect(() => {
    Promise.all([
      api.get('/profile'),
      api.get('/experiences'),
      api.get('/education')
    ]).then(([profile, experiences, education]) => {
      setData({ profile: profile.data, experiences: experiences.data, education: education.data });
    });
  }, []);

  if (!data.profile) return <div className="text-center py-20">Loading...</div>;

  return (
    <section className="container mx-auto px-6 py-16">
      <SectionTitle title="My Resume" subtitle="Professional Profile" />
      
      <div className="text-center mb-12">
        <a href={data.profile.cvFile} download className="btn-primary inline-flex items-center">
          <Download size={18} className="mr-2" /> Download CV
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Experience</h3>
          {data.experiences.map(exp => (
            <div key={exp.id} className="card mb-6">
              <h4 className="text-lg font-semibold text-primary-600">{exp.position}</h4>
              <p className="text-gray-800 dark:text-white font-medium mb-2">{exp.company} | {exp.startDate} - {exp.endDate}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{exp.description}</p>
            </div>
          ))}
        </div>
        
        <div>
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Education</h3>
          {data.education.map(edu => (
            <div key={edu.id} className="card mb-6">
              <h4 className="text-lg font-semibold text-primary-600">{edu.degree}</h4>
              <p className="text-gray-800 dark:text-white font-medium mb-2">{edu.university} | {edu.startYear} - {edu.graduationYear}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
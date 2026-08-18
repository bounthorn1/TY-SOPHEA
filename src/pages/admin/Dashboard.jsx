import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Briefcase, GraduationCap, Award, FolderKanban, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState({ experiences: 0, education: 0, certifications: 0, projects: 0, messages: 0 });

  useEffect(() => {
    Promise.all([
      api.get('/experiences'),
      api.get('/education'),
      api.get('/certifications'),
      api.get('/projects'),
      api.get('/messages')
    ]).then(([exp, edu, cert, proj, msg]) => {
      setStats({
        experiences: exp.data.length,
        education: edu.data.length,
        certifications: cert.data.length,
        projects: proj.data.length,
        messages: msg.data.length
      });
    });
  }, []);

  const cards = [
    { title: 'Experiences', count: stats.experiences, icon: Briefcase, path: '/admin/experience' },
    { title: 'Education', count: stats.education, icon: GraduationCap, path: '/admin/education' },
    { title: 'Certifications', count: stats.certifications, icon: Award, path: '/admin/certifications' },
    { title: 'Projects', count: stats.projects, icon: FolderKanban, path: '/admin/projects' },
    { title: 'Messages', count: stats.messages, icon: MessageSquare, path: '/admin/messages' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map(card => (
          <Link to={card.path} key={card.title} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-lg transition-shadow">
            <div>
              <p className="text-gray-500 dark:text-gray-400">{card.title}</p>
              <p className="text-4xl font-bold text-gray-800 dark:text-white mt-2">{card.count}</p>
            </div>
            <div className="bg-primary-100 p-4 rounded-full">
              <card.icon className="text-primary-600" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
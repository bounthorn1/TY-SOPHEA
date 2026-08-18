import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Briefcase, GraduationCap, Award, FolderKanban, MessageSquare, LogOut } from 'lucide-react';

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menu = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Experience', path: '/admin/experience', icon: Briefcase },
    { name: 'Education', path: '/admin/education', icon: GraduationCap },
    { name: 'Certifications', path: '/admin/certifications', icon: Award },
    { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen flex bg-rose-50 dark:bg-slate-900">
      <aside className="w-64 bg-white dark:bg-slate-800 shadow-md p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-primary-600 mb-10">Admin Panel</h2>
        <nav className="space-y-2">
          {menu.map(item => (
            <Link key={item.name} to={item.path} className="flex items-center space-x-2 p-3 rounded-xl hover:bg-rose-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200">
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          ))}
          <button onClick={handleLogout} className="flex items-center space-x-2 p-3 rounded-xl text-red-500 hover:bg-red-50 w-full">
            <LogOut size={20} /> <span>Logout</span>
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
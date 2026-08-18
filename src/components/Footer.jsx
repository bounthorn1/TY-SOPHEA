import { Link } from 'react-router-dom';
import { Heart, Send, Globe, Mail, Calculator, TrendingUp, Wallet } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'Home', path: '#top' },
    { name: 'About', path: '#about' },
    { name: 'Skills', path: '#skills' },
    { name: 'Experience', path: '#experience' },
    { name: 'Projects', path: '#projects' },
  ];

  const services = [
    "Financial Accounting",
    "Bookkeeping & Reporting",
    "Tax Preparation",
    "Budget & Forecasting",
    "Bank Reconciliation"
  ];

  return (
    <footer className="bg-rose-50 dark:bg-slate-800 border-t border-rose-100 dark:border-slate-700 mt-20 relative overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand & Socials */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold">
              <span className="text-primary-600">Sophia</span><span className="text-gray-800 dark:text-white">Accounting</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Professional Accountant & Financial Specialist
            </p>
            <div className="flex space-x-4 pt-2">
              {/* Safe Icons Used Here */}
              <a href="#" className="p-2.5 bg-white dark:bg-slate-700 rounded-xl shadow-sm text-gray-500 hover:text-white hover:bg-primary-500 transition-colors duration-300">
                <Globe size={18} />
              </a>
              <a href="#" className="p-2.5 bg-white dark:bg-slate-700 rounded-xl shadow-sm text-gray-500 hover:text-white hover:bg-primary-500 transition-colors duration-300">
                <Send size={18} />
              </a>
              <a href="#" className="p-2.5 bg-white dark:bg-slate-700 rounded-xl shadow-sm text-gray-500 hover:text-white hover:bg-primary-500 transition-colors duration-300">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-5 flex items-center gap-2">
              <Heart size={16} className="text-primary-500 fill-primary-300" /> Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <a href={link.path} className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors duration-300 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-primary-300 rounded-full mr-3 group-hover:bg-primary-500 transition-colors"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: My Services */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-5 flex items-center gap-2">
              <Heart size={16} className="text-primary-500 fill-primary-300" /> My Services
            </h3>
            <ul className="space-y-3 text-sm">
              {services.map(service => (
                <li key={service} className="text-gray-600 dark:text-gray-400 flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-300 rounded-full mr-3"></span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Illustrations */}
          <div className="relative">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-5 flex items-center gap-2">
              <Heart size={16} className="text-primary-500 fill-primary-300" /> Newsletter
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Subscribe to get the latest financial tips.
            </p>
            <form className="flex space-x-2 mb-8">
              <input 
                type="email" 
                placeholder="Your email" 
                className="input-field !py-2.5 !px-4 text-sm flex-1" 
                required 
              />
              <button type="submit" className="btn-primary !p-2.5 flex items-center justify-center">
                <Send size={18} />
              </button>
            </form>

            {/* Accounting Illustrations (Icons) */}
            <div className="hidden lg:flex justify-end items-end space-x-6 opacity-40 dark:opacity-20 pointer-events-none absolute bottom-0 right-0">
              <Calculator size={64} className="text-primary-400" />
              <TrendingUp size={80} className="text-primary-500" />
              <Wallet size={56} className="text-primary-300" />
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-rose-100 dark:border-slate-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Sophea Accounting. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <p className="text-sm text-gray-500 italic">"Numbers that make sense."</p>
            <Link to="/admin" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
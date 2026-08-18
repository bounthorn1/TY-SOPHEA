import { useState, useEffect } from 'react';
import { Menu, Moon, Sun, X, Send, ChevronUp, Home, User, Briefcase } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showMoreSheet, setShowMoreSheet] = useState(false); // State for bottom sheet
  const { darkMode, setDarkMode } = useTheme();

  // Links for the fixed bottom navigation bar (Primary)
  const bottomNavLinks = [
    { name: 'Home', path: '#top', icon: Home },
    { name: 'About', path: '#about', icon: User },
    { name: 'Experience', path: '#experience', icon: Briefcase },
  ];

  // Links hidden inside the "More" bottom sheet (Secondary)
  const moreLinks = [
    { name: 'Skills', path: '#skills' },
    { name: 'Education', path: '#education' },
    { name: 'Projects', path: '#projects' },
    { name: 'Tools', path: '#tools' },
    { name: 'Gallery', path: '#gallery' },
    { name: 'Contact', path: '#contact' }
  ];

  // Desktop links (All of them)
  const desktopLinks = [...bottomNavLinks.map(({icon, ...l}) => l), ...moreLinks];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, path) => {
    e.preventDefault();
    if (path === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const section = document.querySelector(path);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
    setShowMoreSheet(false); // Close the sheet when a link is clicked
  };

  return (
    <>
      {/* Top Navbar (Mainly for Desktop) */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#top" onClick={(e) => handleClick(e, '#top')} className="text-2xl font-bold cursor-pointer">
            <span className="text-primary-600">Sophea</span><span className="text-gray-800 dark:text-white ml-1">Accounting</span>
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {desktopLinks.map(link => (
              <a 
                key={link.name} 
                href={link.path}
                onClick={(e) => handleClick(e, link.path)}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-rose-100 dark:hover:bg-slate-700 transition-colors">
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
            </button>
            
            <a href="#contact" onClick={(e) => handleClick(e, '#contact')} className="hidden lg:flex btn-primary !py-2.5 !px-6 text-sm items-center">
              Contact Me <Send size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Sheet (More Menu) */}
      {showMoreSheet && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end" onClick={() => setShowMoreSheet(false)}>
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"></div>
          
          {/* Sheet Content */}
          <div 
            className="relative w-full bg-white dark:bg-slate-800 rounded-t-3xl p-6 pb-24 shadow-2xl animate-fade-in" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-gray-300 dark:bg-slate-600 rounded-full mx-auto mb-6"></div>
            <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Explore More</h4>
            <div className="grid grid-cols-3 gap-4">
              {moreLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.path} 
                  onClick={(e) => handleClick(e, link.path)} 
                  className="bg-rose-50 dark:bg-slate-700 p-4 rounded-2xl text-center text-sm font-medium text-primary-600 dark:text-primary-300 hover:bg-primary-100 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <a href="#contact" onClick={(e) => handleClick(e, '#contact')} className="btn-primary w-full mt-6 flex items-center justify-center">
              Contact Me <Send size={16} className="ml-2" />
            </a>
          </div>
        </div>
      )}

      {/* Mobile Bottom App Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-rose-100 dark:border-slate-700">
        <div className="grid grid-cols-4">
          {/* Primary Links */}
          {bottomNavLinks.map(link => (
            <button 
              key={link.name} 
              onClick={(e) => handleClick(e, link.path)} 
              className="flex flex-col items-center py-3 text-gray-500 dark:text-gray-400 hover:text-primary-600 transition-colors"
            >
              <link.icon size={22} className="mb-1" />
              <span className="text-xs font-medium">{link.name}</span>
            </button>
          ))}

          {/* More Button */}
          <button 
            onClick={() => setShowMoreSheet(!showMoreSheet)} 
            className={`flex flex-col items-center py-3 transition-colors ${showMoreSheet ? 'text-primary-600' : 'text-gray-500 dark:text-gray-400 hover:text-primary-600'}`}
          >
            {showMoreSheet ? <X size={22} className="mb-1" /> : <Menu size={22} className="mb-1" />}
            <span className="text-xs font-medium">{showMoreSheet ? 'Close' : 'More'}</span>
          </button>
        </div>
      </div>
    </>
  );
}
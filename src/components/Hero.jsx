import { useEffect, useState } from 'react';
import { Calculator, TrendingUp, Sparkles, Send, Mail, Download, FileText, Award } from 'lucide-react';
import api from '../services/api';

// --- Custom SVG Icons (Safe, won't crash your app) ---
const TikTokIcon = ({ size = 21 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.51 3.15-5.86 3.21-1.75.07-3.5-.55-4.82-1.71-2.06-1.77-3.01-4.7-2.29-7.31.51-1.85 1.77-3.47 3.41-4.41 1.06-.61 2.31-.94 3.55-.92v4.13c-1.41-.4-3.04.45-3.52 1.83-.45 1.28.16 2.83 1.39 3.46 1.21.65 2.89.34 3.7-.82.36-.52.54-1.16.53-1.8.01-3.22 0-6.43 0-9.65.01-.08.02-.16.04-.24z"/>
  </svg>
);

const FacebookIcon = ({ size = 21 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
  </svg>
);

const InstagramIcon = ({ size = 21 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ size = 21 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
// ----------------------------------------------------

export default function Hero() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    api.get('/profile')
      .then(res => setProfile(res.data || {}))
      .catch(err => {
        console.error("Failed to fetch profile, using fallback data:", err);
        setProfile({
          name: 'Sreynich',
          bio: 'Dedicated accountant with 3+ years of experience in financial accounting, reporting, and bookkeeping. Passionate about helping businesses grow through accurate financial management.',
          profileImage: 'https://via.placeholder.com/400x500?text=Sreynich'
        });
      });
  }, []);

  return (
    <section id="top" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
      
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-rose-100 text-primary-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles size={19} />
            <span>Professional Accountant</span>
          </div>
          
          {/* Typography: "Hello, I'm" in Poppins, Name in Brittany Signature */}
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-800 dark:text-white">
            Hello, I'm
          </h1>
          <h2 
            className="text-primary-600 text-7xl md:text-9xl mb-4 leading-none font-signature" 
          >
            {profile.name || 'Sreynich'}
          </h2>
          
          <p className="text-lg text-primary-500 font-medium mb-6">
            Accountant | Financial Management | Bookkeeping
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg leading-relaxed">
            {profile.bio || 'Detail-oriented and motivated accounting professional with 1 year of experience in accounting and financial operations. Skilled in recording transactions, preparing financial reports, managing invoices, reconciling accounts, and supporting daily accounting activities. I am passionate about accuracy, organization, and continuous professional growth in the accounting field.'}
          </p>
          
          {/* Buttons with Icons */}
          <div className="flex flex-wrap gap-4 mb-10">
            <a href="#resume" onClick={(e) => e.preventDefault()} className="btn-primary inline-flex items-center justify-center">
              <Download size={21} className="mr-2" /> View My Resume
            </a>
            <a href="#contact" onClick={(e) => e.preventDefault()} className="btn-outline inline-flex items-center justify-center">
              Contact Me <Send size={21} className="ml-2" />
            </a>
          </div>

          {/* Social Icons Row - 6 Icons Total */}
          <div className="flex items-center space-x-5 border-t border-gray-100 dark:border-slate-700 pt-6">
            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Follow me:</span>
            <div className="flex space-x-3">
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center text-gray-500 hover:text-white hover:bg-primary-500 transition-all duration-300">
                <FacebookIcon size={21} />
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center text-gray-500 hover:text-white hover:bg-primary-500 transition-all duration-300">
                <InstagramIcon size={21} />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center text-gray-500 hover:text-white hover:bg-primary-500 transition-all duration-300">
                <LinkedinIcon size={21} />
              </a>
              <a href="#" aria-label="Telegram" className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center text-gray-500 hover:text-white hover:bg-primary-500 transition-all duration-300">
                <Send size={21} />
              </a>
              <a href="#" aria-label="Email" className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center text-gray-500 hover:text-white hover:bg-primary-500 transition-all duration-300">
                <Mail size={21} />
              </a>
              <a href="#" aria-label="TikTok" className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center text-gray-500 hover:text-white hover:bg-primary-500 transition-all duration-300">
                <TikTokIcon size={21} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Right Content - Image */}
        <div className="relative flex justify-center animate-fade-in">
          {/* Soft glowing background behind the image */}
          <div className="absolute inset-0 m-auto w-80 h-80 md:w-96 md:h-96 bg-primary-100 dark:bg-slate-700 rounded-full blur-2xl opacity-70"></div>
          
          <div className="relative w-80 h-[420px] md:w-96 md:h-[500px] rounded-[2.5rem] overflow-hidden border-[6px] border-white dark:border-slate-800 shadow-2xl z-10">
            <img 
              src={profile.profileImage || 'https://raw.githubusercontent.com/bounthorn1/Image/refs/heads/main/0a46f866-55a0-48fb-81e2-043331f93882.pnge'} 
              alt="Female Accountant" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent"></div>
          </div>
          
          {/* Floating Card 1: Experience (Top Left) */}
          <div className="absolute top-12 -left-4 md:-left-8 animate-float bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl flex items-center space-x-3 border border-rose-50 z-20">
            <div className="bg-primary-100 p-3 rounded-xl">
              <Calculator className="text-primary-600" size={23} />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-800 dark:text-white">3+</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Years Experience</p>
            </div>
          </div>

          {/* Floating Card 2: Projects Completed (Bottom Right) */}
          <div className="absolute bottom-16 -right-4 md:-right-8 animate-float bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl flex items-center space-x-3 border border-rose-50 z-20" style={{ animationDelay: '1s' }}>
            <div className="bg-rose-100 p-3 rounded-xl">
              <TrendingUp className="text-primary-600" size={23} />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-800 dark:text-white">20+</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Projects Completed</p>
            </div>
          </div>

          {/* Floating Card 3: Financial Reports (Top Right) */}
          <div className="absolute top-28 -right-4 md:-right-8 animate-float bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl flex items-center space-x-3 border border-rose-50 z-20" style={{ animationDelay: '0.5s' }}>
            <div className="bg-rose-100 p-3 rounded-xl">
              <FileText className="text-primary-600" size={23} />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-800 dark:text-white">10+</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Financial Reports</p>
            </div>
          </div>

          {/* Floating Card 4: Certifications (Bottom Left) */}
          <div className="absolute bottom-28 -left-4 md:-left-8 animate-float bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl flex items-center space-x-3 border border-rose-50 z-20" style={{ animationDelay: '1.5s' }}>
            <div className="bg-primary-100 p-3 rounded-xl">
              <Award className="text-primary-600" size={23} />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-800 dark:text-white">5+</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Certifications</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Send, Globe } from 'lucide-react';
import api from '../services/api';
import SectionTitle from '../components/SectionTitle';

export default function Contact() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [success, setSuccess] = useState(false);

  useEffect(() => { 
    api.get('/profile').then(res => setProfile(res.data)).catch(err => console.error(err)); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/messages', { ...formData, createdAt: new Date().toISOString().split('T')[0], read: false });
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  if (!profile) return <div className="text-center py-20">Loading contact info...</div>;

  const contactItems = [
    { icon: Mail, label: 'Email', value: profile.email },
    { icon: Phone, label: 'Phone', value: profile.phone },
    { icon: Send, label: 'Telegram', value: '@sreynich_accountant' },
    { icon: Globe, label: 'Facebook', value: 'facebook.com/sreynich.accounting' },
    { icon: MapPin, label: 'Location', value: profile.location }
  ];

  return (
    <section id="contact" className="container mx-auto px-6 py-20 scroll-mt-20 relative overflow-hidden">
      {/* Decorative Pink Floral Blobs */}
      <div className="absolute -top-10 right-0 w-[500px] h-[500px] bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 -left-20 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {/* Red Rose Flower Image Decoration */}
      <img 
        src="https://cdn.pngedits.com/uploads/preview/red-rose-flower-png-download-new-11615967443llzyjrbb8f.png" 
        alt="Red Rose Decoration" 
        className="absolute bottom-0 right-0 w-56 md:w-80 h-auto pointer-events-none z-20 -translate-x-1/4 drop-shadow-2xl"
      />
      
      {/* Added SectionTitle Here */}
      <SectionTitle title="Contact Me" subtitle="Let's connect" />

      {/* ONE Unified Card Container */}
      <div className="card !p-8 md:!p-12 max-w-6xl mx-auto relative z-10 overflow-hidden">
        
        <div className="grid lg:grid-cols-2 gap-12 relative z-10">
          
          {/* Left Side - Contact Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
              <Send className="text-primary-500" size={24} /> Get in Touch
            </h3>
            
            <div className="space-y-6 divide-y divide-rose-100 dark:divide-slate-700">
              {contactItems.map((item, index) => (
                <div key={index} className={`flex items-center space-x-5 group ${index > 0 ? 'pt-6' : ''}`}>
                  <div className="p-4 bg-primary-100 dark:bg-slate-700 rounded-2xl group-hover:bg-primary-500 transition-colors duration-300">
                    <item.icon className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-medium mb-1">{item.label}</p>
                    <p className="font-semibold text-gray-800 dark:text-white text-base md:text-lg break-all">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Form */}
          <form onSubmit={handleSubmit} className="space-y-5 lg:border-l lg:border-rose-100 dark:lg:border-slate-700 lg:pl-12">
            {success && (
              <div className="bg-green-100 text-green-700 p-4 rounded-xl font-medium flex items-center">
                <Send className="mr-2" size={18} /> Message sent successfully!
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Your Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  className="input-field" 
                  placeholder="John Doe" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Your Email</label>
                <input 
                  type="email" 
                  required 
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                  className="input-field" 
                  placeholder="john@example.com" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Subject</label>
              <input 
                type="text" 
                required 
                value={formData.subject} 
                onChange={e => setFormData({...formData, subject: e.target.value})} 
                className="input-field" 
                placeholder="Job Opportunity" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Your Message</label>
              <textarea 
                required 
                rows="5" 
                value={formData.message} 
                onChange={e => setFormData({...formData, message: e.target.value})} 
                className="input-field resize-none" 
                placeholder="Hello Sophia, I would like to..."
              ></textarea>
            </div>
            
            <button type="submit" className="btn-primary w-full flex items-center justify-center !py-3.5 text-base">
              <Send size={18} className="mr-2" /> Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
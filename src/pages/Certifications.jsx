import { useEffect, useState } from 'react';
import api from '../services/api';
import SectionTitle from '../components/SectionTitle';
import { X, Download, Eye, Award } from 'lucide-react';

export default function Certifications() {
  const [certs, setCerts] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => { api.get('/certifications').then(res => setCerts(res.data)); }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedCert]);

  return (
    <section id="certifications" className="container mx-auto px-6 py-20 scroll-mt-20">
      <SectionTitle title="My Certifications" subtitle="Professional Achievements" />
      
      {/* Added max-w-6xl mx-auto to reduce card width by ~10% */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {certs.map(cert => (
          <div key={cert.id} className="card flex flex-col !p-0 overflow-hidden group">
            
            {/* Image Top with Pink Badge */}
            <div className="relative w-full h-48 overflow-hidden">
              <img 
                src={cert.image} 
                alt={cert.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              
              {/* Pink Certificate Badge Icon (Top Left) */}
              <div className="absolute top-4 left-4 bg-primary-500 p-3 rounded-2xl shadow-lg z-10">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
            
            {/* Content Bottom */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{cert.name}</h3>
              <p className="text-primary-500 text-sm mb-3 font-medium">{cert.organization} | {cert.date}</p>
              
              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                {cert.description}
              </p>
              
              {/* View More Button */}
              <button 
                onClick={() => setSelectedCert(cert)}
                className="btn-outline w-full mt-auto !py-2.5 text-sm flex items-center justify-center"
              >
                <Eye size={16} className="mr-2" /> View More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {selectedCert && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm" 
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-lg w-full relative shadow-2xl animate-fade-in" 
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 p-2 bg-rose-50 dark:bg-slate-700 rounded-full text-gray-500 hover:text-primary-500 hover:bg-rose-100 transition-colors z-10" 
              onClick={() => setSelectedCert(null)}
            >
              <X size={20} />
            </button>
            
            <img src={selectedCert.image} className="w-full max-h-80 object-cover rounded-2xl mb-6" alt={selectedCert.name} />
            
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{selectedCert.name}</h3>
            <p className="text-primary-500 font-medium mb-4">{selectedCert.organization} | {selectedCert.date}</p>
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {selectedCert.description}
            </p>

            {/* Download Button */}
            {selectedCert.pdfUrl && (
              <a 
                href={selectedCert.pdfUrl} 
                download 
                className="btn-primary w-full flex items-center justify-center"
              >
                <Download size={18} className="mr-2" /> Download Certificate
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
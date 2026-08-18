import { useState } from 'react';
import { Images, X } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

// Static placeholder images related to accounting/office work
const galleryItems = [
  { id: 1, title: 'Trip', url: 'https://res.cloudinary.com/fdotp7p6/image/upload/v1786982497/photo_2026-08-16_16-11-44.jpg' },
  { id: 2, title: 'Love', url: 'https://res.cloudinary.com/fdotp7p6/image/upload/v1786981478/photo_2026-04-27_17-07-26.jpg' },
  { id: 3, title: 'Cute Girl', url: 'https://res.cloudinary.com/fdotp7p6/image/upload/v1786982346/photo_2026-04-27_17-11-31.jpg' },
  { id: 4, title: 'Trip', url: 'https://res.cloudinary.com/fdotp7p6/image/upload/v1786982825/photo_2026-06-26_07-11-21.jpg' },
  { id: 5, title: 'Trip', url: 'https://res.cloudinary.com/fdotp7p6/image/upload/v1786982833/photo_2026-06-26_22-04-01.jpg' },
  { id: 6, title: 'Trip', url: 'https://res.cloudinary.com/fdotp7p6/image/upload/v1786982839/photo_2026-04-22_21-23-15.jpg' },
];

export default function Gallery() {
  // State to track which image is clicked
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="gallery" className="container mx-auto px-6 py-20 scroll-mt-20 relative overflow-hidden">
      {/* Decorative Pink Floral Blobs */}
      <div className="absolute top-10 -left-10 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-rose-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>

      <SectionTitle title="My Gallery" subtitle="A glimpse into my professional world" />

      {/* Masonry/Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10">
        {galleryItems.map((item, index) => (
          <div 
            key={item.id} 
            // Added onClick to open the modal
            onClick={() => setSelectedImage(item)}
            className={`relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer ${index === 0 ? 'lg:col-span-2 lg:row-span-2 h-64 lg:h-full' : 'h-56'}`}
          >
            <img 
              src={item.url} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-primary-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center text-white mb-2">
                  <Images size={18} className="mr-2 text-primary-300" />
                  <span className="text-xs uppercase tracking-wider font-medium">Gallery</span>
                </div>
                <h3 className="text-white text-xl font-bold">{item.title}</h3>
              </div>
            </div>
            
            {/* Border Ring */}
            <div className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-primary-500/50 transition-all duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Image Pop-up (Modal / Lightbox) */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)} // Clicking outside the image closes it
        >
          <div 
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()} // Prevent clicking inside the image from closing it
          >
            {/* Close Button */}
            <button 
              className="absolute -top-12 right-0 text-white hover:text-primary-300 transition-colors"
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              <X size={32} />
            </button>
            
            {/* Big Image */}
            <img 
              src={selectedImage.url} 
              alt={selectedImage.title} 
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border-4 border-white/10" 
            />
            
            {/* Image Title */}
            <h3 className="text-white text-xl font-bold mt-4">{selectedImage.title}</h3>
          </div>
        </div>
      )}
    </section>
  );
}
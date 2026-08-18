import Hero from '../components/Hero';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';
import Education from './Education';
import Certifications from './Certifications';
import Projects from './Projects';
import Tools from './Tools';
import Gallery from './Gallery'; // <-- Added Gallery import here
import Resume from './Resume';
import Contact from './Contact';

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section (Zero Page) */}
      <Hero />
      
      {/* All sections stacked below the Hero */}
      <div id="about" className="scroll-mt-20">
        <About />
      </div>
      
      <div id="skills" className="scroll-mt-20">
        <Skills />
      </div>
      
      <div id="experience" className="scroll-mt-20">
        <Experience />
      </div>
      
      <div id="education" className="scroll-mt-20">
        <Education />
      </div>
      
      <div id="certifications" className="scroll-mt-20">
        <Certifications />
      </div>
      
      <div id="projects" className="scroll-mt-20">
        <Projects />
      </div>
      
      <div id="tools" className="scroll-mt-20">
        <Tools />
      </div>
      
      {/* Added Gallery Section here */}
      <div id="gallery" className="scroll-mt-20">
        <Gallery />
      </div>
      
      <div id="contact" className="scroll-mt-20">
        <Contact />
      </div>
    </div>
  );
}
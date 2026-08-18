import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Certifications from './pages/Certifications';
import Projects from './pages/Projects';
import Tools from './pages/Tools';
import Resume from './pages/Resume';
import Contact from './pages/Contact';

// Admin Pages
import AdminLayout from './admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Messages from './pages/admin/Messages';
import GenericCrud from './pages/admin/GenericCrud';
import { useAuth } from './context/AuthContext';

// Protected Route Wrapper
function ProtectedRoute({ children }) {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <Navigate to="/admin/login" />;
}

// Main Public Layout with Navbar and Footer
function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet /> {/* This is where the page content will load */}
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Public Routes Grouped Under PublicLayout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/education" element={<Education />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="experience" element={
            <GenericCrud 
              endpoint="experiences" 
              title="Manage Experience" 
              fields={[
                {name: 'position', label: 'Position'}, 
                {name: 'company', label: 'Company'}, 
                {name: 'description', label: 'Description'}
              ]} 
            />} 
          />
          <Route path="education" element={
            <GenericCrud 
              endpoint="education" 
              title="Manage Education" 
              fields={[
                {name: 'degree', label: 'Degree'}, 
                {name: 'university', label: 'University'}, 
                {name: 'description', label: 'Description'}
              ]} 
            />} 
          />
          <Route path="certifications" element={
            <GenericCrud 
              endpoint="certifications" 
              title="Manage Certifications" 
              fields={[
                {name: 'name', label: 'Name'}, 
                {name: 'organization', label: 'Organization'}, 
                {name: 'image', label: 'Image URL'}
              ]} 
            />} 
          />
          <Route path="projects" element={
            <GenericCrud 
              endpoint="projects" 
              title="Manage Projects" 
              fields={[
                {name: 'title', label: 'Title'}, 
                {name: 'description', label: 'Description'}, 
                {name: 'image', label: 'Image URL'}
              ]} 
            />} 
          />
          <Route path="messages" element={<Messages />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}
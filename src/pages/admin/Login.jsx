import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-primary-600 mb-6 text-center">Admin Login</h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-field" placeholder="Email" required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input-field" placeholder="Password" required />
          <button type="submit" className="btn-primary w-full">Login</button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-4">Use: admin@example.com / admin123</p>
      </div>
    </div>
  );
}
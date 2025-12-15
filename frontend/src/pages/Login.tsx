import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // 👁️ ikony
import Navbar from '../components/Home/Navbar/Navbar';
import './Login.scss';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || 'Błąd logowania');
        return;
      }

      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);

      // pobranie użytkownika żeby sprawdzić rolę
      const userRes = await fetch('http://localhost:8000/api/users/me/', {
        headers: { Authorization: `Bearer ${data.access}` },
      });

      const userData = await userRes.json();

      if (userData.role === 'community') {
        navigate('/dashboard');
      } else if (userData.role === 'authority') {
        navigate('/panel');
      } else {
        navigate('/'); // fallback
      }

    } catch (err) {
      setError('Błąd sieci');
    }
  };

  return (
    <div className="login-page">
      <Navbar />
      <div className="login-container">
        <h2>Logowanie</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Hasło"
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(prev => !prev)}
              aria-label={showPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" className="submit-btn">
            Zaloguj
          </button>
        </form>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Login;

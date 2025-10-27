import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');          // <-- zmiana z username na email
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), // <-- wysyłamy email
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || 'Błąd logowania');
        return;
      }

      // zapis tokenów JWT w localStorage
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);

      // przekierowanie na dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Błąd sieci');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2 style={{ textAlign: 'center' }}>Logowanie</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Hasło"
          required
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem', fontSize: '1rem', cursor: 'pointer' }}>Zaloguj</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '0.5rem', textAlign: 'center' }}>{error}</p>}
    </div>
  );
};

export default Login;

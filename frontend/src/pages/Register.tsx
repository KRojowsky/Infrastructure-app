import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.scss';
import Navbar from '../components/Home/Navbar/Navbar';
import society1 from '../assets/images/Home/main-section-4/society1.png';
import society2 from '../assets/images/Home/main-section-4/society2.png';

const areaOptions = [
  { value: "energy", label: "Energetyka" },
  { value: "water", label: "Woda / kanalizacja" },
  { value: "road", label: "Infrastruktura drogowa" },
  { value: "other", label: "Inne" },
];

const Register: React.FC = () => {
  const [role, setRole] = useState<'community' | 'authority' | null>(null);
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: '',
    city: '',
    office_name: '',
    area: '', // nowy field dla authority
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!role) {
      setError('Wybierz rolę!');
      return;
    }

    if (form.password !== form.password2) {
      setError('Hasła nie są takie same.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/auth/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(JSON.stringify(data));
        return;
      }

      setSuccess('Rejestracja zakończona pomyślnie! Przekierowanie do logowania...');
      setTimeout(() => navigate('/login'), 2000);
    } catch {
      setError('Błąd sieci');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="register-page">
        <div className="register-left">
          <h2>Rejestracja</h2>
          <div className="role-selection">
            <div
              className={`role-card image-card ${role === 'authority' ? 'selected' : ''}`}
              onClick={() => setRole('authority')}
            >
              <img src={society1} alt="Władze terytorialne" />
              <span className="role-title">Władze terytorialne</span>
            </div>

            <div
              className={`role-card image-card ${role === 'community' ? 'selected' : ''}`}
              onClick={() => setRole('community')}
            >
              <img src={society2} alt="Społeczność" />
              <span className="role-title">Społeczność</span>
            </div>
          </div>
          <small className="disclaimer">
            *Dołączanie do grupy władz terytorialnych wiąże się z procesem weryfikacji przez administrację systemu INFRAFIX.
          </small>
        </div>

        <div className="register-right">
          {role ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Imię</label>
                <input type="text" name="first_name" value={form.first_name} onChange={handleInput} required />
              </div>
              <div className="form-group">
                <label>Nazwisko</label>
                <input type="text" name="last_name" value={form.last_name} onChange={handleInput} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={form.email} onChange={handleInput} required />
              </div>
              <div className="form-group">
                <label>Miejscowość</label>
                <input type="text" name="city" value={form.city} onChange={handleInput} />
              </div>

              {role === 'authority' && (
                <>
                  <div className="form-group">
                    <label>Nazwa urzędu</label>
                    <input type="text" name="office_name" value={form.office_name} onChange={handleInput} />
                  </div>
                  <div className="form-group">
                    <label>Zakres działania</label>
                    <select name="area" value={form.area} onChange={handleInput} required>
                      <option value="">Wybierz zakres działania</option>
                      {areaOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <div className="form-group">
                <label>Hasło</label>
                <input type="password" name="password" value={form.password} onChange={handleInput} required />
              </div>
              <div className="form-group">
                <label>Powtórz hasło</label>
                <input type="password" name="password2" value={form.password2} onChange={handleInput} required />
              </div>
              <button type="submit">Zarejestruj</button>
              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}
            </form>
          ) : (
            <p>Wybierz rolę po lewej stronie, aby wypełnić formularz.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;

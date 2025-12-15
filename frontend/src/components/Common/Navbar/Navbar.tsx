import React, { useEffect, useState } from 'react';
import logo from '../../../assets/images/Home/navbar/logo.png';
import './Navbar.scss';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  role: 'community' | 'authority';
  office_name?: string;
  avatar?: string;
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('access');
      if (!token) return;

      try {
        const res = await fetch('http://localhost:8000/api/users/me/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Nie można pobrać użytkownika');
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const avatarUrl =
    user?.avatar || `https://i.pravatar.cc/150?u=${user?.first_name || 'placeholder'}`;

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="navbar-center">
        <select className="navbar-filter">
          <option>Status</option>
          <option value="pending">Oczekujące</option>
          <option value="in-progress">W trakcie</option>
          <option value="done">Zakończone</option>
        </select>

        <select className="navbar-filter">
          <option>Priorytet</option>
          <option value="low">Niski</option>
          <option value="medium">Średni</option>
          <option value="high">Wysoki</option>
        </select>
      </div>

      <div className="navbar-right">
        <img src={avatarUrl} className="navbar-avatar" alt="Avatar" />

        {user ? (
          <Link to="/profile" className="navbar-name">
            {user.role === 'authority'
              ? `${user.office_name }`
              : `${user.first_name} ${user.last_name}`}
          </Link>
        ) : (
          <span className="navbar-name">Gość</span>
        )}

        {user && (
          <button
            onClick={handleLogout}
            className="logout-button"
            title="Wyloguj się"
          >
            <LogOut size={20} strokeWidth={2.2} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;

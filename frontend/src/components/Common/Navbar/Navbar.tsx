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

interface NavbarProps {
  statusFilter: string;
  priorityFilter: string;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  statusFilter,
  priorityFilter,
  onStatusChange,
  onPriorityChange,
}) => {
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

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="navbar">
      {/* FILTRY */}
      <div className="navbar-center">
        <select
          className="navbar-filter"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="">Wszystkie statusy</option>
          <option value="pending">Oczekujące</option>
          <option value="in-progress">W trakcie</option>
          <option value="done">Zakończone</option>
        </select>

        <select
          className="navbar-filter"
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value)}
        >
          <option value="">Wszystkie priorytety</option>
          <option value="low">Niski</option>
          <option value="medium">Średni</option>
          <option value="high">Wysoki</option>
        </select>
      </div>

      {/* PRAWY PANEL */}
      <div className="navbar-right">
        {user?.avatar && (
          <Link to="/profile" className="navbar-avatar-link">
            <img
              src={user.avatar}
              className="navbar-avatar"
              alt="Avatar"
            />
          </Link>
        )}

        {user ? (
          <Link to="/profile" className="navbar-name">
            {user.role === 'authority'
              ? user.office_name
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

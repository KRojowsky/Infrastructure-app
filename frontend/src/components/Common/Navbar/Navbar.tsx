import React, { useEffect, useState } from 'react';
import logo from '../../../assets/images/Home/navbar/logo.png';
import './Navbar.scss';
import { useNavigate } from 'react-router-dom';

interface User {
  first_name: string;
  last_name: string;
  avatar?: string;
}

const Navbar: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) return;

            try {
                const res = await fetch('http://localhost:8000/api/users/me/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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

    const avatarUrl = user?.avatar || `https://i.pravatar.cc/150?u=${user?.first_name || 'placeholder'}`;

    const handleLogout = () => {
        // usuwa tokeny z localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
        navigate('/'); // przekierowanie na stronę główną
    };

    return (
        <header className='navbar'>
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
                <img src={avatarUrl} className='navbar-avatar' />
                <span>{user ? `${user.first_name} ${user.last_name}` : 'Gość'}</span>
                {user && (
                    <button 
                        onClick={handleLogout} 
                        className="logout-button"
                        title="Wyloguj się"
                        style={{ marginLeft: '10px', cursor: 'pointer' }}
                    >
                        🔒
                    </button>
                )}
            </div>
        </header>
    );
};

export default Navbar;

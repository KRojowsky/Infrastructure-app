import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Common/Sidebar/Sidebar';
import SidebarMobile from '../../../components/Common/SidebarMobile/SidebarMobile';
import Navbar from '../../../components/Common/Navbar/Navbar';
import axios from 'axios';
import './Settings.scss';

interface UserData {
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string | File;
}

const SettingsPage: React.FC = () => {
  const [user, setUser] = useState<UserData>({
    email: '',
    first_name: '',
    last_name: '',
    avatar: undefined,
  });

  const token = localStorage.getItem('access');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/users/me/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({
          email: res.data.email,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          avatar: res.data.avatar,
        });
      } catch (err) {
        console.error('Błąd pobierania profilu', err);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUser({ ...user, avatar: e.target.files[0] });
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('email', user.email);
      formData.append('first_name', user.first_name);
      formData.append('last_name', user.last_name);
      if (user.avatar instanceof File) {
        formData.append('avatar', user.avatar);
      }

      await axios.patch('http://localhost:8000/api/users/me/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Dane zapisane!');
    } catch (err) {
      console.error('Błąd zapisu', err);
      alert('Nie udało się zapisać danych.');
    }
  };

  return (
    <div className="layout-layout">
      <Sidebar />
      <SidebarMobile />

      <div className="layout-main">
        <Navbar />

        <div className="layout-content">
          <section className="layout-feed settings-section">
            <h2>Ustawienia profilu</h2>

            <div className="settings-form">
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </label>

              <label>
                Imię
                <input
                  type="text"
                  name="first_name"
                  value={user.first_name}
                  onChange={handleChange}
                />
              </label>

              <label>
                Nazwisko
                <input
                  type="text"
                  name="last_name"
                  value={user.last_name}
                  onChange={handleChange}
                />
              </label>

              <label>
                Avatar
                <input type="file" accept="image/*" onChange={handleAvatarChange} />
              </label>

              {user.avatar && typeof user.avatar === 'string' && (
                <div className="avatar-preview">
                  <img src={user.avatar} alt="Avatar" />
                </div>
              )}

              <button className="save-btn" onClick={handleSave}>
                Zapisz zmiany
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

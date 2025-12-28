import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Common/Sidebar/Sidebar';
import SidebarMobile from '../../../components/Common/SidebarMobile/SidebarMobile';
import Navbar from '../../../components/Common/Navbar/Navbar';
import axios from 'axios';
import './Settings.scss';

type Status = 'pending' | 'in-progress' | 'done' | '';
type Priority = 'low' | 'medium' | 'high' | '';

interface UserData {
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  avatarFile?: File;
}

const SettingsPage: React.FC = () => {
  const [user, setUser] = useState<UserData>({
    email: '',
    first_name: '',
    last_name: '',
    avatar: '',
  });

  const [statusFilter, setStatusFilter] = useState<Status>('');
  const [priorityFilter, setPriorityFilter] = useState<Priority>('');

  const token = localStorage.getItem('access');

  const fetchProfile = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/users/me/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({
        email: res.data.email || '',
        first_name: res.data.first_name || '',
        last_name: res.data.last_name || '',
        avatar: res.data.avatar_url || 'http://localhost:8000/media/avatars/avatar.svg',
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchProfile(); }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setUser(prev => ({
        ...prev,
        avatarFile: e.target.files[0],
        avatar: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('first_name', user.first_name);
      formData.append('last_name', user.last_name);
      if (user.avatarFile) formData.append('avatar', user.avatarFile);

      await axios.patch('http://localhost:8000/api/users/me/', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });

      alert('✅ Dane zapisane!');
      setUser(prev => ({ ...prev, avatarFile: undefined }));
      fetchProfile();
    } catch (err) {
      console.error(err);
      alert('❌ Nie udało się zapisać danych');
    }
  };

  return (
    <div className="layout-layout">
      <Sidebar />
      <SidebarMobile />
      <div className="layout-main">
        <Navbar
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
        />
        <div className="layout-content">
          <section className="layout-feed settings-section">
            <h2>Ustawienia profilu</h2>
            <div className="settings-card">
              <div className="avatar-box">
                <img src={user.avatar} alt="Avatar" />
                <label className="change-avatar">
                  Zmień avatar
                  <input type="file" accept="image/*" onChange={handleAvatarChange} hidden />
                </label>
              </div>
              <div className="settings-form">
                <label>Email<input type="email" value={user.email} disabled /></label>
                <label>Imię<input type="text" name="first_name" value={user.first_name} onChange={handleChange} /></label>
                <label>Nazwisko<input type="text" name="last_name" value={user.last_name} onChange={handleChange} /></label>
                <button className="save-btn" onClick={handleSave}>Zapisz zmiany</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

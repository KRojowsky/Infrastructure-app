import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "leaflet/dist/leaflet.css";

import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import Login from './pages/Login';
import Register from './pages/Register';
import NewReport from './components/Dashboard/NewReport/NewReport';
import History from './components/Dashboard/History/History';
import PanelPage from './components/PanelPage/PanelPage'; // ✅ import PanelPage
import PrivateRoute from './components/PrivateRoute';
import SettingsPage from './components/Dashboard/Settings/Settings';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Publiczne strony */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Chronione strony */}
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/new-report" element={<PrivateRoute><NewReport /></PrivateRoute>} />
        <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />

        {/* Panel dla władz terytorialnych */}
        <Route path="/panel" element={<PrivateRoute><PanelPage /></PrivateRoute>} />

        <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;

import React, { useState } from 'react';
import axios from 'axios';
import './MainSectionFifth.scss';

const MainSectionFifth: React.FC = () => {
  const [location, setLocation] = useState('');
  const [airData, setAirData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = '3b05665211a4dc8b2f66ff1ba4b372ed';

  const handleSearch = async () => {
    try {
      setLoading(true);
      const geoRes = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`
      );

      if (geoRes.data.length === 0) {
        alert('Nie znaleziono miejscowości.');
        setAirData(null);
        setLoading(false);
        return;
      }

      const { lat, lon } = geoRes.data[0];

      const airRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      setAirData(airRes.data.list[0]);
    } 

    catch (error) {
      setAirData(null);
    } 
    
    finally {
      setLoading(false);
    }
  };

  return (
    <section className="air-quality">
      <h2 className="air-quality-title">Monitoring jakości powietrza</h2>

      <div className="air-quality-content">
        <div className="air-quality-left">
          <input
            type="text"
            placeholder="Wpisz miejscowość..."
            value={location}
            onChange={e => setLocation(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            disabled={loading}
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Ładowanie...' : 'Wyszukaj'}
          </button>

          {airData && (
            <div className="air-quality-data">
              <p><strong>PM2.5:</strong> {airData.components.pm2_5} µg/m³</p>
              <p><strong>PM10:</strong> {airData.components.pm10} µg/m³</p>
              <p><strong>CO:</strong> {airData.components.co} µg/m³</p>
              <p><strong>NO2:</strong> {airData.components.no2} µg/m³</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainSectionFifth;

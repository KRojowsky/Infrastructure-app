import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import './MainSectionFifth.scss';
import 'leaflet/dist/leaflet.css';

const DEFAULT_POSITION = { lat: 52.2297, lon: 21.0122 };

const ChangeMapView: React.FC<{ coords: { lat: number; lon: number } }> = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([coords.lat, coords.lon], 12);
  }, [coords, map]);
  return null;
};

const MainSectionFifth: React.FC = () => {
  const [location, setLocation] = useState('');
  const [airData, setAirData] = useState<any>(null);
  const [coords, setCoords] = useState(DEFAULT_POSITION);
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
        return;
      }

      const { lat, lon } = geoRes.data[0];
      setCoords({ lat, lon });

      const airRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      setAirData(airRes.data.list[0]);
    } catch (error) {
      alert('Błąd podczas pobierania danych.');
      setAirData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="air-quality" className="air-quality">
      <h2 className="air-quality-title">Monitoring jakości powietrza</h2>

      <div className="air-quality-content">
        <div className="air-quality-left">
          <input
            type="text"
            placeholder="Wpisz miejscowość..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
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

        <div className="air-quality-map">
          <MapContainer center={[DEFAULT_POSITION.lat, DEFAULT_POSITION.lon]} zoom={6} scrollWheelZoom={false} className="leaflet-container">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'/>
            <ChangeMapView coords={coords}/>
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default MainSectionFifth;

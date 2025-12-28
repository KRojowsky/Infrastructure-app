import React, { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./NewReport.scss";

const categories = [
  { value: "energy", label: "Energetyka" },
  { value: "water", label: "Woda / kanalizacja" },
  { value: "road", label: "Infrastruktura drogowa" },
  { value: "other", label: "Inne" },
];

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationPicker: React.FC<{
  setLocation: (coords: { lat: number; lon: number }) => void;
}> = ({ setLocation }) => {
  useMapEvents({
    click(e) {
      setLocation({ lat: e.latlng.lat, lon: e.latlng.lng });
    },
  });
  return null;
};

/** 🔹 centruje mapę po ustawieniu lokalizacji */
const RecenterMap: React.FC<{ lat: number; lon: number }> = ({ lat, lon }) => {
  const map = useMap();
  map.setView([lat, lon], 15);
  return null;
};

const NewReport: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("other");
  const [images, setImages] = useState<FileList | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLocate = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => alert("Nie udało się pobrać lokalizacji.")
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) {
      alert("Najpierw wybierz lub pobierz lokalizację!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("latitude", String(location.lat));
    formData.append("longitude", String(location.lon));

    if (images) {
      Array.from(images).forEach((file) => formData.append("images", file));
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8000/api/reports/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      alert("✅ Zgłoszenie wysłane pomyślnie!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Błąd przy wysyłaniu zgłoszenia.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-report">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <span className="arrow">←</span>
        <span>Wróć</span>
      </button>

      <h2>➕ Nowe zgłoszenie</h2>

      <form onSubmit={handleSubmit}>
        <label>Tytuł zgłoszenia:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Opis problemu:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>Kategoria:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        <label>Zdjęcia:</label>
        <input type="file" multiple accept="image/*" onChange={(e) => setImages(e.target.files)} />

        <div className="map-container">
          <button type="button" onClick={handleLocate}>
            📍 Użyj mojej lokalizacji
          </button>

          <MapContainer
            center={location ? [location.lat, location.lon] : [52.2297, 21.0122]}
            zoom={13}
            style={{ height: "300px", width: "100%", borderRadius: "10px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationPicker setLocation={setLocation} />

            {location && (
              <>
                <RecenterMap lat={location.lat} lon={location.lon} />
                <Marker position={[location.lat, location.lon]} />
              </>
            )}
          </MapContainer>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Wysyłanie..." : "Dodaj zgłoszenie"}
        </button>
      </form>
    </div>
  );
};

export default NewReport;

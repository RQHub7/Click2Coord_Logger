import { useState, useRef, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { searchLocation } from './geocode';

function numberedIcon(number) {
  return L.divIcon({
    className: "numbered-pin",
    html: `<div class="numbered-pin-inner"><span class="numbered-pin-label">${number}</span></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28], // bottom-center, so it "points" at the click spot
  });
}

function SearchBar() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const map = useMap();
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (wrapperRef.current) {
      L.DomEvent.disableClickPropagation(wrapperRef.current);
      L.DomEvent.disableScrollPropagation(wrapperRef.current);
    }
  }, []);

  const handleKeyDown = async (e) => {
    if (e.key !== "Enter") return;
    try {
      setError(null);
      const result = await searchLocation(query);
      if (!result) {
        setError("No results found");
        return;
      }
      map.flyTo([result.lat, result.lon], 13, { duration: 1.2 });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      ref={wrapperRef}
      style={{ position: "absolute", top: 10, left: 50, zIndex: 1000 }}
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search a location…"
        style={{ padding: "8px", width: "220px" }}
      />
      {error && <div style={{ color: "red", fontSize: "12px" }}>{error}</div>}
    </div>
  );
}


function ClickToDropPin({ onPick }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function App() {
  const [pins, setPins] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const addPin = (lat, lng) => {
    setPins((prev) => [...prev, { lat, lng, id: Date.now() }]);
  };

  return (
    <>
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1 }}>
        <MapContainer center={[38.9366, -119.9866]} zoom={11} style={{ height: "100vh", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://carto.com/basemaps/">Carto</a> contributors'
            url={
              darkMode
                ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            }
          />
          <SearchBar />
          <ClickToDropPin onPick={addPin} />
          {pins.map((pin, index) => (
            <Marker 
              key={pin.id} 
              position={[pin.lat, pin.lng]}
              icon={numberedIcon(index + 1)}
               />
          ))}
        </MapContainer>
      </div>

      <div style={{ width: "260px", padding: "16px", overflowY: "auto" }}>
        <button onClick={() => setDarkMode((prev) => !prev)}>
          {darkMode ? "☀ Light mode" : "🌙 Dark mode"}
        </button>
        <h3>Pins ({pins.length})</h3>
        <ol>
          {pins.map((pin) => (
            <li key={pin.id}>
              Lat: {pin.lat.toFixed(4)}, Lng: {pin.lng.toFixed(4)}
            </li>
          ))}
        </ol>
      </div>
    </div>
    
    </>
  )
}

export default App

import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";


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

  const addPin = (lat, lng) => {
    setPins((prev) => [...prev, { lat, lng, id: Date.now() }]);
  };

  return (
    <>
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1 }}>
        <MapContainer center={[38.9366, -119.9866]} zoom={11} style={{ height: "100vh", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickToDropPin onPick={addPin} />
          {pins.map((pin) => (
            <Marker key={pin.id} position={[pin.lat, pin.lng]} />
          ))}
        </MapContainer>
      </div>

      <div style={{ width: "260px", padding: "16px", overflowY: "auto" }}>
        <h3>Pins ({pins.length})</h3>
        <ul>
          {pins.map((pin) => (
            <li key={pin.id}>
              Lat: {pin.lat.toFixed(4)}, Lng: {pin.lng.toFixed(4)}
            </li>
          ))}
        </ul>
      </div>
    </div>
    
    </>
  )
}

export default App

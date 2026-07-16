import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from "react-leaflet";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MapContainer center={[38.9366, -119.9866]} zoom={11} style={{ height: "75vh", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>

      <section id="center">
        <div className="hero">
        </div>
        <div>
          <h1>Dashboard Area</h1>

        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

    
    </>
  )
}

export default App

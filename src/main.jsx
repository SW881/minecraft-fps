import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Canvas } from '@react-three/fiber'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>
      <div id="aim"></div>
      <div id="bullets">10000/10000</div>
      <App />
    </div>
  </StrictMode>,
)

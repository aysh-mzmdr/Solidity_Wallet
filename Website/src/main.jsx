import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Web3Provider from "./Web3/Web3Provider.jsx"
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Web3Provider>
      <App />
    </Web3Provider>
  </StrictMode>,
)

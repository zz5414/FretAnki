import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import './App.css' // 주석 처리 또는 삭제
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/AuthProvider'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

  <BrowserRouter>
    <ToastContainer />
  <AuthProvider>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
    
  </AuthProvider>
    
  </BrowserRouter>
    
  </React.StrictMode>,
)

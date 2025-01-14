import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/auth/login"
import SignupPage from "./pages/auth/signup"
import RecoverPage from "./pages/auth/recover"
import HomePage from "./pages/dashboard/home"
import SettingsPage from "./pages/settings"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/recuperar" element={<RecoverPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        
        {/* Redirección por defecto */}
        <Route path="/" element={<Navigate to="/signup" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

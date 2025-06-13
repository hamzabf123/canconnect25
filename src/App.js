import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import './App.css';
import HomePage from './pages/HomePage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate and useLocation
import Lostitems from './pages/Lostitems';
import Urgence from './pages/Urgence';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Main from './pages/Main';
import LostitemsAdmin from './pages/LostitemsAdmin';
function App() {



  return (
    <Router>
      <Routes>
        <Route path="/login" element={ <LoginPage />} />
        <Route path="/moul_golssa" element={ <LostitemsAdmin/>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/recovery" element={<Lostitems />} />
        <Route path="/urgence" element={<Urgence />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/" element={<Navigate to="/Main" />} />
      </Routes>
    </Router>
  );
}

export default App;

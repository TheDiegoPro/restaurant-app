import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Register } from './auth/Register';
import Login from './auth/Login';
import Dashboard from './pages/Dashboard';
import { useAuth } from './contexts/AuthContext.jsx';

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path='/' element={
          !isAuthenticated ? <Register /> : <Navigate to="/dashboard" />
        }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App
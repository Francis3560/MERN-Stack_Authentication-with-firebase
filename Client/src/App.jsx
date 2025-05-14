import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Landing from './Pages/Landing';

export default function AppRoutes() {
  return (
    <div className="bg-black">
      <Routes>
         <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

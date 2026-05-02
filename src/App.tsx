import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GenericPage from './pages/GenericPage';
import About from './pages/About';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/careers" element={<GenericPage title="Careers" />} />
      <Route path="/contact" element={<GenericPage title="Contact" />} />
      <Route path="/privacy" element={<GenericPage title="Privacy Policy" />} />
      <Route path="/terms" element={<GenericPage title="Terms of Service" />} />
      <Route path="/cookies" element={<GenericPage title="Cookie Policy" />} />
    </Routes>
  );
}

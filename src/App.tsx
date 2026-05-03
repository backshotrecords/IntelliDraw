import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GenericPage from './pages/GenericPage';
import About from './pages/About';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import Research from './pages/Research';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/research" element={<Research />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/cookies" element={<Cookies />} />
    </Routes>
  );
}

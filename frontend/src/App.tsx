import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Pharmacist from './pages/Pharmacist';
import Provider from './pages/Provider';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pharmacist" element={<Pharmacist />} />
      <Route path="/provider" element={<Provider />} />
      {/* @TODO Error Page */}
      <Route path="*" element={<>Error</>} />
    </Routes>
  );
}

export default App;

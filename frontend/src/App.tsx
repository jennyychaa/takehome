import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AddPatient from './pages/AddPatient';
import Error from './pages/Error';
import Home from './pages/Home';
import Prescriptions from './pages/Prescriptions';
import Patients from './pages/Patients';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/patient/add" element={<AddPatient />} />
      <Route path="/prescriptions" element={<Prescriptions />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;

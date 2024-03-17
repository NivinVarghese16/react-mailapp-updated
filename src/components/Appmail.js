import React from 'react';
import Navbar from './Navbar';
import Sent from './Sent';
import Compose from './Compose';
import Draft from './Draft';
import { Route, Routes } from 'react-router-dom';
import Editdraft from './Editdraft';

const Appmail = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Sent />} /> 
        <Route path='/compose' element={<Compose />} />
        <Route path='/draft' element={<Draft />} />
        <Route path='/editdraft' element={<Editdraft />} />
      </Routes>
    </div>
  );
};

export default Appmail;

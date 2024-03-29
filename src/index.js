import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CurrentWrapped from './pages/CurrentWrapped/CurrentWrapped';
import Homepage from './pages/Homepage/Homepage';
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='' element={<Homepage />} />
      <Route path='/currentwrapped' element={<CurrentWrapped />} />
    </Routes>
  </BrowserRouter>
);
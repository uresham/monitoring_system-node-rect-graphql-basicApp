import React from 'react';
import Home from './controllers/home/Home';

import {
    Route,
    Routes
  } from 'react-router-dom';
import Layout from './components/layout/Layout';

  export default function Routers() {
    return(
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>} />
        </Route>
      </Routes>
    );
  };

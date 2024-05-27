import React from 'react';
import Container from 'react-bootstrap/Container';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import RoutePrivee from './utils/RoutePrivee.js';
import BarreDeNavigation from './utils/BarreDeNavigation.js';
import Page404 from './pages/Page404.js';

function App() {
  return (
    <Container>
      <BrowserRouter>
      <BarreDeNavigation />
      <Routes>
        <Route path="*" element={<Page404 />} /> 
        <Route element={<RoutePrivee />} >    
          {/* Inserer ici les routes privées */}
        </Route>               
      </Routes>
    </BrowserRouter>  
    </Container>
  );
}

export default App;

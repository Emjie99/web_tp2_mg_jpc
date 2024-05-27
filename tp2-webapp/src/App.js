import React from 'react';
import Container from 'react-bootstrap/Container';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import RoutePrivee from './utils/RoutePrivee.js';

function App() {
  return (
    <Container>
      <BrowserRouter>
      <Routes> 
        <Route element={<RoutePrivee />} >    
          {/* Inserer ici les routes privées */}
        </Route>               
      </Routes>
    </BrowserRouter>  
    </Container>
  );
}

export default App;

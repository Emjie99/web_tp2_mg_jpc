import React from 'react';
import Container from 'react-bootstrap/Container';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import RoutePrivee from './utils/RoutePrivee.js';
import BarreDeNavigation from './utils/BarreDeNavigation.js';
import PageAccueil from './pages/PageAccueil.js'
import Page404 from './pages/Page404.js';

function App() {
  return (
    <Container>
      <BrowserRouter>
        <BarreDeNavigation />
        <div className="w-50 mx-auto m-5">
          <Routes>
            <Route path="/" element={<PageAccueil />} />
            <Route path="*" element={<Page404 />} />
            <Route element={<RoutePrivee />} >
              {/* Inserer ici les routes privées */}
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </Container>
  );
}

export default App;

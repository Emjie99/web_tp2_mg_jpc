import React from 'react';
import Container from 'react-bootstrap/Container';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import RoutePrivee from './utils/RoutePrivee.js';
import BarreDeNavigation from './utils/BarreDeNavigation.js';
import PageAccueil from './pages/PageAccueil.js'
import Page404 from './pages/Page404.js';
import PageCreationClient from './pages/PageCreationClient.js';
import PageModifierClient from './pages/PageModifierClient.js';

function App() {
  return (
    <Container>
      <BrowserRouter>
        <BarreDeNavigation />
          <Routes>
            <Route path="/" element={<PageAccueil />} />
            <Route path="*" element={<Page404 />} />
            <Route element={<RoutePrivee />} >
              <Route path="/creation-client" element={<PageCreationClient />} />
              <Route path="/modification-client/:clientId" element={<PageModifierClient />} />
              {/* Inserer ici les routes privées */}
            </Route>
          </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;





import React from 'react';
import Container from 'react-bootstrap/Container';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import RoutePrivee from './utils/RoutePrivee.js';
import BarreDeNavigation from './utils/BarreDeNavigation.js';
import PageAccueil from './pages/PageAccueil.js'
import Page404 from './pages/Page404.js';
import PageCreationClient from './pages/PageCreationClient.js';
import PageGestionClient from './pages/PageGestionClient.js';
import PageListeClients from './pages/PageListeClients.js'
import PageGestionAdresse from './pages/PageGestionAdresse.js';
import PageSuppressionClient from './pages/PageSuppressionClient.js';

function App() {
  return (
    <Container>
      <BrowserRouter>
        <BarreDeNavigation />
          <Routes>
            <Route path="/" element={<PageAccueil />} />
            <Route path="*" element={<Page404 />} />
            <Route element={<RoutePrivee />} >
              <Route path="/clients" element={<PageListeClients />} />
              <Route path="/creation-client" element={<PageCreationClient />} />
              <Route path="/clients/:clientId" element={<PageGestionClient />} />
              <Route path="/adresses/:clientId" element={<PageGestionAdresse />} />
              <Route path="/suppression-client/:clientId" element={<PageSuppressionClient />} />
              {/* Inserer ici les routes privées */}
            </Route>
          </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;





import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AppItinerary from './components/itinerary.js';
import AppTrip from './components/trip.js';
import AppExpenses from './components/expenses.js';
import AppMedia from './components/media.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AppItinerary />} />  {/* Redirect root path to Itinerary */}
          <Route path="/trips" element={<AppTrip />} />
          <Route path="/expenses" element={<AppExpenses />} />
          <Route path="/media" element={<AppMedia />} />
          <Route path="/itinerary" element={<AppItinerary />} />  {/* Redirect root path to Itinerary */}

        </Routes>
      </Router>
    </div>
  );
}

export default App;

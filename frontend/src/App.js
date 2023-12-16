import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Itinerary from './components/itinerary.js';
import Trip from './components/trip.js';
import Expenses from './components/expenses.js';
import Media from './components/media.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Itinerary />} />  {/* Redirect root path to Itinerary */}
          <Route path="/trips" element={<Trip />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/media" element={<Media />} />
          <Route path="/itinerary" element={<Itinerary />} />  {/* Redirect root path to Itinerary */}

        </Routes>
      </Router>
    </div>
  );
}

export default App;

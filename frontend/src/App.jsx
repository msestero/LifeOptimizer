import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InvestmentForm from './pages/InvestmentForm';
import Home from './pages/home';

import {Chart as ChartJS} from "chart.js/auto"; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/basic_investment_calc" element={<InvestmentForm />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

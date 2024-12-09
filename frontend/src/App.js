import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./components/WelcomeScreen";

import CategorySelection from './components/CategorySelection';

function App() {
  return (
    <Router>
      <Routes>
        {/* Render the welcome screen at the root path */}
        <Route path="/" element={<WelcomeScreen />} />
        
        

      </Routes>
    </Router>
  );
}

export default App;

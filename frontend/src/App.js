
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./components/WelcomeScreen";
import TriviaScreen from "./components/TriviaScreen";
import CategorySelection from './components/CategorySelection';
import GameScreen from './components/GameScreen';

function App() {
  return (
    <Router>
      <Routes>
        {/* Render the welcome screen at the root path */}
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/CategorySelection" element={<CategorySelection />} />
        <Route path="/TriviaScreen" element={<TriviaScreen />} />
        <Route path="/GameScreen" element={<GameScreen />} />
        
        

      </Routes>
    </Router>
  );
}


export default App;

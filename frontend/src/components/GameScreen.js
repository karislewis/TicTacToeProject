// src/components/GameScreen.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GameScreen() {
  const navigate = useNavigate(); // Hook for navigating to different routes

  useEffect(() => {
    // Create a WebSocket connection to the server
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/myapp/1/");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Handle the game update (game state changes)
      if (data.action === "game_update") {
        // Handle game update logic here (update game state)
      }

      // Handle the navigation to trivia screen
      if (data.action === "navigate_to_trivia") {
        console.log("Navigating to Trivia Screen from WebSocket");
        navigate("/TriviaScreen"); // Navigate to trivia screen
      }
    };

    return () => {
      socket.close(); // Clean up when the component unmounts
    };
  }, [navigate]);

  return (
    <div>
      <h2>Game Screen</h2>
      {/* Your game screen JSX */}
    </div>
  );
}

export default GameScreen;

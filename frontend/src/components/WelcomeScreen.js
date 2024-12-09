import React from "react";
import { useNavigate } from "react-router-dom";

function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Floating Icons */}
      <div style={styles.icon} className="floating-icon" id="icon1">❓</div>
      <div style={styles.icon} className="floating-icon" id="icon2">💡</div>
      <div style={styles.icon} className="floating-icon" id="icon3">❓</div>
      <div style={styles.icon} className="floating-icon" id="icon4">💡</div>

      {/* Main Content */}
      <div style={styles.content}>
        <h1 style={styles.title}>Welcome to Tactical Trivia!</h1>
        <h2 style={styles.subtitle}>Are you ready for the challenge?</h2>

        {/* Existing Button (for /categories) */}
        <button 
        style={styles.button} 
        onClick={() => window.location.href = "/game_vs_computer/"}>
        Start Game
        </button>

      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
    background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)",
    overflow: "hidden",
    position: "relative",
  },
  content: {
    zIndex: 10, // Ensures the text appears above the icons
  },
  title: {
    fontSize: "3rem",
    color: "#102a43",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "1.5rem",
    color: "#627d98",
    marginBottom: "30px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1.2rem",
    color: "#fff",
    backgroundColor: "#627d98",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background 0.3s ease-in-out",
  },
  icon: {
    position: "absolute",
    fontSize: "3rem",
    color: "#ffb703",
    opacity: 0.7,
    animation: "float 8s infinite ease-in-out",
  },
};

export default WelcomeScreen;

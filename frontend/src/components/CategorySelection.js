import React from "react";
import { useNavigate } from "react-router-dom";

function CategorySelection() {
  const navigate = useNavigate();

  const categories = ["History", "Science", "Sports", "Music", "Movies"];

  const handleCategorySelect = (category) => {
    console.log("Selected Category:", category); // Debug log
    navigate("/trivia"); // Navigate to Trivia Screen
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Choose Your Trivia Category</h1>
      <div style={styles.grid}>
        {categories.map((category, index) => (
          <button
            key={index}
            style={styles.categoryButton}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
    paddingTop: "50px",
    background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)",
    height: "100vh",
  },
  title: {
    fontSize: "2.5rem",
    color: "#102a43",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 150px)",
    gap: "20px",
    justifyContent: "center",
    marginTop: "30px",
  },
  categoryButton: {
    padding: "15px 20px",
    fontSize: "1.2rem",
    backgroundColor: "#627d98",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease-in-out",
  },
};

export default CategorySelection;
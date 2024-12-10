import React from "react";
import { useNavigate } from "react-router-dom";


function CategorySelection() {
 const navigate = useNavigate();


 const categories = ["History", "Science", "Sports", "General"];


 const handleCategorySelect = (category) => {
   // Navigate to the TriviaScreen with the selected category
   navigate("/TriviaScreen", { state: { category } });
 };


 return (
   <div style={styles.container}>
     <h1 style={styles.title}>Select a Category</h1>
     <div style={styles.buttonsContainer}>
       {categories.map((category) => (
         <button
           key={category}
           style={styles.button}
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
   height: "100vh",
   display: "flex",
   flexDirection: "column",
   justifyContent: "center",
   alignItems: "center",
   background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)",
   fontFamily: "'Poppins', sans-serif",
 },
 title: {
   fontSize: "2.5rem",
   marginBottom: "20px",
   color: "#102a43",
 },
 buttonsContainer: {
   display: "flex",
   gap: "15px",
 },
 button: {
   padding: "15px 25px",
   fontSize: "1rem",
   backgroundColor: "#627d98",
   color: "#fff",
   border: "none",
   borderRadius: "8px",
   cursor: "pointer",
   transition: "background 0.3s ease-in-out",
 },
};


export default CategorySelection;





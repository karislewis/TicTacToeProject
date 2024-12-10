import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";


function TriviaScreen({ setNextPlayer }) {
 const navigate = useNavigate();
 const location = useLocation();
 const selectedCategory = location.state?.category || "History"; // Default to "History" if no category is provided


 // Questions organized by categories
 const triviaQuestions = {
   History: [
     { question: "What year did World War II end?", answer: "1945" },
     { question: "Who was the first president of the United States?", answer: "George Washington" },
     { question: "What year did the Titanic sink?", answer: "1912" },
   ],
   Science: [
     { question: "What planet is known as the Red Planet?", answer: "Mars" },
     { question: "What is the chemical symbol for water?", answer: "H2O" },
     { question: "Who developed the theory of relativity?", answer: "Einstein" },
   ],
   Sports: [
     { question: "How many players are there in a football team?", answer: "11" },
     { question: "Which country won the FIFA World Cup in 2018?", answer: "France" },
     { question: "What sport does Roger Federer play?", answer: "Tennis" },
   ],
   General: [
     { question: "What is the capital of France?", answer: "Paris" },
     { question: "Who painted the Mona Lisa?", answer: "Da Vinci" },
   ],
 };


 const [questions, setQuestions] = useState(triviaQuestions[selectedCategory]);
 const [currentQuestion, setCurrentQuestion] = useState(getRandomQuestion());
 const [inputAnswer, setInputAnswer] = useState("");
 const [feedback, setFeedback] = useState(null); // Correct or incorrect feedback
 const [loading, setLoading] = useState(false); // Handle backend communication delays


 function getRandomQuestion() {
   return questions[Math.floor(Math.random() * questions.length)];
 }


 useEffect(() => {
   setQuestions(triviaQuestions[selectedCategory]);
   setCurrentQuestion(getRandomQuestion());
 }, [selectedCategory]);


 const handleAnswerSubmit = async () => {
   const isCorrect = inputAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase();
   setFeedback(isCorrect ? "Correct!" : "Try to do better...");
   setLoading(true);


   // Handle CSRF token and backend communication
   const csrfTokenElement = document.querySelector('meta[name="csrf-token"]');
   if (!csrfTokenElement) {
     console.error("CSRF token meta tag not found.");
     return;
   }
   const csrfToken = csrfTokenElement.getAttribute('content'); // Get CSRF token


   try {
     const response = await fetch("/api/update-turn/", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "X-CSRFToken": csrfToken,
       },
       body: JSON.stringify({ is_correct: isCorrect }),
     });


     if (response.ok) {
       const data = await response.json();


       // If it's the computer's turn, simulate delay before navigating
       if (data.current_turn === "computer") {
         setTimeout(() => {
           window.location.href = "/game_vs_computer/";
         }, 2000); // Delay to allow feedback display
       } else {
         setCurrentQuestion(getRandomQuestion()); // Reset question for next turn
       }
     } else {
       console.error("Failed to update game state.");
     }
   } catch (error) {
     console.error("Error communicating with backend:", error);
   } finally {
     setLoading(false);
   }


   setInputAnswer(""); // Reset input answer after submitting
 };


 return (
   <div style={styles.container}>
     <h1 style={styles.title}>Trivia: {selectedCategory}</h1>


     <div style={styles.triviaBox}>
       <p style={styles.question}>{currentQuestion.question}</p>
       <input
         style={styles.input}
         type="text"
         placeholder="Your answer"
         value={inputAnswer}
         onChange={(e) => setInputAnswer(e.target.value)}
         disabled={loading} // Disable input while loading
       />
       <button style={styles.button} onClick={handleAnswerSubmit} disabled={loading}>
         {loading ? "Checking..." : "Submit"}
       </button>
     </div>


     {feedback && (
       <div style={styles.messageOverlay}>
         <div style={styles.messageBox}>
           <h3>{feedback}</h3>
           <button style={styles.button} onClick={() => setFeedback(null)}>
             {feedback === "Correct!" ? "Let's Play" : "Continue"}
           </button>
         </div>
       </div>
     )}
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
   fontFamily: "'Poppins', sans-serif",
   background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)",
   color: "#102a43",
 },
 title: {
   fontSize: "2.5rem",
   fontWeight: "600",
   marginBottom: "20px",
   textAlign: "center",
   color: "#102a43",
 },
 triviaBox: {
   backgroundColor: "#f7fafc",
   padding: "20px 30px",
   borderRadius: "8px",
   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
   width: "350px",
   display: "flex",
   flexDirection: "column",
   alignItems: "center",
 },
 question: {
   fontSize: "1.2rem",
   fontWeight: "500",
   marginBottom: "15px",
   textAlign: "center",
   color: "#334e68",
 },
 input: {
   width: "100%",
   padding: "10px",
   marginBottom: "15px",
   fontSize: "1rem",
   border: "1px solid #ccc",
   borderRadius: "5px",
   outline: "none",
   textAlign: "center",
   color: "#334e68",
   backgroundColor: "#fff",
 },
 button: {
   padding: "10px 20px",
   fontSize: "1rem",
   backgroundColor: "#627d98",
   color: "#fff",
   border: "none",
   borderRadius: "5px",
   cursor: "pointer",
   transition: "background 0.3s ease-in-out",
   opacity: "0.9",
 },
 messageOverlay: {
   position: "fixed",
   top: 0,
   left: 0,
   width: "100%",
   height: "100%",
   backgroundColor: "rgba(0, 0, 0, 0.5)",
   display: "flex",
   justifyContent: "center",
   alignItems: "center",
 },
 messageBox: {
   backgroundColor: "#fff",
   padding: "20px",
   borderRadius: "8px",
   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
   textAlign: "center",
 },
};


export default TriviaScreen;

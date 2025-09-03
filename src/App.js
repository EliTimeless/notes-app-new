import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./App.css";
import SignUp from "./SignUp";
import Login from "./Login";
import NotesApp from "./NotesApp";
import LandingPage from "./LandingPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import { ClipLoader } from "react-spinners";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#b081c5");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      setColor(currentUser ? "#b081c5" : "#36d7b7");
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <ClipLoader
          color={color}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage user={user} />} />
        <Route
          path="/notes"
          element={user ? <NotesApp /> : <Navigate to="/" />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

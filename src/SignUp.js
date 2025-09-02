import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";
import "./SignUp.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User created:", userCredential.user);
        navigate("/notes");
      })
      .catch((error) => {
        console.error("Error:", error.code, error.message);
        setEmailError("");
        setPasswordError("");

        if (error.code === "auth/weak-password") {
          setPasswordError("Password must be at least 6 characters long.");
        } else if (error.code === "auth/email-already-in-use") {
          setEmailError("This email is already registered.");
        } else if (error.code === "auth/invalid-email") {
          setEmailError("Invalid email address.");
        } else {
          setEmailError("Something went wrong. Please try again.");
        }
      });
  }

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="new-password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

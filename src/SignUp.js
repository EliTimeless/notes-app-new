import { Email, Password } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User created:", userCredential.user);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error:", error.code, error.message);
        if (error.code === "auth/weak-password") {
          setError("Password must be at least 6 characters long.");
        } else if (error.code === "auth/email-already-in-use") {
          setError("This email is already registered.");
        } else if (error.code === "auth/invalid-email") {
          setError("Invalid email address.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      });
  }

  return (
    <div>
      <h1>Sign Up Page</h1>
      <form>
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
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Sign Up
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

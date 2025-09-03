// Login.js
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const errorMessages = {
    "auth/user-not-found": "No user with this email.",
    "auth/wrong-password": "Wrong password.",
    "auth/invalid-email": "Invalid email address.",
    "auth/invalid-credential": "Wrong password or invalid credentials.", // přidáme tuto variantu
    "auth/user-disabled": "User account has been disabled.",
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/notes");
    } catch (error) {
      console.error("Error:", error.code, error.message);

      if (error.code === "auth/wrong-password") {
        setPasswordError("Wrong password.");
      } else if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-email"
      ) {
        setEmailError(
          errorMessages[error.code] || "Something went wrong. Please try again."
        );
      } else {
        setEmailError("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <div className="login">
      <h2>Login </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
        />
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError("");
          }}
        />
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

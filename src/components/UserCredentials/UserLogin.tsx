"use client";

// import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth } from "../../../firebaseConfig/firebase";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email.trim() || !password.trim()) {
        Swal.fire("Error", "Please fill in all fields", "error");
        return;
      }

      const emailRegexChecker = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegexChecker.test(email)) {
        Swal.fire("Error", "Please enter a valid email", "error");
        setLoading(false);
        return;
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { user } = userCredential;

      Swal.fire({
        title: "Success",
        text: "You have successfully signed in!",
        icon: "success",
        confirmButtonText: "Go to Dashboard",
      }).then(() => {
        window.location.href = "/HomePage";
      });

      setEmail("");
      setPassword("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Sign In error:", error);

      // Extract error message
      let errorMessage = "An unexpected error occurred. Please try again.";

      // Customize error messages based on error codes
      if (error.code === "auth/user-not-found") {
        errorMessage = "No user found with this email. Please register first.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is invalid.";
      }

      Swal.fire("Sign In Failed", errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default UserLogin;

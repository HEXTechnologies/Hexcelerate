"use client";

// import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth } from "../../../firebaseConfig/firebase";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";

const RegisterAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!email.trim() || !password.trim()) {
        Swal.fire("Error", "Please fill in all fields", "error");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      Swal.fire("Success", "Account created successfully", "success");

      setEmail("");
      setPassword("");
    } catch (error: any) {
      console.error("Registration error:", error);

      // Extract error message
      let errorMessage = "An unexpected error occurred. Please try again.";

      // Customize error messages based on error codes
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already in use. Please try logging in.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is invalid.";
      } else if (error.code === "auth/weak-password") {
        errorMessage =
          "The password is too weak. Please choose a stronger password.";
      }

      // Error feedback
      Swal.fire("Registration Failed", errorMessage, "error");
    }
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSignUp}>
        {/* Email Input */}
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

        {/* Password Input */}
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

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterAccount;

"use client";

import { auth, firestore } from "../../../firebaseConfig/firebase";
import React, { useState, useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";

type RegisterAccountProps = {
  selectedRole?: string | null;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RegisterAccount = ({ selectedRole }: RegisterAccountProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      Swal.fire("Error", "Please fill in all fields", "error");
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }

    if (
      !selectedRole ||
      (selectedRole !== "Companies" && selectedRole !== "Candidates")
    ) {
      Swal.fire("Error", "Invalid role selected", "error");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { user } = userCredential;

      const userData = {
        email: email,
        firebase_id: user.uid,
      };

      const userRef = doc(collection(firestore, selectedRole), user.uid);
      await setDoc(userRef, userData);

      Swal.fire("Success", "Account created successfully", "success");

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Registration error:", error);

      let errorMessage = "An unexpected error occurred. Please try again.";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already in use. Please try logging in.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is invalid.";
      } else if (error.code === "auth/weak-password") {
        errorMessage =
          "The password is too weak. Please choose a stronger password.";
      }

      Swal.fire("Registration Failed", errorMessage, "error");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center py-5"
      style={{ backgroundColor: "#000" }}
    >
      <div
        className="card bg-black text-white border"
        style={{
          borderRadius: "1rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <div className="card-body">
          <h2 className="card-title text-center mb-3">Create Your Account</h2>
          <p className="text-center mb-5">
            Enter your information to get started.
          </p>
          <form onSubmit={handleSignUp}>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "1px solid #444",
                  borderRadius: "0.5rem",
                  padding: "0.75rem",
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "1px solid #444",
                  borderRadius: "0.5rem",
                  padding: "0.75rem",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-5">
              <label className="form-label" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="form-control"
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "1px solid #444",
                  borderRadius: "0.5rem",
                  padding: "0.75rem",
                }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                required
              />
            </div>
            <div className="mb-4 d-flex justify-content-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                theme="dark"
              />
            </div>
            <div className="d-grid gap-2">
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  borderRadius: "20px",
                  padding: "10px",
                }}
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="text-center mt-3">
            Already have an account?{" "}
            <a href="SignIn" className="text-primary text-decoration-none">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterAccount;

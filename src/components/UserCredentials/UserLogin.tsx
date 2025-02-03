"use client";

import { auth } from "../../../firebaseConfig/firebase";
import React, { useState, useRef } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

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

      let errorMessage = "An unexpected error occurred. Please try again.";

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
          <h2 className="card-title text-center mb-3">Log In</h2>
          <p className="text-center mb-5">Enter your information to sign in.</p>

          <form onSubmit={handleLogin}>
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

            <div className="mb-5">
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
              <div className="d-flex justify-content-start mt-2">
                <a
                  href="/forgot-password"
                  className="text-primary"
                  style={{ fontSize: "0.9rem", textDecoration: "none" }}
                >
                  Forgot password?
                </a>
              </div>
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
                Log In
              </button>
            </div>
          </form>
          <p className="text-center mt-3">
            Don&apos;t have an account? <a href="Register">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;

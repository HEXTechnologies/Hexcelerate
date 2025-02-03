"use client";

import { auth } from "../../../firebaseConfig/firebase";
import React, { useState, useRef } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

      if (password !== confirmPassword) {
        Swal.fire("Error", "Passwords do not match", "error");
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
    <div className="login-container">
      <h2 className="text-3xl font-bold text-white text-center">Log In</h2>
      <p className="text-center text-white mb-4">
        Enter your information to sign in.
      </p>

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="form-label mb-2 text-white" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="form-control bg-black"
            style={{ color: "white" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label mb-2 text-white" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control bg-black"
            style={{ color: "white" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label mb-2 text-white" htmlFor="password">
            Confirm Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control bg-black"
            style={{ color: "white" }}
            value={password}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Enter your password"
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

        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary w-50 bg-blue border-white"
          >
            Log In
          </button>
        </div>
      </form>
      <p className="text-center mt-3 text-white">
        Don&apos;t have an account? <a href="Register">Sign Up</a>
      </p>
    </div>
  );
};

export default UserLogin;

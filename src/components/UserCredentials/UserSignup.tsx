"use client";

import { auth } from "../../../firebaseConfig/firebase";
import React, { useState, useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";

const RegisterAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

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

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { user } = userCredential;

      Swal.fire("Success", "Account created successfully", "success");

      setEmail("");
      setPassword("");
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
    <div className="register-container">
      <h2 className="text-3xl font-bold text-white text-center">
        Create Your Account
      </h2>
      <p className="text-center text-white mb-4">
        Enter your information to get started.
      </p>

      <form onSubmit={handleSignUp}>
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
            onChange={(e) => setPassword(e.target.value)}
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
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterAccount;

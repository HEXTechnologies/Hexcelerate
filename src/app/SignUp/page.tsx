"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import RegisterAccount from "../../components/UserCredentials/UserSignup";

export default function SignUp() {
  return (
    <div className="min-h-screen bg-black py-5">
      <div className="container">
        <Link
          href="/HomePage"
          className="text-white mb-5"
          style={{ display: "flex", alignItems: "center" }}
        >
          <ArrowLeft size={20} className="mr-2" />
        </Link>

        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div
              className="card bg-black border border-blue-800"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-4">
                <RegisterAccount />
                <div className="text-center mb-4">
                  <h2 className="text-3xl font-bold text-white">
                    Create Your Account
                  </h2>
                  <p className="text-white mt-2">
                    Enter your information to get started.
                  </p>
                </div>

                <div className="mb-4 d-flex justify-content-center"></div>

                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-50 bg-blue border-white"
                  >
                    Sign Up
                  </button>
                </div>
                <p className="text-center mt-3 text-white">
                  Already have an account? <a href="SignIn">Sign In</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

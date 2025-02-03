"use client";

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Register() {
  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-start py-5"
      style={{ backgroundColor: "#000" }}
    >
      <div className="container">
        <Link
          href="/HomePage"
          className="text-white mb-5 flex items-center"
          style={{ display: "flex", alignItems: "center" }}
        >
          <ArrowLeft size={20} className="me-2" />
        </Link>
        <div className="row justify-content-center pt-5">
          <div className="col-12 col-md-8 col-lg-6">
            <div
              className="card bg-black text-white border"
              style={{
                borderRadius: "1rem",
              }}
            >
              <div className="card-body p-4">
                <h2 className="card-title text-center mb-3">Reset Password</h2>
                <p className="text-center mb-4">...</p>
                <p className="text-center mt-3 mb-4 text-white">
                  Already have an account? <a href="SignIn">Log In</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

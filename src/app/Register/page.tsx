"use client";

import React from "react"; // Removed useState since we don't need it anymore
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Register() {
  const router = useRouter();

  // Combined role selection and signup into one function
  const handleRoleSelection = (role: string) => {
    router.push(`/SignUp?selectedRole=${encodeURIComponent(role)}`);
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-start py-5"
      style={{ backgroundColor: "#000" }}
    >
      <div className="container">
        <Link
          href="/HomePage"
          className="text-white flex items-center"
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
                <h2 className="card-title text-center mb-3">
                  Select a role to continue
                </h2>
                <p className="text-center mb-4">
                  Discover advanced features designed just for you.
                </p>
                <div className="text-center mb-3 mt-5">
                  <button
                    onClick={() => handleRoleSelection("Companies")}
                    className="btn btn-outline-light m-2 w-100 w-md-auto"
                    style={{
                      borderRadius: "20px",
                      padding: "10px 20px",
                      maxWidth: "400px",
                    }}
                  >
                    Companies
                  </button>
                </div>
                <div className="text-center mb-5">
                  <button
                    onClick={() => handleRoleSelection("Candidates")}
                    className="btn btn-outline-light m-2 w-100 w-md-auto"
                    style={{
                      borderRadius: "20px",
                      padding: "10px 20px",
                      maxWidth: "400px",
                    }}
                  >
                    Candidates
                  </button>
                </div>
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

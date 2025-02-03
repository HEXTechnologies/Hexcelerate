"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Register() {
  const [selectedRole, setSelectedRole] = useState("");
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRoleSelection = (role: any) => {
    setSelectedRole(role);
  };

  const handleSignUp = () => {
    router.push(`/SignUp?selectedRole=${encodeURIComponent(selectedRole)}`);
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center py-5"
      style={{ backgroundColor: "#000" }}
    >
      <div className="container">
        <Link
          href="/HomePage"
          className="text-white mb-4 d-flex align-items-center"
          style={{ textDecoration: "none" }}
        >
          <ArrowLeft size={20} className="me-2" />
          Back
        </Link>
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div
              className="card bg-dark text-white border"
              style={{
                borderRadius: "1rem",
              }}
            >
              <div className="card-body p-4">
                <h2 className="card-title text-center mb-3">
                  Sign up to unlock the full experience
                </h2>
                <p className="text-center mb-4">
                  You will have access to all features
                </p>
                <div className="text-center mb-3 mt-5">
                  <button
                    onClick={() => handleRoleSelection("Companies")}
                    className={`btn btn-outline-light m-2 ${
                      selectedRole === "Companies" ? "active" : ""
                    }`}
                    style={{ borderRadius: "20px", padding: "10px 150px" }}
                  >
                    Companies
                  </button>
                </div>
                <div className="text-center mb-3">
                  <button
                    onClick={() => handleRoleSelection("Candidates")}
                    className={`btn btn-outline-light m-2 ${
                      selectedRole === "Candidates" ? "active" : ""
                    }`}
                    style={{ borderRadius: "20px", padding: "10px 150px" }}
                  >
                    Candidates
                  </button>
                </div>
                {selectedRole && (
                  <div className="text-center mt-4">
                    <p>You selected {selectedRole}</p>
                    <button
                      onClick={handleSignUp}
                      className="btn btn-primary"
                      style={{ borderRadius: "20px", padding: "10px 150px" }}
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

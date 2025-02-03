"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Register() {
  const [selectedRole, setSelectedRole] = useState("");
  const router = useRouter();

  const handleRoleSelection = (role: any) => {
    setSelectedRole(role);
  };

  const handleSignUp = () => {
    router.push(`/SignUp?selectedRole=${encodeURIComponent(selectedRole)}`);
  };

  return (
    <div className="h-screen bg-black flex items-center justify-center py-5">
      <div className="container">
        <Link
          href="/HomePage"
          className="text-white mb-5 flex items-center"
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
                <div className="mb-4 d-flex justify-content-center">
                  {" "}
                  <div>
                    <h1>Sign up to unlock the full experience</h1>
                    <p>You will have access to all features</p>
                    <button onClick={() => handleRoleSelection("Companies")}>
                      Companies
                    </button>
                    <button onClick={() => handleRoleSelection("Candidates")}>
                      Candidates
                    </button>
                
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

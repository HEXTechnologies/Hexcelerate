"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import UserLogin from "../../components/UserCredentials/UserLogin";

export default function SignIn() {
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
                <UserLogin />
                <div className="mb-4 d-flex justify-content-center"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useRef } from "react";
import { ArrowLeft } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import UserLogin from "../../components/UserCredentials/UserLogin";

export default function LogIn() {
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

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
                <div className="text-center mb-4">
                  <h2 className="text-3xl font-bold text-white">Log In</h2>
                  <p className="text-white mt-2">
                    Enter your information to log in.
                  </p>
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
                    Sign In
                  </button>
                </div>
                <p className="text-center mt-3 text-white">
                  Don&apos;t have an account? <a href="SignUp">Sign Up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

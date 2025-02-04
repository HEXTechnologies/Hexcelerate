"use client";

import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import RegisterAccount from "../../components/UserCredentials/UserSignup";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const searchParams = useSearchParams();
  const selectedRole = searchParams.get("selectedRole");
  const router = useRouter();

  useEffect(() => {
    const allowedRoles = ["Companies", "Candidates"];
    if (!selectedRole || !allowedRoles.includes(selectedRole)) {
      router.push("/Register");
    }
  }, [selectedRole, router]);

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-start py-5"
      style={{ backgroundColor: "#000" }}
    >
      <div className="container">
        <Link
          href="/Register"
          className="text-white mb-5 flex items-center"
          style={{ display: "flex", alignItems: "center" }}
        >
          <ArrowLeft size={20} className="me-2" />
        </Link>

        <div className="row justify-content-center">
          <RegisterAccount selectedRole={selectedRole} />
        </div>
      </div>
    </div>
  );
}

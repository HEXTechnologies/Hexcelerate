/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { Component } from "react";
import { ArrowLeft } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import RegisterAccount from "../../components/UserCredentials/UserSignup";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

// Error Boundary
class ErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center text-white">
          <div>Something went wrong. Please try again later.</div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Separate component for navigation logic
function SignUpContent() {
  const searchParams = useSearchParams();
  const selectedRole = searchParams?.get("selectedRole");
  const router = useRouter();

  React.useEffect(() => {
    const allowedRoles = ["Companies", "Candidates"];
    if (!selectedRole || !allowedRoles.includes(selectedRole)) {
      router.push("/Register");
    }
  }, [selectedRole, router]);

  return (
    <div className="container">
      <Link
        href="/Register"
        className="text-white flex items-center"
        style={{ display: "flex", alignItems: "center" }}
      >
        <ArrowLeft size={20} className="me-2" />
      </Link>

      <div className="row justify-content-center">
        <RegisterAccount selectedRole={selectedRole} />
      </div>
    </div>
  );
}

export default function SignUpClient() {
  return (
    <ErrorBoundary>
      <SignUpContent />
    </ErrorBoundary>
  );
}
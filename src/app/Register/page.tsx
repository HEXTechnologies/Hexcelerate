"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";

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
    <div>
      <h1>Sign up to unlock the full experience</h1>
      <p>You will have access to all features</p>
    </div>
  );
}

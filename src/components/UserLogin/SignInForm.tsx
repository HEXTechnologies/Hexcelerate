"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/SignUpForm.css";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 2000);
  }

  return (
    <div className="signup-form-container">
      <div className="form-header">
        <h1>Log In</h1>
        <p>Enter your information</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="John Doe"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="john@example.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={isLoading ? "loading" : ""}
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <p className="sign-in-link">
        Don&apos;t have an account? <a href="SignUp">Sign Up</a>
      </p>
    </div>
  );
}

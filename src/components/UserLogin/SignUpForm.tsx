"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "./Logo";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard"); // Redirect to dashboard after successful sign-up
    }, 2000);
  }

  return (
    <div className="space-y-6 rounded-lg bg-white p-8 shadow-lg">
      <div className="space-y-2 text-center">
        <Logo className="mx-auto h-12 w-12 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Create an account</h1>
        <p className="text-sm text-gray-500">
          Enter your information to get started
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <a href="#" className="font-medium text-blue-600 hover:underline">
          Sign in
        </a>
      </p>
    </div>
  );
}

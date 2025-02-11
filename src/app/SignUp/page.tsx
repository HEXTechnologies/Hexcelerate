import { Suspense } from "react";
import SignUpClient from "./SignUpClient";

function Loading() {
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-start py-5"
      style={{ backgroundColor: "#000" }}
    >
      <Suspense fallback={<Loading />}>
        <SignUpClient />
      </Suspense>
    </div>
  );
}

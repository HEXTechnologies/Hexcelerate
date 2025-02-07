"use client";

import React, { useState, useEffect } from "react";
import { auth, firestore } from "../../../firebaseConfig/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Swal from "sweetalert2";

interface ProfileInputProps {
  onSubmit: (linkedInUrl: string) => Promise<void>;
  isLightMode: boolean;
}

const ProfileInput = ({ onSubmit, isLightMode }: ProfileInputProps) => {
  const [user, loading] = useAuthState(auth);
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCandidateData = async () => {
      if (!user?.uid) return;

      try {
        setIsLoading(true);
        const candidateRef = doc(firestore, "Candidates", user.uid);
        const candidateDoc = await getDoc(candidateRef);

        if (candidateDoc.exists()) {
          const data = candidateDoc.data();
          if (data.linkedInUrl) {
            setLinkedInUrl(data.linkedInUrl);
          }
        }
      } catch (err) {
        console.error("Error fetching candidate data:", err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to fetch profile data",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidateData();
  }, [user]);

  const validateLinkedInUrl = (url: string): boolean => {
    const linkedInRegex = /^https:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;
    return linkedInRegex.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) {
      Swal.fire({
        icon: "error",
        title: "Authentication Required",
        text: "You must be logged in to update your profile",
      });
      return;
    }

    if (!linkedInUrl.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing URL",
        text: "Please enter a LinkedIn URL",
      });
      return;
    }

    if (!validateLinkedInUrl(linkedInUrl)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid URL",
        text: "Please enter a valid LinkedIn profile URL",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Update Firestore
      const candidateRef = doc(firestore, "Candidates", user.uid);
      await setDoc(
        candidateRef,
        {
          linkedInUrl,
          updatedAt: new Date(),
          email: user.email,
        },
        { merge: true }
      );

      await onSubmit(linkedInUrl);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Profile updated successfully",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err instanceof Error ? err.message : "An error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cardStyle = {
    backgroundColor: isLightMode ? "#fff" : "#040411",
    color: isLightMode ? "#000" : "#fff",
    borderRadius: "1rem",
    borderColor: isLightMode ? "#dee2e6" : "#444",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "1.5rem",
    overflow: "hidden",
  };

  const inputStyle = {
    backgroundColor: isLightMode ? "#fff" : "#333",
    color: isLightMode ? "#333" : "#fff",
    border: `1px solid ${isLightMode ? "#dee2e6" : "#444"}`,
  };

  if (loading) {
    return (
      <div className="card" style={cardStyle}>
        <div className="card-body">
          <div className="placeholder-glow">
            <span className="placeholder col-12"></span>
            <span className="placeholder col-12"></span>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="card" style={cardStyle}>
        <div className="card-body">
          <div className="alert alert-warning" role="alert">
            Please sign in to update your profile.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mb-4">
      <div className="card" style={cardStyle}>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="linkedInUrl"
                className="form-label"
                style={{ color: isLightMode ? "#333" : "#fff" }}
              >
                LinkedIn Profile URL
              </label>
              <input
                id="linkedInUrl"
                type="url"
                className="form-control"
                value={linkedInUrl}
                onChange={(e) => setLinkedInUrl(e.target.value)}
                placeholder="https://linkedin.com/in/username"
                style={inputStyle}
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn gradient-button w-100"
              style={{
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileInput;

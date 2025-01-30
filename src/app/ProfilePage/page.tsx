"use client";

import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebaseConfig/firebase";
import { doc, setDoc } from "firebase/firestore";
import ProfileInput from "../../components/CandidateProfile/ProfileInput";
import ProfileDashboard from "../../components/CandidateProfile/ProfileDashboard";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const [user, loading] = useAuthState(auth);

  const handleProfileSubmit = async (linkedInUrl: string) => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "You must be logged in to perform this action",
      });
      return;
    }

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ linkedInUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch LinkedIn data");
      }

      const linkedInData = await response.json();

      // Save the enriched data to Firestore
      const candidateRef = doc(firestore, "Candidates", user.uid);
      await setDoc(
        candidateRef,
        {
          linkedInData,
          lastUpdated: new Date(),
        },
        { merge: true }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile updated successfully",
      });
    } catch (error) {
      console.error("Error in profile submission:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error instanceof Error
            ? error.message
            : "Failed to update profile. Please try again.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="animate-pulse max-w-4xl mx-auto">
          <div className="h-32 bg-gray-200 rounded-lg mb-8"></div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <ProfileInput onSubmit={handleProfileSubmit} />
        <ProfileDashboard />
      </div>
    </div>
  );
};

export default ProfilePage;

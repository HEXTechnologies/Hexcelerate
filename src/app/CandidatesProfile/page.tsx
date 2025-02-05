"use client";

import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebaseConfig/firebase";
import { doc, setDoc } from "firebase/firestore";
import ProfileDashboard from "../../components/CandidatesProfile/ProfileDashboard";
import ProfileSkeletons from "../../components/CandidatesProfile/ProfileSkeletons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles.css";
import "../../styles/Lightmode.css";
import "../../styles/HomeTopandIntro.css";
import "../../styles/HomeCategory.css";
import "../../styles/HomeHowItWorks.css";
import "../../styles/HomeChatBots.css";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const [user, loading] = useAuthState(auth);
  const [isLightMode, setIsLightMode] = useState(false);

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
          linkedInUrl,
          linkedInData,
          lastUpdated: new Date(),
          email: user.email,
        },
        { merge: true }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile updated successfully",
      });

      // Refresh the page to show the updated profile
      window.location.reload();
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
      <main className="HomeImageCt">
        <div className="container py-4 mt-5 mb-5">
          <div className="row justify-content-center mt-5 mb-5">
            <div className="col-12 col-lg-10">
              <div className="bottom-light left-light"></div>
              <div className="bottom-light right-light"></div>
              <ProfileSkeletons isLightMode={isLightMode} />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <ProfileDashboard
      userId={user?.uid}
      onSubmit={handleProfileSubmit}
      linkedInUrl={undefined}
    />
  );
};

export default ProfilePage;

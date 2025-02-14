/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const [isLightMode] = useState(false);

  const handleProfileSubmit = async (data: any) => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "You must be logged in to perform this action",
      });
      return;
    }

    try {
      // Determine if this is a URL or name search based on the data
      const isUrlSearch = typeof data === "string";
      const endpoint = isUrlSearch ? "/api/profile" : "/api/profile-search";
      const payload = isUrlSearch ? { linkedInUrl: data } : data;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch profile data");
      }

      const linkedInData = await response.json();

      // Save the enriched data to Firestore
      const candidateRef = doc(firestore, "Candidates", user.uid);
      await setDoc(
        candidateRef,
        {
          ...(isUrlSearch ? { linkedInUrl: data } : { searchData: data }),
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

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebaseConfig/firebase";
import { doc, setDoc } from "firebase/firestore";
import CompanyDashboard from "../../components/CompanyProfile/CompanyDashboard";
import CompanySkeletons from "../../components/CompanyProfile/CompanySkeletons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles.css";
import "../../styles/Lightmode.css";
import "../../styles/HomeTopandIntro.css";
import "../../styles/HomeCategory.css";
import "../../styles/HomeHowItWorks.css";
import "../../styles/HomeChatBots.css";
import Swal from "sweetalert2";

const CompanyPage = () => {
  const [user, loading] = useAuthState(auth);
  const [isLightMode] = useState(false);

  const handleCompanySubmit = async (data: {
    type: "url" | "domain";
    value: string;
  }) => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "You must be logged in to perform this action",
      });
      return;
    }

    try {
      // Use the type from the data object to determine the endpoint
      const endpoint =
        data.type === "url" ? "/api/company" : "/api/company-domain";
      const payload =
        data.type === "url"
          ? { linkedInUrl: data.value }
          : { domain: data.value };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch company data");
      }

      const companyData = await response.json();

      // Save the enriched data to Firestore
      const companyRef = doc(firestore, "Companies", user.uid);
      await setDoc(
        companyRef,
        {
          ...(data.type === "url"
            ? { linkedInUrl: data.value }
            : { domain: data.value }),
          companyData: companyData.company,
          lastUpdated: new Date(),
          email: user.email,
        },
        { merge: true }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Company profile updated successfully",
      });
    } catch (error) {
      console.error("Error in company submission:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error instanceof Error
            ? error.message
            : "Failed to update company profile. Please try again.",
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
              <CompanySkeletons isLightMode={isLightMode} />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <CompanyDashboard
      userId={user?.uid}
      onSubmit={handleCompanySubmit}
      companyUrl={undefined}
    />
  );
};

export default CompanyPage;

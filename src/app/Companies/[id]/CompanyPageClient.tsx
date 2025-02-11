/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebaseConfig/firebase";
import CompanyDashboard from "../../../components/OtherCompaniesProfile/CompanyDashboard";
import CompanySkeletons from "../../../components/CompanyProfile/CompanySkeletons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../styles.css";
import "../../../styles/Lightmode.css";
import "../../../styles/HomeTopandIntro.css";
import "../../../styles/HomeCategory.css";
import "../../../styles/HomeHowItWorks.css";
import "../../../styles/HomeChatBots.css";

interface CompanyPageClientProps {
  params: {
    id: string;
  };
}

const CompanyPageClient = ({ params }: CompanyPageClientProps) => {
  const [user, loading] = useAuthState(auth);
  const [isLightMode, setIsLightMode] = useState(false);

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

  if (!params?.id) {
    return (
      <main className="HomeImageCt">
        {" "}
        <div className="container py-4 mt-5 mb-5">
          <div className="row justify-content-center mt-5 mb-5">
            <div className="col-12 col-lg-10 text-center">
              <h2 className={isLightMode ? "text-dark" : "text-white"}>
                Company ID not provided
              </h2>
              <button
                onClick={() => window.history.back()}
                className="btn btn-primary gradient-button mt-3"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return <CompanyDashboard userId={params.id} companyUrl={undefined} />;
};

export default CompanyPageClient;

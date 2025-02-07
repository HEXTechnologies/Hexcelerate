"use client";

import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebaseConfig/firebase";
import ProfileDashboard from "../../../components/OtherCandidatesProfile/ProfileDashboard";
import ProfileSkeletons from "../../../components/CandidatesProfile/ProfileSkeletons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../styles.css";
import "../../../styles/Lightmode.css";
import "../../../styles/HomeTopandIntro.css";
import "../../../styles/HomeCategory.css";
import "../../../styles/HomeHowItWorks.css";
import "../../../styles/HomeChatBots.css";

interface ProfilePageClientProps {
  params: {
    id: string;
  };
}

const ProfilePageClient = ({ params }: ProfilePageClientProps) => {
  const [user, loading] = useAuthState(auth); // Make sure to destructure user as well
  const [isLightMode] = useState(false); // Remove setIsLightMode if not using it

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

  // Add a check for the user ID from params
  if (!params?.id) {
    return <div>No user ID provided</div>;
  }

  return <ProfileDashboard userId={params.id} linkedInUrl={undefined} />;
};

export default ProfilePageClient;

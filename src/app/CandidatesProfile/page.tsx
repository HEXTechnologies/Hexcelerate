/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles.css";
import "../../styles/Lightmode.css";
import "../../styles/HomeTopandIntro.css";
import "../../styles/HomeCategory.css";
import "../../styles/HomeHowItWorks.css";
import "../../styles/HomeChatBots.css";

import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebaseConfig/firebase";
import { doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";

import ProfileHeader from "../../components/CandidatesProfile/ProfileHeader";
import ProfileAbout from "../../components/CandidatesProfile/ProfileAbout";
import ProfileExperience from "../../components/CandidatesProfile/ProfileExperience";
import ProfileEducation from "../../components/CandidatesProfile/ProfileEducation";
import ProfileSkills from "../../components/CandidatesProfile/ProfileSkills";
import ProfileCertifications from "../../components/CandidatesProfile/ProfileCertifications";
import PreseedNavbar from "../../components/HomePageComponents/PreseedNavbar";

interface ProfileDashboardProps {
  userId?: string;
}

const ProfileDashboard = ({ userId }: ProfileDashboardProps) => {
  const [user] = useAuthState(auth);
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const currentUserId = userId || user?.uid;
        if (!currentUserId) return;

        const candidateRef = doc(firestore, "Candidates", currentUserId);
        const candidateDoc = await getDoc(candidateRef);

        if (candidateDoc.exists() && candidateDoc.data().linkedInData) {
          setProfileData(candidateDoc.data().linkedInData);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load profile data",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user, userId]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="container py-5">
        <div className="alert alert-info text-center" role="alert">
          No profile data available. Please add your LinkedIn profile.
        </div>
      </div>
    );
  }

  const { person } = profileData;

  return (
    <main className="HomeImageCt">
      <div className="container py-4 mt-5 mb-5">
        <div className="row justify-content-center mt-5 mb-5">
          <div className="col-12 col-lg-10">
            <div className="bottom-light left-light"></div>
            <div className="bottom-light right-light"></div>
            <PreseedNavbar
              isLightMode={isLightMode}
              setIsLightMode={setIsLightMode}
            />

            <ProfileHeader
              profilePicUrl={person.photoUrl}
              backgroundUrl={person.backgroundUrl}
              fullName={person.firstName + " " + person.lastName}
              headline={person.headline}
              location={person.location}
              isLightMode={isLightMode}
              schoolName={person.schools?.educationHistory[0]?.schoolName}
            />

            {person.summary && (
              <ProfileAbout
                summary={person.summary}
                headline={person.headline}
                openToWork={person.openToWork}
                isLightMode={isLightMode}
              />
            )}

            {person.positions?.positionHistory && (
              <ProfileExperience
                experiences={person.positions.positionHistory}
                isLightMode={isLightMode}
              />
            )}

            {person.schools?.educationHistory && (
              <ProfileEducation
                educations={person.schools.educationHistory}
                isLightMode={isLightMode}
              />
            )}

            {person.skills && (
              <ProfileSkills skills={person.skills} isLightMode={isLightMode} />
            )}

            {person.certifications?.certificationHistory && (
              <ProfileCertifications
                certifications={person.certifications.certificationHistory}
                isLightMode={isLightMode}
              />
            )}

            {/* Add a Download CV button */}
            <div className="text-center mt-4">
              <button
                className="btn gradient-button text-white"
                style={{
                  padding: "0.75rem 2rem",
                  fontSize: "1.1rem",
                  transition: "all 0.3s ease",
                }}
                onClick={() => {
                  Swal.fire({
                    icon: "info",
                    title: "Coming Soon",
                    text: "CV download feature will be available soon!",
                  });
                }}
              >
                Download CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileDashboard;

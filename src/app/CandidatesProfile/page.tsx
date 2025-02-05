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
import ProfileSkeletons from "../../components/CandidatesProfile/ProfileSkeletons";
import LikelihoodScore from "../../components/CandidatesProfile/LikelihoodScore";
import Navbar from "../../components/CandidatesProfile/Navbar";

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
      <main className="HomeImageCt">
        <div className="container py-4 mt-5 mb-5">
          <div className="row justify-content-center mt-5 mb-5">
            <div className="col-12 col-lg-10">
              <div className="bottom-light left-light"></div>
              <div className="bottom-light right-light"></div>
              <ProfileSkeletons isLightMode={isLightMode} />;
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!profileData) {
    return (
      <main className="HomeImageCt">
        <div className="container py-4 mt-5 mb-5">
          <div className="row justify-content-center mt-5 mb-5">
            <div className="col-12 col-lg-10">
              <div className="bottom-light left-light"></div>
              <div className="bottom-light right-light"></div>
              <ProfileSkeletons isLightMode={isLightMode} />;
            </div>
          </div>
        </div>
      </main>
    );
  }

  const { person } = profileData;

  return (
    <main className="HomeImageCt">
      <div className="container py-4 mt-5 mb-5">
        <div className="row justify-content-center mt-5 mb-5">
          <div className="col-12">
            <div className="bottom-light left-light"></div>
            <div className="bottom-light right-light"></div>
            <Navbar
              isLightMode={isLightMode}
              setIsLightMode={setIsLightMode}
            />

            <div className="row">
              {/* Main content column */}
              <div className="col-md-8">
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
                  <ProfileSkills
                    skills={person.skills}
                    isLightMode={isLightMode}
                  />
                )}

                {person.certifications?.certificationHistory && (
                  <ProfileCertifications
                    certifications={person.certifications.certificationHistory}
                    isLightMode={isLightMode}
                  />
                )}
              </div>

              {/* Sidebar column */}
              <div className="col-md-4">
                <div style={{ position: "sticky", top: "6.1rem" }}>
                  <LikelihoodScore isLightMode={isLightMode} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileDashboard;

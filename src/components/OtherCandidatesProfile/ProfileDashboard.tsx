/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebaseConfig/firebase";
import { doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";

import ProfileHeader from "./ProfileHeader";
import Navbar from "./Navbar";
import ProfileAbout from "../CandidatesProfile/ProfileAbout";
import ProfileExperience from "../CandidatesProfile/ProfileExperience";
import ProfileEducation from "../CandidatesProfile/ProfileEducation";
import ProfileSkills from "../CandidatesProfile/ProfileSkills";
import ProfileCertifications from "../CandidatesProfile/ProfileCertifications";
import ProfileSkeletons from "../CandidatesProfile/ProfileSkeletons";
import LikelihoodScore from "../CandidatesProfile/LikelihoodScore";
import ProfileVolunteer from "../CandidatesProfile/ProfileVolunteer";
import ProfileRecommendations from "../CandidatesProfile/ProfileRecommendations";
import NoProfileIntro from "./NoProfileIntro";
import SideNavbar from "../CandidatesProfile/SideNavbar";

interface ProfileDashboardProps {
  userId?: string;
  linkedInUrl?: string;
}

const ProfileDashboard = ({
  userId,
  linkedInUrl: initialLinkedInUrl,
}: ProfileDashboardProps) => {
  const [user] = useAuthState(auth);
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);
  const [linkedInUrl, setLinkedInUrl] = useState<string | undefined>(
    initialLinkedInUrl
  );

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const currentUserId = userId || user?.uid;
        if (!currentUserId) return;

        const candidateRef = doc(firestore, "Candidates", currentUserId);
        const candidateDoc = await getDoc(candidateRef);
        const candidateData = candidateDoc.data();

        // Update LinkedIn URL state
        if (candidateData?.linkedInUrl) {
          setLinkedInUrl(candidateData.linkedInUrl);
        }

        if (candidateDoc.exists() && candidateData?.linkedInData) {
          setProfileData(candidateData.linkedInData);
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
              <ProfileSkeletons isLightMode={isLightMode} />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!profileData || !linkedInUrl) {
    return (
      <main className="HomeImageCt">
        <div className="container py-4 mt-5 mb-5">
          <div className="row justify-content-center mt-5 mb-5">
            <div className="col-12 col-lg-10">
              <div className="bottom-light left-light"></div>
              <div className="bottom-light right-light"></div>
              <Navbar
                isLightMode={isLightMode}
                setIsLightMode={setIsLightMode}
              />
              {!profileData && !linkedInUrl && (
                <>
                  <NoProfileIntro isLightMode={isLightMode} />
                </>
              )}
              <ProfileSkeletons isLightMode={isLightMode} />
            </div>
          </div>
        </div>
      </main>
    );
  }

  const { person } = profileData;

  return (
    <main className="HomeImageCt">
      <SideNavbar isLightMode={isLightMode} profileData={profileData} />
      <div className="container py-4 mt-5 mb-5" style={{ paddingLeft: "30px" }}>
        {" "}
        <div className="row justify-content-center mt-5 mb-5">
          <div className="col-12">
            <div className="bottom-light left-light"></div>
            <div className="bottom-light right-light"></div>
            <Navbar isLightMode={isLightMode} setIsLightMode={setIsLightMode} />

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
                  <div id="about">
                    <ProfileAbout
                      summary={person.summary}
                      headline={person.headline}
                      openToWork={person.openToWork}
                      isLightMode={isLightMode}
                    />
                  </div>
                )}

                {person.positions?.positionHistory && (
                  <div id="experience">
                    <ProfileExperience
                      experiences={person.positions.positionHistory}
                      isLightMode={isLightMode}
                    />
                  </div>
                )}

                {person.schools?.educationHistory && (
                  <div id="education">
                    <ProfileEducation
                      educations={person.schools.educationHistory}
                      isLightMode={isLightMode}
                    />
                  </div>
                )}

                {person.skills && (
                  <div id="skills">
                    <ProfileSkills
                      skills={person.skills}
                      isLightMode={isLightMode}
                    />
                  </div>
                )}

                {person.certifications?.certificationHistory && (
                  <div id="certifications">
                    <ProfileCertifications
                      certifications={
                        person.certifications.certificationHistory
                      }
                      isLightMode={isLightMode}
                    />
                  </div>
                )}

                {person.volunteeringExperiences && (
                  <div id="volunteer">
                    <ProfileVolunteer
                      volunteeringExperiences={person.volunteeringExperiences}
                      isLightMode={isLightMode}
                    />
                  </div>
                )}

                {person.recommendations && (
                  <div id="recommendations">
                    <ProfileRecommendations
                      recommendations={person.recommendations}
                      isLightMode={isLightMode}
                    />
                  </div>
                )}
              </div>

              {/* Sidebar column */}
              <div className="col-md-4">
                <div style={{ position: "sticky", top: "5rem" }}>
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

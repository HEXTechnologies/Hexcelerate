/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebaseConfig/firebase";
import { doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";

import CompanyHeader from "./CompanyHeader";
import CompanyAbout from "./CompanyAbout";
import CompanySpecialties from "./CompanySpecialties";
import CompanySkeletons from "./CompanySkeletons";
import CompanyStats from "./CompanyStats";
import CompanyInput from "./CompanyInput";
import Navbar from "./Navbar";
import NoCompanyIntro from "./NoCompanyIntro";
import CompanySideNav from "./CompanySideNav";

interface CompanyDashboardProps {
  userId?: string;
  companyUrl?: string;
  onSubmit: (data: any) => Promise<void>;
}

const CompanyDashboard = ({
  userId,
  companyUrl: initialCompanyUrl,
  onSubmit,
}: CompanyDashboardProps) => {
  const [user] = useAuthState(auth);
  const [companyData, setCompanyData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);
  const [companyUrl, setCompanyUrl] = useState<string | undefined>(
    initialCompanyUrl
  );

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const currentUserId = userId || user?.uid;
        if (!currentUserId) return;

        const companyRef = doc(firestore, "Companies", currentUserId);
        const companyDoc = await getDoc(companyRef);
        const data = companyDoc.data();

        if (data?.companyData) {
          setCompanyData(data.companyData);
        }
        if (data?.linkedInUrl) {
          setCompanyUrl(data.linkedInUrl);
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load company data",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [user, userId]);

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

  if (!companyData) {
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
              {!companyData && !companyUrl && (
                <>
                  <NoCompanyIntro isLightMode={isLightMode} />
                  <CompanyInput
                    isLightMode={isLightMode}
                    onSubmit={async (searchData: {
                      type: "url" | "domain";
                      value: string;
                    }) => {
                      try {
                        await onSubmit(searchData);
                        const currentUserId = userId || user?.uid;
                        if (currentUserId) {
                          const companyRef = doc(
                            firestore,
                            "Companies",
                            currentUserId
                          );
                          const companyDoc = await getDoc(companyRef);
                          const data = companyDoc.data();
                          if (companyDoc.exists() && data?.companyData) {
                            setCompanyData(data.companyData);
                          }
                          if (searchData.type === "url") {
                            setCompanyUrl(searchData.value);
                          }
                        }
                      } catch (error) {
                        console.error("Error submitting company:", error);
                      } finally {
                        setLoading(false);
                      }
                    }}
                  />
                </>
              )}
              <CompanySkeletons isLightMode={isLightMode} />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="HomeImageCt">
      <CompanySideNav isLightMode={isLightMode} companyData={companyData} />
      <div className="container py-4 mt-5 mb-5" style={{ paddingLeft: "30px" }}>
        <div className="row justify-content-center mt-5 mb-5">
          <div className="col-12">
            <div className="bottom-light left-light"></div>
            <div className="bottom-light right-light"></div>
            <Navbar isLightMode={isLightMode} setIsLightMode={setIsLightMode} />

            <div className="row">
              {/* Main content column */}
              <div className="col-md-8">
                <CompanyHeader
                  logoUrl={companyData.logo}
                  name={companyData.name}
                  industry={companyData.industry}
                  location={`${companyData.headquarter.city}, ${companyData.headquarter.country}, ${companyData.headquarter.geographicArea}`}
                  websiteUrl={companyData.websiteUrl}
                  linkedInUrl={companyData.linkedInUrl}
                  isLightMode={isLightMode}
                />

                {companyData.description && (
                  <div id="about">
                    <CompanyAbout
                      description={companyData.description}
                      tagline={companyData.tagline}
                      isLightMode={isLightMode}
                    />
                  </div>
                )}

                {companyData.specialities && (
                  <div id="specialties">
                    <CompanySpecialties
                      specialties={companyData.specialities}
                      isLightMode={isLightMode}
                    />
                  </div>
                )}
              </div>

              {/* Sidebar column */}
              <div className="col-md-4">
                <div style={{ position: "sticky", top: "5rem" }}>
                  <CompanyStats
                    employeeCount={companyData.employeeCount}
                    followerCount={companyData.followerCount}
                    isLightMode={isLightMode}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CompanyDashboard;

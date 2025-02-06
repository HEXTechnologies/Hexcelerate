"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles.css";
import "../../styles/Lightmode.css";
import "../../styles/HomeTopandIntro.css";
import "../../styles/HomeCategory.css";
import "../../styles/HomeHowItWorks.css";
import "../../styles/HomeChatBots.css";

import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig/firebase";
import ProfileCard from "../../components/Candidates/ProfileCard";
import SearchSidebar from "../../components/Candidates/SearchSideBar";
import Navbar from "../../components/CandidatesProfile/Navbar";
import { Loader2 } from "lucide-react";

interface Candidate {
  id: string;
  score?: number;
  linkedInData?: {
    person: {
      firstName: string;
      lastName: string;
      photoUrl?: string;
      headline?: string;
      location?: string;
      skills?: string[];
      positions?: {
        positionHistory?: any[];
      };
      schools?: {
        educationHistory?: any[];
      };
    };
  };
}

const CandidatesListPage = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLightMode, setIsLightMode] = useState(true);

  const [filters, setFilters] = useState({
    searchTerm: "",
    location: "",
    skills: [] as string[],
    experience: "",
    schools: {
      educationHistory: "",
    },
  });

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const candidatesCollection = collection(firestore, "Candidates");
        const candidatesSnapshot = await getDocs(candidatesCollection);

        const candidatesData = candidatesSnapshot.docs
          .map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              } as Candidate)
          )
          .filter((candidate) => candidate.linkedInData?.person);

        setCandidates(candidatesData);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleFilterChange = (filterName: string, value: any) => {
    setFilters((prev) => {
      // Handle nested updates for schools
      if (filterName === "schools") {
        return {
          ...prev,
          schools: value,
        };
      }
      // Handle all other updates
      return {
        ...prev,
        [filterName]: value,
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      location: "",
      skills: [],
      experience: "",
      schools: {
        educationHistory: "",
      },
    });
  };

  const filterCandidates = (candidates: Candidate[]) => {
    return candidates.filter((candidate) => {
      const person = candidate.linkedInData?.person;
      if (!person) return false;

      const fullName = `${person.firstName} ${person.lastName}`.toLowerCase();
      const headline = person.headline?.toLowerCase() || "";
      const location = person.location?.toLowerCase() || "";
      const candidateSkills = person.skills?.map((s) => s.toLowerCase()) || [];

      // Education filter
      if (filters.schools?.educationHistory) {
        const educationHistory = person.schools?.educationHistory || [];
        const hasMatchingSchool = educationHistory.some(
          (education) =>
            education.schoolName === filters.schools?.educationHistory
        );
        if (!hasMatchingSchool) return false;
      }

      // Search term filter
      if (filters.searchTerm) {
        const searchTerm = filters.searchTerm.toLowerCase();
        if (
          !fullName.includes(searchTerm) &&
          !headline.includes(searchTerm) &&
          !location.includes(searchTerm)
        ) {
          return false;
        }
      }

      // Location filter
      if (
        filters.location &&
        !location.includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      // Skills filter
      if (filters.skills.length > 0) {
        const hasAllSkills = filters.skills.every((skill) =>
          candidateSkills.some((s) => s.includes(skill.toLowerCase()))
        );
        if (!hasAllSkills) return false;
      }

      // Experience level filter
      if (filters.experience) {
        const yearsOfExperience =
          person.positions?.positionHistory?.length || 0;
        return filters.experience === getExperienceLevel(yearsOfExperience);
      }

      return true;
    });
  };

  const getExperienceLevel = (years: number): string => {
    if (years === 0) return "Intern";
    if (years <= 2) return "Entry Level";
    if (years <= 5) return "Mid Level";
    if (years <= 12) return "Senior Level";
    return "Executive Level";
  };

  const filteredCandidates = filterCandidates(candidates);

  if (loading) {
    return (
      <div className="HomeImageCt">
        <div className="container-fluid">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-3 col-xl-2 px-0">
              <SearchSidebar
                isLightMode={isLightMode}
                filters={filters}
                candidates={candidates} // Add this line
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
              />
            </div>
            {/* Loading State */}
            <div className="col-lg-9 col-xl-10">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "60vh" }}
              >
                <Loader2
                  className="animate-spin"
                  size={48}
                  style={{ color: isLightMode ? "#666" : "#aaa" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="HomeImageCt">
      <div className="container-fluid">
        <Navbar isLightMode={isLightMode} setIsLightMode={setIsLightMode} />
        <div className="row">
          {/* Search Sidebar */}
          <div className="col-lg-3 col-xl-2 px-0">
            <SearchSidebar
              isLightMode={isLightMode}
              filters={filters}
              candidates={candidates} // Add this line
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="col-lg-9 col-xl-10 mt-5">
            <div className="container py-4">
              {/* Header Section */}
              <div className="row mb-4">
                <div className="col">
                  <h1
                    className={`custom-h1 mb-3 mt-4 ${
                      isLightMode ? "text-white" : "text-white"
                    }`}
                  >
                    DISCOVER PROMISING CANDIDATES
                  </h1>
                  <h4
                    className={`custom-h4 mb-4 ${
                      isLightMode ? "text-white" : "text-white"
                    }`}
                  >
                    Find Top Candidates Tailored to Your Needs
                  </h4>
                </div>
              </div>

              {/* Results Section */}
              <div className="row">
                {filteredCandidates.length > 0 ? (
                  filteredCandidates.map((candidate) => (
                    <ProfileCard
                      key={candidate.id}
                      id={candidate.id}
                      photoUrl={candidate.linkedInData?.person.photoUrl}
                      name={`${candidate.linkedInData?.person.firstName} ${candidate.linkedInData?.person.lastName}`}
                      headline={candidate.linkedInData?.person.headline}
                      location={candidate.linkedInData?.person.location}
                      schoolName={
                        candidate.linkedInData?.person.schools
                          ?.educationHistory?.[0]?.schoolName
                      }
                      score={candidate.score} // Add this line
                      isLightMode={isLightMode}
                    />
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <div
                      style={{ fontSize: "1.125rem" }}
                      className={
                        isLightMode ? "text-gray-600" : "text-gray-400"
                      }
                    >
                      <p>No candidates found matching your search criteria.</p>
                      <button
                        onClick={clearFilters}
                        className="btn btn-primary gradient-button mt-3"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatesListPage;

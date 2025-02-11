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
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig/firebase";
import CompanyCard from "../../components/Companies/CompanyCard";
import CompanySearchSidebar from "../../components/Companies/CompanySearchSidebar";
import Navbar from "../../components/Companies/Navbar";
import {
  SidebarSkeleton,
  CompanyCardSkeleton,
  HeaderSkeleton,
} from "../../components/Companies/Skeletons";

interface Company {
  id: string;
  companyData?: {
    linkedInId: string;
    name: string;
    universalName: string;
    linkedInUrl: string;
    employeeCount: number;
    websiteUrl: string;
    description: string;
    industry: string;
    specialities: string[];
    followerCount: number;
    headquarter: {
      city: string;
      country: string;
      geographicArea: string;
    };
    logo: string;
  };
}

const CompanyListPage = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLightMode, setIsLightMode] = useState(true);

  const [filters, setFilters] = useState({
    searchTerm: "",
    location: "",
    industry: "",
    employeeCount: "",
    specialities: [] as string[],
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesCollection = collection(firestore, "Companies");
        const companiesSnapshot = await getDocs(companiesCollection);

        const companiesData = companiesSnapshot.docs
          .map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              } as Company)
          )
          .filter((company) => company.companyData);

        setCompanies(companiesData);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleFilterChange = (filterName: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      location: "",
      industry: "",
      employeeCount: "",
      specialities: [],
    });
  };

  const getEmployeeCountRange = (count: number): string => {
    if (count <= 10) return "1-10";
    if (count <= 50) return "11-50";
    if (count <= 200) return "51-200";
    if (count <= 500) return "201-500";
    if (count <= 1000) return "501-1000";
    if (count <= 5000) return "1001-5000";
    if (count <= 10000) return "5001-10000";
    return "10000+";
  };

  const filterCompanies = (companies: Company[]) => {
    return companies.filter((company) => {
      const companyData = company.companyData;
      if (!companyData) return false;

      const name = companyData.name.toLowerCase();
      const location =
        `${companyData.headquarter?.city}, ${companyData.headquarter?.geographicArea}, ${companyData.headquarter?.country}`.toLowerCase();
      const industry = companyData.industry?.toLowerCase() || "";
      const specialities =
        companyData.specialities?.map((s) => s.toLowerCase()) || [];
      const employeeCountRange = getEmployeeCountRange(
        companyData.employeeCount
      );

      // Search term filter
      if (
        filters.searchTerm &&
        !name.includes(filters.searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Location filter
      if (
        filters.location &&
        !location.includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      // Industry filter
      if (filters.industry && industry !== filters.industry.toLowerCase()) {
        return false;
      }

      // Employee count filter
      if (
        filters.employeeCount &&
        employeeCountRange !== filters.employeeCount
      ) {
        return false;
      }

      // Specialities filter
      if (filters.specialities.length > 0) {
        const hasAllSpecialities = filters.specialities.every((speciality) =>
          specialities.some((s) => s.includes(speciality.toLowerCase()))
        );
        if (!hasAllSpecialities) return false;
      }

      return true;
    });
  };

  const filteredCompanies = filterCompanies(companies);

  if (loading) {
    return (
      <div className="HomeImageCt">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-xl-2 px-0">
              <SidebarSkeleton isLightMode={isLightMode} />
            </div>
            <div className="col-lg-9 col-xl-10 mt-4">
              <div className="container py-4">
                <HeaderSkeleton isLightMode={isLightMode} />
                <div className="row">
                  {[1, 2, 3, 4, 5, 6].map((index) => (
                    <CompanyCardSkeleton
                      key={index}
                      isLightMode={isLightMode}
                    />
                  ))}
                </div>
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
          <div className="col-lg-3 col-xl-2 px-0">
            <CompanySearchSidebar
              isLightMode={isLightMode}
              filters={filters}
              companies={companies.map(company => ({
                industry: company.companyData?.industry,
                employeeCount: company.companyData?.employeeCount,
                specialities: company.companyData?.specialities,
              }))}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          </div>

          <div className="col-lg-9 col-xl-10 mt-5">
            <div className="container py-4">
              <div className="row mb-4">
                <div className="col">
                  <h1
                    className={`custom-h1 mb-3 mt-4 ${
                      isLightMode ? "text-white" : "text-white"
                    }`}
                  >
                    EXPLORE TOP COMPANIES
                  </h1>
                  <h4
                    className={`custom-h4 mb-4 ${
                      isLightMode ? "text-white" : "text-white"
                    }`}
                  >
                    Discover Leading Companies in Your Industry
                  </h4>
                </div>
              </div>

              <div className="row">
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((company) => (
                    <CompanyCard
                      key={company.id}
                      id={company.id}
                      logo={company.companyData?.logo}
                      name={company.companyData?.name || ""}
                      industry={company.companyData?.industry}
                      location={`${company.companyData?.headquarter?.city}, ${company.companyData?.headquarter?.geographicArea}`}
                      employeeCount={company.companyData?.employeeCount}
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
                      <p>No companies found matching your search criteria.</p>
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

export default CompanyListPage;

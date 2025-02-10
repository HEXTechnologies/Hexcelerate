/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { auth, firestore } from "../../../firebaseConfig/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Swal from "sweetalert2";

interface CompanyInputProps {
  onSubmit: (data: any) => Promise<void>;
  isLightMode: boolean;
}

const CompanyInput = ({ onSubmit, isLightMode }: CompanyInputProps) => {
  const [user, loading] = useAuthState(auth);
  const [searchMethod, setSearchMethod] = useState<"url" | "domain">("url");
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [domain, setDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!user?.uid) return;

      try {
        setIsLoading(true);
        const companyRef = doc(firestore, "Companies", user.uid);
        const companyDoc = await getDoc(companyRef);

        if (companyDoc.exists()) {
          const data = companyDoc.data();
          if (data.linkedInUrl) {
            setLinkedInUrl(data.linkedInUrl);
            setSearchMethod("url");
          } else if (data.domain) {
            setDomain(data.domain);
            setSearchMethod("domain");
          }
        }
      } catch (err) {
        console.error("Error fetching company data:", err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to fetch company data",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, [user]);

  const validateLinkedInUrl = (url: string): boolean => {
    const linkedInRegex =
      /^https:\/\/(www\.)?linkedin\.com\/company\/[\w-]+\/?$/;
    return linkedInRegex.test(url);
  };

  const validateDomain = (input: string): boolean => {
    const domainRegex =
      /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    return domainRegex.test(input);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) {
      Swal.fire({
        icon: "error",
        title: "Authentication Required",
        text: "You must be logged in to update company data",
      });
      return;
    }

    if (searchMethod === "url") {
      if (!linkedInUrl.trim()) {
        Swal.fire({
          icon: "warning",
          title: "Missing URL",
          text: "Please enter a LinkedIn company URL",
        });
        return;
      }

      if (!validateLinkedInUrl(linkedInUrl)) {
        Swal.fire({
          icon: "warning",
          title: "Invalid URL",
          text: "Please enter a valid LinkedIn company URL",
        });
        return;
      }
    } else {
      if (!domain.trim()) {
        Swal.fire({
          icon: "warning",
          title: "Missing Domain",
          text: "Please enter a company domain",
        });
        return;
      }

      if (!validateDomain(domain)) {
        Swal.fire({
          icon: "warning",
          title: "Invalid Domain",
          text: "Please enter a valid domain name",
        });
        return;
      }
    }

    setIsLoading(true);

    try {
      const searchValue = searchMethod === "url" ? linkedInUrl : domain;

      // Pass data to parent for API call first
      try {
        await onSubmit({
          type: searchMethod,
          value: searchValue,
        });

        // Only save to Firestore after successful API call
        const companyRef = doc(firestore, "Companies", user.uid);
        await setDoc(
          companyRef,
          {
            ...(searchMethod === "url"
              ? { linkedInUrl: searchValue }
              : { domain: searchValue }),
            lastUpdated: new Date(),
            email: user.email,
          },
          { merge: true }
        );
      } catch (apiError: any) {
        // Handle API errors
        if (apiError.status === 400 || apiError.status === 404) {
          Swal.fire({
            icon: "error",
            title: apiError.error?.title || "Validation Error",
            text:
              apiError.error?.msg || "Please check your input and try again",
          });
        } else if (apiError.status === 402) {
          Swal.fire({
            icon: "error",
            title: "API Limit Reached",
            text: "No more credits available. Please try again later.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text:
              apiError.error?.msg ||
              "Failed to fetch company data. Please try again.",
          });
        }

        // Remove any existing search data from Firestore since the API call failed
        const companyRef = doc(firestore, "Companies", user.uid);
        await setDoc(
          companyRef,
          {
            ...(searchMethod === "url"
              ? { linkedInUrl: null }
              : { domain: null }),
            lastUpdated: new Date(),
          },
          { merge: true }
        );

        throw apiError; // Re-throw to be caught by outer catch
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          err instanceof Error
            ? err.message
            : "An error occurred while processing your request",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cardStyle = {
    backgroundColor: isLightMode ? "#fff" : "#040411",
    color: isLightMode ? "#000" : "#fff",
    borderRadius: "1rem",
    borderColor: isLightMode ? "#dee2e6" : "#444",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "1.5rem",
    overflow: "hidden",
  };

  const inputStyle = {
    backgroundColor: isLightMode ? "#fff" : "#040411",
    color: isLightMode ? "#333" : "#fff",
    border: `1px solid ${isLightMode ? "#dee2e6" : "#444"}`,
  };

  if (loading) {
    return (
      <div className="card" style={cardStyle}>
        <div className="card-body">
          <div className="placeholder-glow">
            <span className="placeholder col-12"></span>
            <span className="placeholder col-12"></span>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="card" style={cardStyle}>
        <div className="card-body">
          <div className="alert alert-warning" role="alert">
            Please sign in to search for companies.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mb-4">
      <div className="card" style={cardStyle}>
        <div className="card-body">
          <div className="mb-4">
            <div className="btn-group w-100" role="group">
              <button
                type="button"
                className={`btn ${
                  searchMethod === "url" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setSearchMethod("url")}
              >
                Search by URL
              </button>
              <button
                type="button"
                className={`btn ${
                  searchMethod === "domain"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setSearchMethod("domain")}
              >
                Search by Domain
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {searchMethod === "url" ? (
              <div className="mb-3">
                <label
                  htmlFor="linkedInUrl"
                  className="form-label"
                  style={{ color: isLightMode ? "#333" : "#fff" }}
                >
                  LinkedIn Company URL
                </label>
                <input
                  id="linkedInUrl"
                  type="url"
                  className="form-control"
                  value={linkedInUrl}
                  onChange={(e) => setLinkedInUrl(e.target.value)}
                  placeholder="https://linkedin.com/company/company-name"
                  style={inputStyle}
                  disabled={isLoading}
                />
              </div>
            ) : (
              <div className="mb-3">
                <label
                  htmlFor="domain"
                  className="form-label"
                  style={{ color: isLightMode ? "#333" : "#fff" }}
                >
                  Company Domain
                </label>
                <input
                  id="domain"
                  type="text"
                  className="form-control"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="company.com"
                  style={inputStyle}
                  disabled={isLoading}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn gradient-button w-100"
              style={{
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? "Searching..." : "Search Company"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyInput;

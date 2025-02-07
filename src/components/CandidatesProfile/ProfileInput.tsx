"use client";

import React, { useState, useEffect } from "react";
import { auth, firestore } from "../../../firebaseConfig/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Swal from "sweetalert2";

interface ProfileInputProps {
  onSubmit: (data: any) => Promise<void>;
  isLightMode: boolean;
}

const ProfileInput = ({ onSubmit, isLightMode }: ProfileInputProps) => {
  const [user, loading] = useAuthState(auth);
  const [searchMethod, setSearchMethod] = useState<"url" | "name">("url");
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyDomain, setCompanyDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCandidateData = async () => {
      if (!user?.uid) return;

      try {
        setIsLoading(true);
        const candidateRef = doc(firestore, "Candidates", user.uid);
        const candidateDoc = await getDoc(candidateRef);

        if (candidateDoc.exists()) {
          const data = candidateDoc.data();
          if (data.linkedInUrl) {
            setLinkedInUrl(data.linkedInUrl);
            setSearchMethod("url");
          }
        }
      } catch (err) {
        console.error("Error fetching candidate data:", err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to fetch profile data",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidateData();
  }, [user]);

  const validateLinkedInUrl = (url: string): boolean => {
    const linkedInRegex = /^https:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;
    return linkedInRegex.test(url);
  };

  const validateNameSearch = (): boolean => {
    const hasFirstName = firstName.trim().length > 0;
    const hasLastName = lastName.trim().length > 0;
    const hasCompany = companyDomain.trim().length > 0;

    return (
      ((hasFirstName || hasLastName) && hasCompany) ||
      (hasFirstName && hasLastName)
    );
  };

  const isDomain = (input: string): boolean => {
    // More strict domain check: must contain a dot and a valid TLD
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
        text: "You must be logged in to update your profile",
      });
      return;
    }

    if (searchMethod === "url") {
      if (!linkedInUrl.trim()) {
        Swal.fire({
          icon: "warning",
          title: "Missing URL",
          text: "Please enter a LinkedIn URL",
        });
        return;
      }

      if (!validateLinkedInUrl(linkedInUrl)) {
        Swal.fire({
          icon: "warning",
          title: "Invalid URL",
          text: "Please enter a valid LinkedIn profile URL",
        });
        return;
      }
    } else {
      if (!validateNameSearch()) {
        Swal.fire({
          icon: "warning",
          title: "Invalid Input",
          text: "Please provide both first and last name",
        });
        return;
      }
    }

    setIsLoading(true);

    try {
      // Store search parameters in Firestore first
      const candidateRef = doc(firestore, "Candidates", user.uid);
      const companyValue = companyDomain.trim();

      if (searchMethod === "url") {
        await setDoc(
          candidateRef,
          {
            linkedInUrl,
            lastUpdated: new Date(),
            email: user.email,
          },
          { merge: true }
        );
      } else {
        // Only store as companyDomain if it's a valid domain, otherwise store as companyName
        const isValidDomain = isDomain(companyValue);
        const companyData = companyValue
          ? {
              [isValidDomain ? "companyDomain" : "companyName"]: companyValue,
            }
          : {};

        await setDoc(
          candidateRef,
          {
            searchData: {
              firstName,
              lastName,
              ...companyData,
            },
            lastUpdated: new Date(),
            email: user.email,
          },
          { merge: true }
        );
      }

      // Pass data to parent for API call
      const searchData =
        searchMethod === "url"
          ? linkedInUrl
          : {
              firstName,
              lastName,
              ...(companyValue && {
                [isDomain(companyValue) ? "companyDomain" : "companyName"]:
                  companyValue,
              }),
            };

      try {
        await onSubmit(searchData);
      } catch (apiError: any) {
        // Handle specific API errors
        if (apiError.status === 400) {
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
              "Failed to fetch profile data. Please try again.",
          });
        }

        // Remove the search data from Firestore since the API call failed
        await setDoc(
          candidateRef,
          {
            ...(searchMethod === "url"
              ? { linkedInUrl: null }
              : { searchData: null }),
            lastUpdated: new Date(),
          },
          { merge: true }
        );
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
            Please sign in to update your profile.
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
                  searchMethod === "name"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setSearchMethod("name")}
              >
                Search by Info
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
                  LinkedIn Profile URL
                </label>
                <input
                  id="linkedInUrl"
                  type="url"
                  className="form-control"
                  value={linkedInUrl}
                  onChange={(e) => setLinkedInUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  style={inputStyle}
                  disabled={isLoading}
                />
              </div>
            ) : (
              <>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label
                      htmlFor="firstName"
                      className="form-label"
                      style={{ color: isLightMode ? "#333" : "#fff" }}
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      className="form-control"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter first name"
                      style={inputStyle}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="lastName"
                      className="form-label"
                      style={{ color: isLightMode ? "#333" : "#fff" }}
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      className="form-control"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter last name"
                      style={inputStyle}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="companyDomain"
                    className="form-label"
                    style={{ color: isLightMode ? "#333" : "#fff" }}
                  >
                    Company Domain or Name{" "}
                    <small className="text-white">(Optional)</small>
                  </label>
                  <input
                    id="companyDomain"
                    type="text"
                    className="form-control"
                    value={companyDomain}
                    onChange={(e) => setCompanyDomain(e.target.value)}
                    placeholder="company.com or Company Name"
                    style={inputStyle}
                    disabled={isLoading}
                  />
                </div>
              </>
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
              {isLoading ? "Submitting..." : "Submit Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileInput;

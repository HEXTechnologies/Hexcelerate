/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Pencil, Globe, Image } from "lucide-react";
import { BsLinkedin } from "react-icons/bs";
import { useState } from "react";

interface CompanyHeaderProps {
  logoUrl?: string;
  backgroundUrl?: string;
  name?: string;
  industry?: string;
  location?: string;
  websiteUrl?: string;
  linkedInUrl?: string;
  isLightMode: boolean;
}

const CompanyHeader = ({
  logoUrl,
  backgroundUrl,
  name,
  industry,
  location,
  websiteUrl,
  linkedInUrl,
  isLightMode,
}: CompanyHeaderProps) => {
  const [useGradient, setUseGradient] = useState(true);

  const cardStyle = {
    backgroundColor: isLightMode ? "#fff" : "#040411",
    color: isLightMode ? "#000" : "#fff",
    borderRadius: "1rem",
    borderColor: isLightMode ? "#dee2e6" : "#444",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "1.5rem",
    overflow: "hidden",
  };

  const backgroundStyle = useGradient
    ? {
        height: "200px",
        background:
          "linear-gradient(90deg, rgba(109, 189, 255, 0.64), rgba(58, 118, 207, 0.625), rgba(18, 57, 215, 0.599), rgba(100, 57, 240, 0.531), rgba(131, 49, 255, 0.477))",
        position: "relative" as const,
      }
    : {
        height: "200px",
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: isLightMode ? "#f0f0f0" : "#2d2d2d",
        position: "relative" as const,
      };

  const buttonStyle = {
    position: "absolute" as const,
    background: "none",
    border: "none",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    padding: "8px",
    zIndex: 2,
  };

  const websiteButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 16px",
    borderRadius: "24px",
    backgroundColor: isLightMode
      ? "rgba(16, 185, 129, 0.1)"
      : "rgba(16, 185, 129, 0.15)",
    color: isLightMode ? "rgb(16, 185, 129)" : "rgb(34, 197, 94)",
    border: `1px solid ${
      isLightMode ? "rgba(16, 185, 129, 0.2)" : "rgba(34, 197, 94, 0.2)"
    }`,
    transition: "all 0.2s ease",
    textDecoration: "none",
    fontSize: "0.875rem",
    fontWeight: 500,
  };

  const linkedInButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 16px",
    borderRadius: "24px",
    backgroundColor: isLightMode
      ? "rgba(0, 119, 181, 0.1)"
      : "rgba(0, 119, 181, 0.15)",
    color: isLightMode ? "rgb(0, 119, 181)" : "rgb(10, 102, 194)",
    border: `1px solid ${
      isLightMode ? "rgba(0, 119, 181, 0.2)" : "rgba(10, 102, 194, 0.2)"
    }`,
    transition: "all 0.2s ease",
    textDecoration: "none",
    fontSize: "0.875rem",
    fontWeight: 500,
  };

  return (
    <div className="card mb-4" style={cardStyle}>
      {/* Background */}
      <div style={backgroundStyle}>
        {/* Toggle Background Button */}
        {backgroundUrl && (
          <button
            style={{ ...buttonStyle, top: "20px", right: "20px" }}
            onClick={() => setUseGradient(!useGradient)}
          >
            <Image size={16} />
            {useGradient ? "Show Banner" : "Show Gradient"}
          </button>
        )}
      </div>

      <div
        className="card-body position-relative"
        style={{
          marginTop: "-100px",
          paddingLeft: "32px",
        }}
      >
        {logoUrl && (
          <img
            src={logoUrl}
            alt={name}
            className="rounded-circle border-4 mb-3"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              border: `4px solid ${isLightMode ? "#fff" : "#1a1a1a"}`,
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
            }}
          />
        )}

        <div
          style={{
            marginTop: "16px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <h1
            className="h2 mb-1"
            style={{
              fontSize: "2rem",
              fontWeight: "600",
              color: isLightMode ? "#333" : "#fff",
              margin: 0,
            }}
          >
            {name}
          </h1>
          {industry && (
            <div
              style={{
                backgroundColor: isLightMode
                  ? "rgba(0,0,0,0.03)"
                  : "rgba(255,255,255,0.03)",
                padding: "4px 12px",
                borderRadius: "8px",
                display: "inline-block",
                fontSize: "0.9rem",
                color: isLightMode ? "#333" : "#fff",
                border: `1px solid ${
                  isLightMode ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)"
                }`,
                margin: 0,
              }}
            >
              {industry}
            </div>
          )}
        </div>
        <div>
          {location && (
            <div
              className="mb-2"
              style={{
                fontSize: "0.9rem",
                color: isLightMode ? "#333" : "#fff",
              }}
            >
              {location}
            </div>
          )}
          {websiteUrl && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={websiteButtonStyle}
              className="mt-2"
            >
              <Globe size={16} />
              Visit Website
            </a>
          )}{" "}
          {linkedInUrl && (
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={linkedInButtonStyle}
              className="mt-2"
            >
              <BsLinkedin size={16} />
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyHeader;

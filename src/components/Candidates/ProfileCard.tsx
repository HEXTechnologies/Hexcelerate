/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { User, GraduationCap } from "lucide-react";
import ScoreDisplay from "./ScoreDisplay";

interface ProfileCardProps {
  id: string;
  photoUrl?: string;
  name: string;
  headline?: string;
  location?: string;
  schoolName?: string;
  score?: number;
  isLightMode: boolean;
}

const ProfileCard = ({
  id,
  photoUrl,
  name,
  headline,
  location,
  schoolName,
  score = 18, // Default score if not provided
  isLightMode,
}: ProfileCardProps) => {
  const router = useRouter();

  const cardStyle = {
    backgroundColor: isLightMode ? "#fff" : "#040411",
    color: isLightMode ? "#000" : "#fff",
    borderRadius: "1rem",
    borderColor: isLightMode ? "#dee2e6" : "#444",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "1.5rem",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const gradientStyle = {
    height: "100px",
    background:
      "linear-gradient(90deg, rgba(109, 189, 255, 0.64), rgba(58, 118, 207, 0.625), rgba(18, 57, 215, 0.599), rgba(100, 57, 240, 0.531), rgba(131, 49, 255, 0.477))",
    position: "relative" as const,
  };

  const nameStyle = {
    fontWeight: "600",
    fontSize: "1rem",
    marginBottom: "0.25rem",
    whiteSpace: "nowrap" as const,
    overflow: "hidden" as const,
    textOverflow: "ellipsis" as const,
    maxWidth: "300px",
  };

  return (
    <div
      className="col-md-6 col-lg-4 mb-4"
      onClick={() => router.push(`/Candidates/${id}`)}
    >
      <div
        className="card"
        style={cardStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        }}
      >
        <div style={gradientStyle} />
        <div
          className="card-body position-relative"
          style={{ marginTop: "-60px", padding: "20px" }}
        >
          <ScoreDisplay score={score} isLightMode={isLightMode} />

          {photoUrl ? (
            <img
              src={photoUrl}
              alt={name}
              className="rounded-circle border-4 mb-3"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                border: `4px solid ${isLightMode ? "#fff" : "#1a1a1a"}`,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
          ) : (
            <div
              className="rounded-circle border-4 mb-3 d-flex align-items-center justify-content-center"
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: isLightMode ? "#f0f0f0" : "#2d2d2d",
                border: `4px solid ${isLightMode ? "#fff" : "#1a1a1a"}`,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <User size={32} color={isLightMode ? "#666" : "#999"} />
            </div>
          )}

          <h3
            className={`${isLightMode ? "" : "text-white"}`}
            style={nameStyle}
            title={name} // Shows full name on hover
          >
            {name}
          </h3>

          {headline && (
            <div
              style={{
                backgroundColor: isLightMode
                  ? "rgba(0,0,0,0.03)"
                  : "rgba(255,255,255,0.03)",
                padding: "4px 12px",
                borderRadius: "8px",
                display: "inline-block",
                fontSize: "0.7rem",
                color: isLightMode ? "#333" : "#fff",
                border: `1px solid ${
                  isLightMode ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)"
                }`,
                margin: "8px 0",
              }}
            >
              Candidate
            </div>
          )}

          {schoolName && (
            <div
              className="d-flex align-items-center gap-2 mb-2"
              style={{
                padding: "8px",
                backgroundColor: isLightMode
                  ? "rgba(0,0,0,0.02)"
                  : "rgba(255,255,255,0.02)",
                borderRadius: "8px",
                border: `1px solid ${
                  isLightMode ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)"
                }`,
              }}
            >
              <div className="flex-shrink-0">
                <GraduationCap
                  size={16}
                  style={{
                    color: isLightMode ? "#666" : "#aaa",
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: isLightMode ? "#666" : "#aaa",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  flex: 1,
                }}
                title={schoolName}
              >
                {schoolName}
              </div>
            </div>
          )}

          {location && (
            <div
              className="d-flex align-items-center"
              style={{
                color: isLightMode ? "#666" : "#aaa",
                fontSize: "0.875rem",
              }}
            >
              <span>📍</span>
              <span
                style={{
                  marginLeft: "4px",
                  fontSize: "0.8rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "calc(100% - 24px)",
                }}
                title={location}
              >
                {location}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

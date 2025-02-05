"use client";

import React, { useState } from "react";
import {
  User,
  Briefcase,
  CircleDot,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface ProfileAboutProps {
  summary: string;
  headline: string;
  openToWork: boolean;
  isLightMode: boolean;
}

const ProfileAbout = ({
  summary,
  headline,
  openToWork,
  isLightMode,
}: ProfileAboutProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const cardStyle = {
    backgroundColor: isLightMode ? "#fff" : "#040411",
    color: isLightMode ? "#000" : "#fff",
    borderRadius: "1rem",
    borderColor: isLightMode ? "#dee2e6" : "#444",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "1.5rem",
    overflow: "hidden",
  };

  const textStyle = {
    color: isLightMode ? "#666" : "#8c8c9e",
  };

  const headlineContainerStyle = {
    padding: "16px 20px",
    borderRadius: "12px",
    backgroundColor: isLightMode
      ? "rgba(0,0,0,0.03)"
      : "rgba(255,255,255,0.03)",
    marginBottom: "1.5rem",
    border: `1px solid ${
      isLightMode ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)"
    }`,
  };

  const headlineStyle = {
    color: isLightMode ? "#333" : "#fff",
    lineHeight: "1.6",
    fontSize: "0.95rem",
    fontWeight: 500,
  };

  const openToWorkStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 16px",
    borderRadius: "24px",
    backgroundColor: openToWork
      ? isLightMode
        ? "rgba(16, 185, 129, 0.1)"
        : "rgba(16, 185, 129, 0.15)"
      : isLightMode
      ? "rgba(100, 116, 139, 0.1)"
      : "rgba(148, 163, 184, 0.1)",
    color: openToWork
      ? isLightMode
        ? "rgb(16, 185, 129)"
        : "rgb(34, 197, 94)"
      : isLightMode
      ? "rgb(100, 116, 139)"
      : "rgb(148, 163, 184)",
    border: `1px solid ${
      openToWork
        ? isLightMode
          ? "rgba(16, 185, 129, 0.2)"
          : "rgba(34, 197, 94, 0.2)"
        : isLightMode
        ? "rgba(100, 116, 139, 0.2)"
        : "rgba(148, 163, 184, 0.2)"
    }`,
    transition: "all 0.2s ease",
  };

  const dotStyle = {
    animation: openToWork ? "pulse 2s infinite" : "none",
    position: "relative" as const,
  };

  const buttonStyle = {
    background: "none",
    border: "none",
    color: isLightMode ? "#007bff" : "#4da3ff",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 0",
    cursor: "pointer",
    fontSize: "0.9rem",
    marginTop: "0.5rem",
  };

  const truncateText = (text: string, maxLength: number = 300) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="card mb-4" style={cardStyle}>
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <User
              className="me-2"
              style={{ color: isLightMode ? "#666" : "#8c8c9e" }}
            />
            <h2 className="h4 mb-0">About</h2>
          </div>
          <div style={openToWorkStyle}>
            <CircleDot size={16} style={dotStyle} />
            <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
              {openToWork ? "Open to Work" : "Not Open to Work"}
            </span>
          </div>
        </div>

        <div style={headlineContainerStyle}>
          <div className="d-flex align-items-start gap-3">
            <Briefcase
              size={18}
              style={{
                marginTop: "3px",
                color: isLightMode ? "#666" : "#8c8c9e",
                flexShrink: 0,
              }}
            />
            <p className="mb-0" style={headlineStyle}>
              {headline}
            </p>
          </div>
        </div>

        <div>
          <div
            style={{
              ...textStyle,
              lineHeight: "1.8",
              fontSize: "0.95rem",
              whiteSpace: "pre-line",
              padding: "0 4px",
            }}
          >
            {isExpanded ? summary : truncateText(summary)}
          </div>
          {summary.length > 300 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={buttonStyle}
              className="d-flex align-items-center"
            >
              {isExpanded ? (
                <>
                  <span>Show less</span>
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  <span>Read more</span>
                  <ChevronDown size={16} />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.8;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProfileAbout;

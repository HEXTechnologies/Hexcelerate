"use client";

import React, { useState } from "react";
import {
  Building,
  ChevronDown,
  ChevronUp,
  Quote,
} from "lucide-react";

interface CompanyAboutProps {
  description: string;
  tagline: string | null;
  isLightMode: boolean;
}

const CompanyAbout = ({
  description,
  tagline,
  isLightMode,
}: CompanyAboutProps) => {
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

  const taglineContainerStyle = {
    padding: "16px 20px",
    borderRadius: "12px",
    backgroundColor: isLightMode ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)",
    marginBottom: "1.5rem",
    border: `1px solid ${isLightMode ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)"}`,
  };

  const taglineStyle = {
    color: isLightMode ? "#333" : "#fff",
    lineHeight: "1.6",
    fontSize: "0.95rem",
    fontWeight: 500,
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
            <Building
              className="me-2"
              style={{ color: isLightMode ? "#666" : "#8c8c9e" }}
            />
            <h2 className="h4 mb-0">About</h2>
          </div>
        </div>

        {tagline && (
          <div style={taglineContainerStyle}>
            <div className="d-flex align-items-start gap-3">
              <Quote
                size={18}
                style={{
                  marginTop: "3px",
                  color: isLightMode ? "#666" : "#8c8c9e",
                  flexShrink: 0,
                }}
              />
              <p className="mb-0" style={taglineStyle}>
                {tagline}
              </p>
            </div>
          </div>
        )}

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
            {isExpanded ? description : truncateText(description)}
          </div>
          {description.length > 300 && (
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
    </div>
  );
};

export default CompanyAbout;
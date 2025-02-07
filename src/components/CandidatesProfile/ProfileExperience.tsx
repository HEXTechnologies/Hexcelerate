"use client";

import {
  Briefcase,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

interface Experience {
  title: string;
  companyName: string;
  companyLocation?: string;
  description?: string;
  startEndDate?: {
    start?: { month?: number; year?: number };
    end?: { month?: number; year?: number } | null;
  };
  companyLogo?: string;
}

interface ProfileExperienceProps {
  experiences: Experience[];
  isLightMode: boolean;
}

const ProfileExperience = ({
  experiences,
  isLightMode,
}: ProfileExperienceProps) => {
  // Track expanded state for each experience
  const [expandedItems, setExpandedItems] = useState<{
    [key: number]: boolean;
  }>({});

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

  const timelineStyle = {
    borderLeft: `2px solid ${
      isLightMode ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"
    }`,
    paddingLeft: "2rem",
    marginLeft: "1rem",
    position: "relative" as const,
  };

  const timelineDotStyle = {
    position: "absolute" as const,
    left: "-0.5rem",
    top: "1.5rem",
    width: "1rem",
    height: "1rem",
    borderRadius: "50%",
    backgroundColor: isLightMode ? "#fff" : "#040411",
    border: `2px solid ${isLightMode ? "#dee2e6" : "#444"}`,
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

  const formatDate = (date?: { month?: number; year?: number }) => {
    if (!date || !date.year) return "";
    const month = date.month
      ? new Date(2000, date.month - 1).toLocaleString("default", {
          month: "long",
        })
      : "";
    return `${month} ${date.year}`;
  };

  const toggleExpand = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Function to truncate text
  const truncateText = (text: string, maxLength: number = 250) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="card mb-4" style={cardStyle}>
      <div className="card-body p-4">
        <div className="d-flex align-items-center mb-4">
          <Briefcase
            className="me-2"
            style={{ color: isLightMode ? "#666" : "#8c8c9e" }}
          />
          <h2 className="h4 mb-0">Experience</h2>
        </div>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="mb-5" style={timelineStyle}>
              <div style={timelineDotStyle} />

              <div className="d-flex align-items-start gap-3 mb-3">
                {exp.companyLogo && (
                  <img
                    src={exp.companyLogo}
                    alt={exp.companyName}
                    style={{
                      width: "48px",
                      height: "48px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      border: `1px solid ${
                        isLightMode
                          ? "rgba(0,0,0,0.1)"
                          : "rgba(255,255,255,0.1)"
                      }`,
                    }}
                  />
                )}
                <div className="flex-grow-1">
                  <h3 className="h5 mb-1">{exp.title}</h3>
                  <p className="mb-2" style={{ ...textStyle, fontWeight: 500 }}>
                    {exp.companyName}
                  </p>

                  <div
                    className="d-flex flex-wrap gap-3"
                    style={{ ...textStyle, fontSize: "0.9rem" }}
                  >
                    {exp.companyLocation && (
                      <div className="d-flex align-items-center gap-1">
                        <MapPin size={14} />
                        <span>{exp.companyLocation}</span>
                      </div>
                    )}
                    {exp.startEndDate && (
                      <div className="d-flex align-items-center gap-1">
                        <Calendar size={14} />
                        <span>
                          {formatDate(exp.startEndDate.start)} -{" "}
                          {exp.startEndDate.end
                            ? formatDate(exp.startEndDate.end)
                            : "Present"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {exp.description && (
                <>
                  <div
                    style={{
                      ...textStyle,
                      fontSize: "0.95rem",
                      lineHeight: "1.6",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {expandedItems[index]
                      ? exp.description
                      : truncateText(exp.description)}
                  </div>
                  {exp.description.length > 250 && (
                    <button
                      onClick={() => toggleExpand(index)}
                      style={buttonStyle}
                    >
                      {expandedItems[index] ? (
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
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileExperience;

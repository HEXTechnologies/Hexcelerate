// components/CandidatesProfile/ProfileEducation.tsx
"use client";

import { GraduationCap, Calendar } from "lucide-react";

interface Education {
  degreeName?: string | null;
  fieldOfStudy?: string | null;
  description?: string | null;
  schoolName: string;
  schoolLogo?: string;
  startEndDate?: {
    start?: { month?: number; year?: number };
    end?: { month?: number; year?: number } | null;
  };
}

interface ProfileEducationProps {
  educations: Education[];
  isLightMode: boolean;
}

const ProfileEducation = ({
  educations,
  isLightMode,
}: ProfileEducationProps) => {
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

  const formatDate = (date?: { month?: number; year?: number }) => {
    if (!date || !date.year) return "";
    const month = date.month
      ? new Date(2000, date.month - 1).toLocaleString("default", {
          month: "long",
        })
      : "";
    return `${month} ${date.year}`;
  };

  return (
    <div className="card mb-4" style={cardStyle}>
      <div className="card-body p-4">
        <div className="d-flex align-items-center mb-4">
          <GraduationCap
            className="me-2"
            style={{ color: isLightMode ? "#666" : "#8c8c9e" }}
          />
          <h2 className="h4 mb-0">Education</h2>
        </div>

        <div className="timeline">
          {educations.map((edu, index) => (
            <div key={index} className="mb-5" style={timelineStyle}>
              <div style={timelineDotStyle} />

              <div className="d-flex align-items-start gap-3 mb-3">
                {edu.schoolLogo && (
                  <img
                    src={edu.schoolLogo}
                    alt={edu.schoolName}
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
                  <h3 className="h5 mb-1">{edu.schoolName}</h3>
                  {edu.degreeName && edu.fieldOfStudy && (
                    <div
                      style={{
                        ...textStyle,
                        fontWeight: 500,
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          backgroundColor: isLightMode
                            ? "rgba(0,0,0,0.05)"
                            : "rgba(255,255,255,0.05)",
                          padding: "4px 12px",
                          borderRadius: "12px",
                          display: "inline-block",
                          fontSize: "0.9rem",
                          marginTop: "0.25rem",
                        }}
                      >
                        {edu.degreeName} - {edu.fieldOfStudy}
                      </span>
                    </div>
                  )}

                  {edu.startEndDate && (
                    <div
                      className="d-flex align-items-center gap-1"
                      style={{ ...textStyle, fontSize: "0.9rem" }}
                    >
                      <Calendar size={14} />
                      <span>
                        {formatDate(edu.startEndDate.start)} -{" "}
                        {edu.startEndDate.end
                          ? formatDate(edu.startEndDate.end)
                          : "Present"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {edu.description && (
                <div
                  style={{
                    ...textStyle,
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    whiteSpace: "pre-line",
                  }}
                >
                  {edu.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileEducation;

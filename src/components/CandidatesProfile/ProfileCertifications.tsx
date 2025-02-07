// components/CandidatesProfile/ProfileCertifications.tsx
"use client";

import { Medal, Calendar, ExternalLink } from "lucide-react";

interface Certification {
  name: string;
  organizationName: string;
  organizationUrl?: string;
  issuedDate: string | null;
}

interface ProfileCertificationsProps {
  certifications: Certification[];
  isLightMode: boolean;
}

const ProfileCertifications = ({
  certifications,
  isLightMode,
}: ProfileCertificationsProps) => {
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

  const linkButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    borderRadius: "12px",
    fontSize: "0.85rem",
    textDecoration: "none",
    backgroundColor: isLightMode
      ? "rgba(21, 101, 192, 0.1)"
      : "rgba(144, 202, 249, 0.1)",
    color: isLightMode ? "#1565c0" : "#90caf9",
    border: `1px solid ${
      isLightMode ? "rgba(21, 101, 192, 0.2)" : "rgba(144, 202, 249, 0.2)"
    }`,
    transition: "all 0.2s ease",
  };

  return (
    <div className="card mb-4" style={cardStyle}>
      <div className="card-body p-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-center">
            <Medal
              className="me-2"
              style={{ color: isLightMode ? "#666" : "#8c8c9e" }}
            />
            <h2 className="h4 mb-0">Certifications</h2>
          </div>
          <span
            className="badge"
            style={{
              backgroundColor: isLightMode
                ? "rgba(0,0,0,0.05)"
                : "rgba(255,255,255,0.05)",
              color: isLightMode ? "#666" : "#8c8c9e",
              padding: "4px 12px",
              borderRadius: "12px",
              fontSize: "0.9rem",
            }}
          >
            {certifications.length} Total
          </span>
        </div>

        <div className="timeline">
          {certifications.map((cert, index) => (
            <div key={index} className="mb-4" style={timelineStyle}>
              <div style={timelineDotStyle} />

              <div className="mb-2">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h3
                    className="h5 mb-1"
                    style={{
                      color: isLightMode ? "#333" : "#fff",
                      fontSize: "1.1rem",
                    }}
                  >
                    {cert.name}
                  </h3>
                  {cert.organizationUrl && (
                    <a
                      href={cert.organizationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={linkButtonStyle}
                    >
                      View Company
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>

                <div
                  className="d-flex flex-wrap gap-3"
                  style={{ ...textStyle, fontSize: "0.9rem" }}
                >
                  <div
                    style={{
                      backgroundColor: isLightMode
                        ? "rgba(0,0,0,0.05)"
                        : "rgba(255,255,255,0.05)",
                      padding: "4px 12px",
                      borderRadius: "12px",
                      display: "inline-block",
                    }}
                  >
                    {cert.organizationName}
                  </div>

                  {cert.issuedDate && (
                    <div className="d-flex align-items-center gap-1">
                      <Calendar size={14} />
                      <span>{cert.issuedDate}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCertifications;

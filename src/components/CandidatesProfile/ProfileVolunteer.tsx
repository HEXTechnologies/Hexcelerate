"use client";

import { Heart, Tag } from "lucide-react";

interface VolunteerExperience {
  cause: string;
  organizationName: string;
  period: string;
  role: string;
}

interface ProfileVolunteerProps {
  volunteeringExperiences: {
    volunteeringExperienceHistory: VolunteerExperience[];
  };
  isLightMode: boolean;
}

const ProfileVolunteer = ({
  volunteeringExperiences,
  isLightMode,
}: ProfileVolunteerProps) => {
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

  const chipStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.25rem",
    padding: "0.25rem 0.75rem",
    borderRadius: "1rem",
    fontSize: "0.8rem",
    backgroundColor: isLightMode
      ? "rgba(0,0,0,0.05)"
      : "rgba(255,255,255,0.05)",
    color: isLightMode ? "#666" : "#8c8c9e",
    marginBottom: "0.5rem",
  };

  return (
    <div className="card mb-4" style={cardStyle}>
      <div className="card-body p-4">
        <div className="d-flex align-items-center mb-4">
          <Heart
            className="me-2"
            style={{ color: isLightMode ? "#666" : "#8c8c9e" }}
          />
          <h2 className="h4 mb-0">Volunteer Experience</h2>
        </div>

        <div className="timeline">
          {volunteeringExperiences.volunteeringExperienceHistory.map(
            (exp, index) => (
              <div key={index} className="mb-5" style={timelineStyle}>
                <div style={timelineDotStyle} />

                <div className="mb-3">
                  <h3 className="h5 mb-1">{exp.role}</h3>
                  <p className="mb-2" style={{ ...textStyle, fontWeight: 500 }}>
                    {exp.organizationName}
                  </p>
                  <p
                    className="mb-2"
                    style={{ ...textStyle, fontSize: "0.9rem" }}
                  >
                    {exp.period}
                  </p>
                  <div style={chipStyle}>
                    <Tag size={14} />
                    <span>{exp.cause}</span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileVolunteer;

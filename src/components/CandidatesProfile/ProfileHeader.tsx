// components/CandidatesProfile/ProfileHeader.tsx
"use client";

import { Pencil, Image } from "lucide-react";
import { useState } from "react";

interface ProfileHeaderProps {
  profilePicUrl?: string;
  backgroundUrl?: string;
  fullName?: string;
  headline?: string;
  location?: string;
  isLightMode: boolean;
  schoolName?: string;
}

const ProfileHeader = ({
  profilePicUrl,
  backgroundUrl,
  fullName,
  headline,
  location,
  isLightMode,
  schoolName,
}: ProfileHeaderProps) => {
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

  const textStyle = {
    color: isLightMode ? "#666" : "#ccc",
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
        backgroundSize: "cover", // Changed to contain
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", // Added to prevent repeating
        backgroundColor: isLightMode ? "#f0f0f0" : "#2d2d2d", // Background color for empty space
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

  return (
    <div className="card mb-4" style={cardStyle}>
      {/* Background */}
      <div style={backgroundStyle}>
        {/* Toggle Background Button */}
        {backgroundUrl && (
          <button
            style={{ ...buttonStyle, top: "20px", left: "20px" }}
            onClick={() => setUseGradient(!useGradient)}
          >
            <Image size={16} />
            {useGradient ? "Show Banner" : "Show Gradient"}
          </button>
        )}

        {/* Edit Profile Button */}
        <button style={{ ...buttonStyle, top: "20px", right: "20px" }}>
          <Pencil size={16} />
          Edit Profile
        </button>
      </div>

      <div
        className="card-body position-relative"
        style={{
          marginTop: "-100px",
          paddingLeft: "32px",
        }}
      >
        {profilePicUrl && (
          <img
            src={profilePicUrl}
            alt={fullName}
            className="rounded-circle border-4 mb-3"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              border: `4px solid ${isLightMode ? "#fff" : "#1a1a1a"}`,
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
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
            {fullName}
          </h1>
          {headline && (
            <div
              //   className="badge"
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
              SOFTWARE ENGINEERING RESIDENT
            </div>
          )}
        </div>
        <div>
          {schoolName && (
            <div
              className="mb-2"
              style={{
                fontSize: "0.9rem",
                color: isLightMode ? "#333" : "#fff",
              }}
            >
              {schoolName}
            </div>
          )}
          {location && (
            <div
              className="d-flex align-items-center"
              style={{ color: isLightMode ? "#333" : "#fff", marginTop: "8px" }}
            >
              <span>{location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

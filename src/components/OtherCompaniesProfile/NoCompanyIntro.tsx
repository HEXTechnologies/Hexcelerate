import React from "react";

interface NoCompanyIntroProps {
  isLightMode: boolean;
}

const NoCompanyIntro = ({ isLightMode }: NoCompanyIntroProps) => {
  const cardStyle = {
    backgroundColor: isLightMode ? "#fff" : "#040411",
    color: isLightMode ? "#000" : "#fff",
    borderRadius: "1rem",
    borderColor: isLightMode ? "#dee2e6" : "#444",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "1.5rem",
    padding: "2rem",
    textAlign: "center" as const,
  };

  const headingStyle = {
    color: isLightMode ? "#333" : "#fff",
    marginBottom: "1rem",
    fontSize: "1.75rem",
    fontWeight: "600",
  };

  const textStyle = {
    color: isLightMode ? "#666" : "#ccc",
    fontSize: "1.1rem",
    marginBottom: "1rem",
  };

  return (
    <div className="card" style={cardStyle}>
      <div className="card-body">
        <h2 style={headingStyle}>No Profile Built Yet!</h2>
        <p style={textStyle}>
          This company is still building their profile. Please check back later.
        </p>
        <div
          className="gradient-text"
          style={{
            fontSize: "1.2rem",
            fontWeight: "500",
            marginTop: "1.5rem",
            cursor: "pointer"
          }}
          onClick={() => window.history.back()}
        >
          Go Back
        </div>
      </div>
    </div>
  );
};

export default NoCompanyIntro;

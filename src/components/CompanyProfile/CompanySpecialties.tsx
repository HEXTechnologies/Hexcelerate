"use client";

import React from "react";
import { Boxes } from "lucide-react";

interface CompanySpecialtiesProps {
  specialties: string[];
  isLightMode: boolean;
}

const CompanySpecialties = ({
  specialties,
  isLightMode,
}: CompanySpecialtiesProps) => {
  const cardStyle = {
    backgroundColor: isLightMode ? "#fff" : "#040411",
    color: isLightMode ? "#000" : "#fff",
    borderRadius: "1rem",
    borderColor: isLightMode ? "#dee2e6" : "#444",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "1.5rem",
    overflow: "hidden",
  };

  const skillBadgeStyle = {
    display: "inline-block",
    padding: "8px 16px",
    margin: "4px",
    borderRadius: "20px",
    fontSize: "0.9rem",
    backgroundColor: isLightMode ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)",
    color: isLightMode ? "#333" : "#fff",
    border: `1px solid ${isLightMode ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)"}`,
    transition: "all 0.2s ease",
  };

  return (
    <div className="card mb-4" style={cardStyle}>
      <div className="card-body p-4">
        <div className="d-flex align-items-center mb-4">
          <Boxes
            className="me-2"
            style={{ color: isLightMode ? "#666" : "#8c8c9e" }}
          />
          <h2 className="h4 mb-0">Specialties</h2>
        </div>

        <div className="d-flex flex-wrap gap-2">
          {specialties.map((specialty, index) => (
            <div key={index} style={skillBadgeStyle}>
              {specialty}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanySpecialties;
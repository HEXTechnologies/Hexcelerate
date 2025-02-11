"use client";

import { Users, TrendingUp, LineChart } from "lucide-react";

interface CompanyStatsProps {
  employeeCount: number;
  followerCount: number;
  isLightMode: boolean;
}

const CompanyStats = ({
  employeeCount,
  followerCount,
  isLightMode,
}: CompanyStatsProps) => {
  const cardStyle = {
    backgroundColor: isLightMode ? "#fff" : "#040411",
    color: isLightMode ? "#000" : "#fff",
    borderRadius: "1rem",
    border: `1px solid ${isLightMode ? "#dee2e6" : "#444"}`,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "1.5rem",
    overflow: "hidden",
    padding: "1.25rem",
  };

  const textStyle = {
    color: isLightMode ? "#666" : "#8c8c9e",
  };

  const statItemStyle = {
    backgroundColor: isLightMode ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)",
    borderRadius: "10px",
    padding: "0.75rem",
    marginBottom: "0.5rem",
    border: `1px solid ${isLightMode ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)"}`,
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div style={cardStyle}>
      <div className="text-center mb-3">
        <h2 className="h5 mb-0">Company Statistics</h2>
        <p style={{ ...textStyle, fontSize: "0.9rem" }} className="mt-1">
          Key metrics and growth indicators
        </p>
      </div>

      <div className="mt-3">
        <div style={statItemStyle}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex align-items-center gap-2">
              <Users size={16} style={{ color: "#6366F1" }} />
              <span style={{ fontSize: "0.9rem" }}>Employees</span>
            </div>
            <span style={{ fontSize: "0.9rem" }}>{formatNumber(employeeCount)}</span>
          </div>
          <div className="progress" style={{ height: "4px" }}>
            <div
              className="progress-bar"
              style={{ width: "100%", backgroundColor: "#6366F1" }}
            />
          </div>
        </div>

        <div style={statItemStyle}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex align-items-center gap-2">
              <TrendingUp size={16} style={{ color: "#10B981" }} />
              <span style={{ fontSize: "0.9rem" }}>Followers</span>
            </div>
            <span style={{ fontSize: "0.9rem" }}>{formatNumber(followerCount)}</span>
          </div>
          <div className="progress" style={{ height: "4px" }}>
            <div
              className="progress-bar"
              style={{ width: "100%", backgroundColor: "#10B981" }}
            />
          </div>
        </div>

        <div style={statItemStyle}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex align-items-center gap-2">
              <LineChart size={16} style={{ color: "#F59E0B" }} />
              <span style={{ fontSize: "0.9rem" }}>Growth Rate</span>
            </div>
            <span style={{ fontSize: "0.9rem" }}>High</span>
          </div>
          <div className="progress" style={{ height: "4px" }}>
            <div
              className="progress-bar"
              style={{ width: "85%", backgroundColor: "#F59E0B" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyStats;
// components/CandidatesProfile/LikelihoodScore.tsx
"use client";

import { Zap, Target, TrendingUp, Users } from "lucide-react";

interface LikelihoodScoreProps {
  isLightMode: boolean;
}

const LikelihoodScore = ({ isLightMode }: LikelihoodScoreProps) => {
  const cardStyle = {
    backgroundColor: isLightMode ? "#fff" : "#040411",
    color: isLightMode ? "#000" : "#fff",
    borderRadius: "1rem",
    border: `1px solid ${isLightMode ? "#dee2e6" : "#444"}`,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "1.5rem",
    overflow: "hidden",
    padding: "1.25rem", // Reduced padding
  };

  const textStyle = {
    color: isLightMode ? "#666" : "#8c8c9e",
  };

  const scoreCircleStyle = {
    width: "160px", // Reduced from 200px
    height: "160px", // Reduced from 200px
    borderRadius: "50%",
    border: `12px solid ${isLightMode ? "#e0e0e0" : "#1a1a1a"}`, // Reduced from 15px
    position: "relative" as const,
    margin: "0.75rem auto", // Reduced margin
  };

  const scoreArcStyle = {
    width: "160px", // Reduced from 200px
    height: "160px", // Reduced from 200px
    borderRadius: "50%",
    border: "12px solid transparent", // Reduced from 15px
    borderTop: "12px solid #10B981", // Reduced from 15px
    position: "absolute" as const,
    top: "-12px", // Adjusted for new border width
    left: "-12px", // Adjusted for new border width
    transform: "rotate(-45deg)",
  };

  const statItemStyle = {
    backgroundColor: isLightMode
      ? "rgba(0,0,0,0.03)"
      : "rgba(255,255,255,0.03)",
    borderRadius: "10px", // Slightly reduced
    padding: "0.75rem", // Reduced padding
    marginBottom: "0.5rem",
    border: `1px solid ${
      isLightMode ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)"
    }`,
  };

  return (
    <div style={cardStyle}>
      <div className="text-center mb-3">
        {" "}
        {/* Reduced margin */}
        <h2 className="h5 mb-0">Likelihood Score</h2>{" "}
        {/* Changed from h4 to h5 */}
        <p style={{ ...textStyle, fontSize: "0.9rem" }} className="mt-1">
          {" "}
          {/* Reduced margin and font size */}
          Your probability of getting hired
        </p>
      </div>

      <div style={scoreCircleStyle}>
        <div style={scoreArcStyle} />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <div className="d-flex align-items-center justify-content-center gap-1">
            {" "}
            {/* Reduced gap */}
            <span style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
              18
            </span>{" "}
            {/* Reduced font size */}
            <Zap size={20} color="#10B981" /> {/* Reduced icon size */}
          </div>
          <div style={{ ...textStyle, fontSize: "0.8rem" }}>SCORE</div>{" "}
          {/* Reduced font size */}
        </div>
      </div>

      <div className="mt-3">
        {" "}
        {/* Reduced margin */}
        <div style={statItemStyle}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex align-items-center gap-2">
              <Target size={16} className="text-primary" />{" "}
              {/* Reduced icon size */}
              <span style={{ fontSize: "0.9rem" }}>Match Rate</span>
            </div>
            <span style={{ fontSize: "0.9rem" }}>85%</span>
          </div>
          <div className="progress" style={{ height: "4px" }}>
            {" "}
            {/* Reduced height */}
            <div className="progress-bar bg-primary" style={{ width: "85%" }} />
          </div>
        </div>
        <div style={statItemStyle}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex align-items-center gap-2">
              <TrendingUp size={16} style={{ color: "#10B981" }} />
              <span style={{ fontSize: "0.9rem" }}>Success Rate</span>
            </div>
            <span style={{ fontSize: "0.9rem" }}>72%</span>
          </div>
          <div className="progress" style={{ height: "4px" }}>
            <div
              className="progress-bar"
              style={{ width: "72%", backgroundColor: "#10B981" }}
            />
          </div>
        </div>
        <div style={statItemStyle}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex align-items-center gap-2">
              <Users size={16} style={{ color: "#6366F1" }} />
              <span style={{ fontSize: "0.9rem" }}>Industry Demand</span>
            </div>
            <span style={{ fontSize: "0.9rem" }}>91%</span>
          </div>
          <div className="progress" style={{ height: "4px" }}>
            <div
              className="progress-bar"
              style={{ width: "91%", backgroundColor: "#6366F1" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikelihoodScore;

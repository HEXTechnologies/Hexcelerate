"use client";

import React from "react";

interface ScoreDisplayProps {
  score: number;
  isLightMode: boolean;
}

const ScoreDisplay = ({ score, isLightMode }: ScoreDisplayProps) => {
  // Function to determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 90) return "#22c55e"; // Green
    if (score >= 75) return "#3b82f6"; // Blue
    if (score >= 60) return "#f59e0b"; // Yellow
    return "#ef4444"; // Red
  };

  const scoreStyle = {
    position: "absolute" as const,
    top: "-30px",
    right: "10px",
    backgroundColor: isLightMode
      ? "rgba(255, 255, 255, 0.9)"
      : "rgba(0, 0, 0, 0.8)",
    borderRadius: "12px",
    padding: "4px 12px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    border: `1px solid ${
      isLightMode ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"
    }`,
    display: "flex",
    alignItems: "center",
    gap: "6px",
    zIndex: 1,
  };

  const dotStyle = {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: getScoreColor(score),
  };

  return (
    <div style={scoreStyle}>
      <div style={dotStyle}></div>
      <span
        style={{
          fontSize: "0.875rem",
          fontWeight: 600,
          color: isLightMode ? "#1a1a1a" : "#fff",
        }}
      >
        {score}%
      </span>
    </div>
  );
};

export default ScoreDisplay;

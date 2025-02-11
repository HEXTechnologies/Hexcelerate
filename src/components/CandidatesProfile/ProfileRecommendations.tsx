"use client";

import React, { useState } from "react";
import { MessageCircle, ChevronDown, ChevronUp } from "lucide-react";

interface Recommendation {
  authorFullname: string;
  authorUrl: string;
  caption: string;
  description: string;
}

interface ProfileRecommendationsProps {
  recommendations: {
    recommendationHistory: Recommendation[];
  };
  isLightMode: boolean;
}

const ProfileRecommendations = ({
  recommendations,
  isLightMode,
}: ProfileRecommendationsProps) => {
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

  const truncateText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const toggleExpand = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="card mb-4" style={cardStyle}>
      <div className="card-body p-4">
        <div className="d-flex align-items-center mb-4">
          <MessageCircle
            className="me-2"
            style={{ color: isLightMode ? "#666" : "#8c8c9e" }}
          />
          <h2 className="h4 mb-0">Recommendations</h2>
        </div>

        <div className="timeline">
          {recommendations.recommendationHistory.map((rec, index) => (
            <div key={index} className="mb-5" style={timelineStyle}>
              <div style={timelineDotStyle} />

              <div className="mb-3">
                <a
                  href={rec.authorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h5 mb-1 d-block"
                  style={{
                    color: isLightMode ? "#007bff" : "#4da3ff",
                    textDecoration: "none",
                  }}
                >
                  {rec.authorFullname}
                </a>
                <p
                  className="mb-2"
                  style={{ ...textStyle, fontSize: "0.9rem" }}
                >
                  {rec.caption}
                </p>
              </div>

              <div>
                <div
                  style={{
                    ...textStyle,
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    whiteSpace: "pre-line",
                  }}
                >
                  &quot;
                  {expandedItems[index]
                    ? rec.description
                    : truncateText(rec.description)}
                  &quot;
                </div>
                {rec.description.length > 200 && (
                  <button
                    onClick={() => toggleExpand(index)}
                    style={buttonStyle}
                    className="d-flex align-items-center"
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileRecommendations;

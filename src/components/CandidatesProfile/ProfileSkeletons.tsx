// components/CandidatesProfile/ProfileSkeletons.tsx
"use client";

interface SkeletonProps {
  isLightMode: boolean;
}

const ProfileSkeletons = ({ isLightMode }: SkeletonProps) => {
  const cardStyle = {
    backgroundColor: isLightMode ? "#fff" : "#040411",
    color: isLightMode ? "#333" : "#fff",
    borderRadius: "1rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "1.5rem",
    overflow: "hidden",
  };

  const shimmerStyle = {
    backgroundImage: `linear-gradient(
      90deg,
      ${isLightMode ? "#f0f0f0" : "#1a1a1a"} 0%,
      ${isLightMode ? "#fafafa" : "#252525"} 50%,
      ${isLightMode ? "#f0f0f0" : "#1a1a1a"} 100%
    )`,
    backgroundSize: "200% 100%",
    animation: "shimmer 2s infinite",
  };

  const likelihoodSkeletonStyle = {
    backgroundColor: isLightMode ? "#fff" : "#040411",
    color: isLightMode ? "#333" : "#fff",
    borderRadius: "1rem",
    border: `1px solid ${isLightMode ? "#dee2e6" : "#444"}`,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "1.25rem",
    height: "fit-content",
  };

  return (
    <div className="container py-4">
      <div className="row">
        {/* Main Content Column */}
        <div className="col-md-8">
          {/* Header Skeleton */}
          <div className="card mb-4" style={cardStyle}>
            {/* Background gradient */}
            <div
              style={{
                height: "200px",
                background:
                  "linear-gradient(90deg, rgba(109, 189, 255, 0.64), rgba(58, 118, 207, 0.625), rgba(18, 57, 215, 0.599), rgba(100, 57, 240, 0.531), rgba(131, 49, 255, 0.477))",
              }}
            />

            <div
              className="card-body position-relative"
              style={{ marginTop: "-100px", paddingLeft: "32px" }}
            >
              {/* Profile Picture Skeleton */}
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  marginBottom: "1rem",
                  border: `4px solid ${isLightMode ? "#fff" : "#1a1a1a"}`,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  ...shimmerStyle,
                }}
              />

              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                {/* Name Skeleton */}
                <div
                  style={{
                    height: "2rem",
                    width: "200px",
                    ...shimmerStyle,
                  }}
                />

                {/* Badge Skeleton */}
                <div
                  style={{
                    height: "2rem",
                    width: "250px",
                    borderRadius: "8px",
                    backgroundColor: isLightMode
                      ? "rgba(0,0,0,0.03)"
                      : "rgba(255,255,255,0.03)",
                    border: `1px solid ${
                      isLightMode ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)"
                    }`,
                    ...shimmerStyle,
                  }}
                />
              </div>

              <div style={{ marginTop: "16px" }}>
                {/* School Name Skeleton */}
                <div
                  style={{
                    height: "1.2rem",
                    width: "300px",
                    marginBottom: "0.5rem",
                    ...shimmerStyle,
                  }}
                />

                {/* Location Skeleton */}
                <div
                  style={{
                    height: "1rem",
                    width: "200px",
                    marginTop: "8px",
                    ...shimmerStyle,
                  }}
                />
              </div>
            </div>
          </div>

          {/* About Skeleton */}
          <div className="card mb-4" style={cardStyle}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div
                  style={{ height: "1.5rem", width: "30%", ...shimmerStyle }}
                />
                <div
                  style={{
                    height: "2rem",
                    width: "20%",
                    borderRadius: "20px",
                    ...shimmerStyle,
                  }}
                />
              </div>
              <div
                style={{
                  height: "5rem",
                  marginBottom: "1.5rem",
                  ...shimmerStyle,
                }}
              />
              <div style={{ height: "8rem", ...shimmerStyle }} />
            </div>
          </div>

          {/* Experience Skeleton */}
          <div className="card mb-4" style={cardStyle}>
            <div className="card-body p-4">
              <div
                style={{
                  height: "1.5rem",
                  width: "30%",
                  marginBottom: "2rem",
                  ...shimmerStyle,
                }}
              />
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="mb-4 ps-4">
                  <div className="d-flex gap-3 mb-3">
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "8px",
                        ...shimmerStyle,
                      }}
                    />
                    <div className="flex-grow-1">
                      <div
                        style={{
                          height: "1.5rem",
                          width: "70%",
                          marginBottom: "0.5rem",
                          ...shimmerStyle,
                        }}
                      />
                      <div
                        style={{
                          height: "1rem",
                          width: "50%",
                          marginBottom: "0.5rem",
                          ...shimmerStyle,
                        }}
                      />
                      <div
                        style={{
                          height: "1rem",
                          width: "30%",
                          ...shimmerStyle,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Skeleton */}
          <div className="card mb-4" style={cardStyle}>
            <div className="card-body p-4">
              <div
                style={{
                  height: "1.5rem",
                  width: "30%",
                  marginBottom: "2rem",
                  ...shimmerStyle,
                }}
              />
              <div className="d-flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                  <div
                    key={index}
                    style={{
                      height: "2rem",
                      width: `${Math.random() * (120 - 80) + 80}px`,
                      borderRadius: "20px",
                      ...shimmerStyle,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Likelihood Score Skeleton */}
        <div className="col-md-4">
          <div style={likelihoodSkeletonStyle}>
            {/* Title */}
            <div className="text-center mb-3">
              <div
                style={{
                  height: "1.5rem",
                  width: "60%",
                  margin: "0 auto",
                  marginBottom: "0.5rem",
                  borderRadius: "4px",
                  ...shimmerStyle,
                }}
              />
              <div
                style={{
                  height: "1rem",
                  width: "80%",
                  margin: "0 auto",
                  borderRadius: "4px",
                  ...shimmerStyle,
                }}
              />
            </div>

            {/* Circle Score */}
            <div
              style={{
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                margin: "1.5rem auto",
                border: `12px solid ${isLightMode ? "#e0e0e0" : "#1a1a1a"}`,
                position: "relative",
                ...shimmerStyle,
              }}
            />

            {/* Stats Bars */}
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                style={{
                  padding: "0.75rem",
                  marginBottom: "0.5rem",
                  borderRadius: "10px",
                  backgroundColor: isLightMode
                    ? "rgba(0,0,0,0.03)"
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${
                    isLightMode ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)"
                  }`,
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div
                    style={{
                      height: "1rem",
                      width: "40%",
                      borderRadius: "4px",
                      ...shimmerStyle,
                    }}
                  />
                  <div
                    style={{
                      height: "1rem",
                      width: "20%",
                      borderRadius: "4px",
                      ...shimmerStyle,
                    }}
                  />
                </div>
                <div
                  style={{
                    height: "4px",
                    borderRadius: "2px",
                    ...shimmerStyle,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// CSS for shimmer animation
const style = `
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

// Add style to document
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = style;
  document.head.appendChild(styleElement);
}

export default ProfileSkeletons;

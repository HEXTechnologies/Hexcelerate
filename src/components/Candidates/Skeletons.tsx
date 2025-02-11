import React from "react";

const SidebarSkeleton = ({ isLightMode }: { isLightMode: boolean }) => {
  const sidebarStyle = {
    backgroundColor: isLightMode ? "#040411" : "#040411",
    borderRight: isLightMode
      ? "1px solid rgba(255, 255, 255, 0.1)"
      : "1px solid rgba(255, 255, 255, 0.1)",
    padding: "1.5rem",
    height: "100vh",
    position: "sticky" as const,
    top: 0,
    overflowY: "auto" as const,
  };

  const pulseAnimation = {
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  };

  const skeletonStyle = {
    backgroundColor: isLightMode
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(255, 255, 255, 0.1)",
    borderRadius: "0.375rem",
    ...pulseAnimation,
  };

  return (
    <div style={sidebarStyle}>
      <div className="d-flex justify-content-between align-items-center mb-4 mt-5">
        <div
          style={{
            ...skeletonStyle,
            height: "2rem",
            width: "8rem",
          }}
        />
        <div
          style={{
            ...skeletonStyle,
            height: "2rem",
            width: "6rem",
          }}
        />
      </div>

      {[1, 2, 3, 4, 5].map((index) => (
        <div key={index} className="mb-4">
          <div
            style={{
              ...skeletonStyle,
              height: "1rem",
              width: "5rem",
              marginBottom: "0.5rem",
            }}
          />
          <div
            style={{
              ...skeletonStyle,
              height: "2.5rem",
              width: "100%",
            }}
          />
        </div>
      ))}
    </div>
  );
};

const HeaderSkeleton = ({ isLightMode }: { isLightMode: boolean }) => {
  const pulseAnimation = {
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  };

  const skeletonStyle = {
    backgroundColor: isLightMode
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(255, 255, 255, 0.1)",
    borderRadius: "0.375rem",
    ...pulseAnimation,
  };

  return (
    <div className="row mb-4">
      <div className="col">
        {/* Main Title Skeleton */}
        <div
          className="mb-3 mt-4"
          style={{
            ...skeletonStyle,
            height: "2.5rem",
            width: "800px",
          }}
        />
        {/* Subtitle Skeleton */}
        <div
          className="mb-4"
          style={{
            ...skeletonStyle,
            height: "1.5rem",
            width: "500px",
          }}
        />
      </div>
    </div>
  );
};

const ProfileCardSkeleton = ({ isLightMode }: { isLightMode: boolean }) => {
  const cardStyle = {
    backgroundColor: isLightMode ? "#040411" : "#040411",
    color: isLightMode ? "#000" : "#fff",
    borderRadius: "1rem",
    borderColor: isLightMode ? "#444" : "#444",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const gradientStyle = {
    height: "100px",
    background:
      "linear-gradient(90deg, rgba(109, 189, 255, 0.64), rgba(58, 118, 207, 0.625), rgba(18, 57, 215, 0.599), rgba(100, 57, 240, 0.531), rgba(131, 49, 255, 0.477))",
    position: "relative" as const,
  };

  const pulseAnimation = {
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  };

  const skeletonStyle = {
    backgroundColor: isLightMode
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(255, 255, 255, 0.1)",
    borderRadius: "0.375rem",
    ...pulseAnimation,
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card" style={cardStyle}>
        <div style={gradientStyle} />
        <div
          className="card-body position-relative"
          style={{ marginTop: "-60px", padding: "20px" }}
        >
          {/* Score Display Skeleton */}
          <div
            style={{
              ...skeletonStyle,
              position: "absolute",
              top: "-30px",
              right: "10px",
              height: "1.5rem",
              width: "3rem",
              borderRadius: "0.5rem",
            }}
          />

          {/* Profile Image Skeleton */}
          <div
            className="rounded-circle mb-3"
            style={{
              ...skeletonStyle,
              width: "80px",
              height: "80px",
              border: `4px solid ${isLightMode ? "#1a1a1a" : "#1a1a1a"}`,
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />

          {/* Name Skeleton */}
          <div
            style={{
              ...skeletonStyle,
              height: "1.5rem",
              width: "60%",
              marginBottom: "0.75rem",
            }}
          />

          {/* Candidate Tag Skeleton */}
          <div
            style={{
              ...skeletonStyle,
              height: "2rem",
              width: "40%",
              margin: "8px 0",
            }}
          />

          {/* School Skeleton */}
          <div
            style={{
              padding: "8px",
              backgroundColor: isLightMode
                ? "rgba(0,0,0,0.02)"
                : "rgba(255,255,255,0.02)",
              borderRadius: "8px",
              border: `1px solid ${
                isLightMode ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)"
              }`,
              marginBottom: "0.5rem",
            }}
          >
            <div
              style={{
                ...skeletonStyle,
                height: "1rem",
                width: "100%",
              }}
            />
          </div>

          {/* Location Skeleton */}
          <div
            style={{
              ...skeletonStyle,
              height: "1rem",
              width: "50%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Add the pulse animation keyframes to the document
// CSS for shimmer animation
const style = `
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: .5;
    }
  }
`;

// Add style to document
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = style;
  document.head.appendChild(styleElement);
}

export { SidebarSkeleton, ProfileCardSkeleton, HeaderSkeleton };

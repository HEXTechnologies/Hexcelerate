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

  const skeletonStyle = {
    backgroundColor: isLightMode
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(255, 255, 255, 0.1)",
    borderRadius: "0.375rem",
    position: "relative" as const,
    overflow: "hidden" as const,
  };

  const shimmerStyle = {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)",
    animation: "shimmer 2s infinite",
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
        >
          <div style={shimmerStyle} />
        </div>
        <div
          style={{
            ...skeletonStyle,
            height: "2rem",
            width: "6rem",
          }}
        >
          <div style={shimmerStyle} />
        </div>
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
          >
            <div style={shimmerStyle} />
          </div>
          <div
            style={{
              ...skeletonStyle,
              height: "2.5rem",
              width: "100%",
            }}
          >
            <div style={shimmerStyle} />
          </div>
        </div>
      ))}
    </div>
  );
};

const HeaderSkeleton = ({ isLightMode }: { isLightMode: boolean }) => {
  const skeletonStyle = {
    backgroundColor: isLightMode
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(255, 255, 255, 0.1)",
    borderRadius: "0.375rem",
    position: "relative" as const,
    overflow: "hidden" as const,
  };

  const shimmerStyle = {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)",
    animation: "shimmer 2s infinite",
  };

  return (
    <div className="row mb-4">
      <div className="col">
        <div
          className="mb-3 mt-4"
          style={{
            ...skeletonStyle,
            height: "2.5rem",
            width: "800px",
          }}
        >
          <div style={shimmerStyle} />
        </div>
        <div
          className="mb-4"
          style={{
            ...skeletonStyle,
            height: "1.5rem",
            width: "500px",
          }}
        >
          <div style={shimmerStyle} />
        </div>
      </div>
    </div>
  );
};

const CompanyCardSkeleton = ({ isLightMode }: { isLightMode: boolean }) => {
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

  const skeletonStyle = {
    backgroundColor: isLightMode
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(255, 255, 255, 0.1)",
    borderRadius: "0.375rem",
    position: "relative" as const,
    overflow: "hidden" as const,
  };

  const shimmerStyle = {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)",
    animation: "shimmer 2s infinite",
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card" style={cardStyle}>
        <div style={gradientStyle} />
        <div
          className="card-body position-relative"
          style={{ marginTop: "-60px", padding: "20px" }}
        >
          {/* Logo Skeleton */}
          <div
            className="rounded-circle mb-3"
            style={{
              ...skeletonStyle,
              width: "80px",
              height: "80px",
              border: `4px solid ${isLightMode ? "#1a1a1a" : "#1a1a1a"}`,
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={shimmerStyle} />
          </div>

          {/* Company Name Skeleton */}
          <div
            style={{
              ...skeletonStyle,
              height: "1.5rem",
              width: "60%",
              marginBottom: "0.75rem",
            }}
          >
            <div style={shimmerStyle} />
          </div>

          {/* Industry Tag Skeleton */}
          <div
            style={{
              ...skeletonStyle,
              height: "2rem",
              width: "40%",
              margin: "8px 0",
            }}
          >
            <div style={shimmerStyle} />
          </div>

          {/* Employee Count Skeleton */}
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
            >
              <div style={shimmerStyle} />
            </div>
          </div>

          {/* Location Skeleton */}
          <div
            style={{
              ...skeletonStyle,
              height: "1rem",
              width: "50%",
            }}
          >
            <div style={shimmerStyle} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Add the shimmer animation keyframes to the document
const style = `
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

// Add style to document
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = style;
  document.head.appendChild(styleElement);
}

export { SidebarSkeleton, CompanyCardSkeleton, HeaderSkeleton };

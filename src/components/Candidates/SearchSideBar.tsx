import React, { useMemo } from "react";
import { Search, X } from "lucide-react";

interface SearchSidebarProps {
  isLightMode: boolean;
  filters: {
    searchTerm: string;
    location: string;
    skills: string[];
    experience: string;
    schools?: {
      educationHistory?: string;
    };
  };
  candidates: Array<{
    linkedInData?: {
      person: {
        schools?: {
          educationHistory?: Array<{
            schoolName: string;
          }>;
        };
      };
    };
  }>;
  onFilterChange: (filterName: string, value: any) => void;
  onClearFilters: () => void;
}

const SearchSidebar = ({
  isLightMode,
  filters,
  candidates,
  onFilterChange,
  onClearFilters,
}: SearchSidebarProps) => {
  const sidebarStyle = {
    backgroundColor: isLightMode ? "#ffffff" : "#000",
    borderRight: isLightMode ? "1px solid #e5e5e5" : "1px solid #333",
    padding: "1.5rem",
    height: "100vh",
    position: "sticky" as const,
    top: 0,
    overflowY: "auto" as const,
  };

  const headerStyle = {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: isLightMode ? "#333" : "#fff",
    marginBottom: "1.5rem",
  };

  const inputStyle = {
    backgroundColor: isLightMode ? "#f8f9fa" : "#040411",
    border: isLightMode ? "1px solid #dee2e6" : "1px solid #404040",
    color: isLightMode ? "#333" : "#fff",
    padding: "0.5rem",
    borderRadius: "0.375rem",
    width: "100%",
  };

  const labelStyle = {
    color: isLightMode ? "#666" : "#aaa",
    fontSize: "0.875rem",
    marginBottom: "0.5rem",
  };

  const sectionStyle = {
    marginBottom: "0.5rem",
  };

  const clearButtonStyle = {
    backgroundColor: "transparent",
    border: isLightMode ? "1px solid #dee2e6" : "1px solid #404040",
    color: isLightMode ? "#666" : "#aaa",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    cursor: "pointer",
    fontSize: "0.7rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  const experienceLevels = [
    "Intern",
    "Entry Level",
    "Mid Level",
    "Senior Level",
    "Executive Level",
  ];

  // Extract unique schools from candidates data
  const uniqueSchools = useMemo(() => {
    const schoolsSet = new Set<string>();

    candidates.forEach((candidate) => {
      const educationHistory =
        candidate.linkedInData?.person.schools?.educationHistory;
      if (educationHistory && Array.isArray(educationHistory)) {
        educationHistory.forEach((education) => {
          if (education.schoolName) {
            schoolsSet.add(education.schoolName);
          }
        });
      }
    });

    return Array.from(schoolsSet).sort();
  }, [candidates]);

  return (
    <div style={sidebarStyle}>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', gap: '1rem', marginTop: '4.5rem' }}>
      <h2 style={{ ...headerStyle, margin: 0 }}>Search Filters</h2>
      <button
        onClick={onClearFilters}
        style={{ ...clearButtonStyle, marginLeft: 'auto' }}
        className="btn-clear"
      >
        <X size={16} />
        Clear
      </button>
    </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Name</label>
        <div className="position-relative">
          <input
            type="text"
            placeholder="Name..."
            value={filters.searchTerm}
            onChange={(e) => onFilterChange("searchTerm", e.target.value)}
            style={inputStyle}
          />
          <Search
            size={16}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: isLightMode ? "#666" : "#aaa",
            }}
          />
        </div>
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Location</label>
        <input
          type="text"
          placeholder="Location..."
          value={filters.location}
          onChange={(e) => onFilterChange("location", e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Skills</label>
        <input
          type="text"
          placeholder="Skills..."
          value={filters.skills.join(", ")}
          onChange={(e) =>
            onFilterChange(
              "skills",
              e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            )
          }
          style={inputStyle}
        />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Experience Level</label>
        <select
          value={filters.experience}
          onChange={(e) => onFilterChange("experience", e.target.value)}
          style={inputStyle}
          className="form-select"
        >
          <option value="">All Levels</option>
          {experienceLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Education Institute</label>
        <select
          value={filters.schools?.educationHistory || ""}
          onChange={(e) =>
            onFilterChange("schools", { educationHistory: e.target.value })
          }
          style={inputStyle}
          className="form-select"
        >
          <option value="">All Institutes</option>
          {uniqueSchools.map((school) => (
            <option key={school} value={school}>
              {school}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchSidebar;

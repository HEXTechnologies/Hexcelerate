/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import { Search, X } from "lucide-react";

interface CompanySearchSidebarProps {
  isLightMode: boolean;
  filters: {
    searchTerm: string;
    location: string;
    industry: string;
    employeeCount: string;
    specialities: string[];
  };
  companies: Array<{
    industry?: string;
    employeeCount?: number;
    specialities?: string[];
  }>;
  onFilterChange: (filterName: string, value: any) => void;
  onClearFilters: () => void;
}

const CompanySearchSidebar = ({
  isLightMode,
  filters,
  companies,
  onFilterChange,
  onClearFilters,
}: CompanySearchSidebarProps) => {
  const sidebarStyle = {
    backgroundColor: isLightMode ? "#ffffff" : "#040411",
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
    backgroundColor: isLightMode ? "#f8f9fa" : "rgba(255, 255, 255, 0.1)",
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
    marginBottom: "1rem",
  };

  const selectStyle = {
    backgroundColor: isLightMode ? "#fff" : "#040411",
    color: isLightMode ? "#333" : "#fff",
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

  const employeeCountRanges = [
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "501-1000",
    "1001-5000",
    "5001-10000",
    "10000+",
  ];

  // Extract unique industries from companies data
  const uniqueIndustries = useMemo(() => {
    const industriesSet = new Set<string>();
    
    companies.forEach((company) => {
      if (company.industry) {
        industriesSet.add(company.industry);
      }
    });

    return Array.from(industriesSet).sort();
  }, [companies]);

  return (
    <div style={sidebarStyle}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "0.5rem",
          gap: "1rem",
          marginTop: "4.5rem",
        }}
      >
        <h2 style={{ ...headerStyle, margin: 0 }}>Search Filters</h2>
        <button
          onClick={onClearFilters}
          style={{ ...clearButtonStyle, marginLeft: "auto" }}
          className="btn-clear"
        >
          <X size={16} />
          Clear
        </button>
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Company Name</label>
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
        <label style={labelStyle}>Industry</label>
        <select
          value={filters.industry}
          onChange={(e) => onFilterChange("industry", e.target.value)}
          style={inputStyle}
          className="form-select"
        >
          <option value="" style={selectStyle}>
            All Industries
          </option>
          {uniqueIndustries.map((industry) => (
            <option key={industry} value={industry} style={selectStyle}>
              {industry}
            </option>
          ))}
        </select>
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Company Size</label>
        <select
          value={filters.employeeCount}
          onChange={(e) => onFilterChange("employeeCount", e.target.value)}
          style={inputStyle}
          className="form-select"
        >
          <option value="" style={selectStyle}>
            All Sizes
          </option>
          {employeeCountRanges.map((range) => (
            <option key={range} value={range} style={selectStyle}>
              {range} employees
            </option>
          ))}
        </select>
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Specialities</label>
        <input
          type="text"
          placeholder="Specialities..."
          value={filters.specialities.join(", ")}
          onChange={(e) =>
            onFilterChange(
              "specialities",
              e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            )
          }
          style={inputStyle}
        />
      </div>
    </div>
  );
};

export default CompanySearchSidebar;
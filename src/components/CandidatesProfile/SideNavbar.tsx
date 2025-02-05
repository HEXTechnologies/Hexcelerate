"use client";

import React, { useState } from "react";
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  Medal,
  Heart,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

interface SideNavbarProps {
  isLightMode: boolean;
  profileData?: {
    person: {
      summary?: string;
      positions?: {
        positionHistory?: any[];
      };
      schools?: {
        educationHistory?: any[];
      };
      skills?: any[];
      certifications?: {
        certificationHistory?: any[];
      };
      volunteeringExperiences?: any[];
      recommendations?: any[];
    };
  };
}

const SideNavbar = ({ isLightMode, profileData }: SideNavbarProps) => {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  // Define nav items with their visibility conditions
  const navItems = [
    {
      id: "about",
      icon: User,
      label: "About",
      isVisible: !!profileData?.person?.summary,
    },
    {
      id: "experience",
      icon: Briefcase,
      label: "Experience",
      isVisible: !!profileData?.person?.positions?.positionHistory?.length,
    },
    {
      id: "education",
      icon: GraduationCap,
      label: "Education",
      isVisible: !!profileData?.person?.schools?.educationHistory?.length,
    },
    {
      id: "skills",
      icon: Award,
      label: "Skills",
      isVisible: !!profileData?.person?.skills?.length,
    },
    {
      id: "certifications",
      icon: Medal,
      label: "Certifications",
      isVisible:
        !!profileData?.person?.certifications?.certificationHistory?.length,
    },
    {
      id: "volunteer",
      icon: Heart,
      label: "Volunteer",
      // Changed to check if the array exists and has content or if it's a non-empty object
      isVisible: Array.isArray(profileData?.person?.volunteeringExperiences)
        ? profileData?.person?.volunteeringExperiences.length > 0
        : !!profileData?.person?.volunteeringExperiences,
    },
    {
      id: "recommendations",
      icon: MessageCircle,
      label: "Recommendations",
      // Changed to check if the array exists and has content or if it's a non-empty object
      isVisible: Array.isArray(profileData?.person?.recommendations)
        ? profileData?.person?.recommendations.length > 0
        : !!profileData?.person?.recommendations,
    },
  ];

  const containerStyle = {
    position: "fixed" as const,
    left: "20px",
    top: "49%",
    transform: "translateY(-50%)",
    zIndex: 1,
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.75rem",
    padding: "0.75rem",
    borderRadius: "1rem",
    transition: "all 0.3s ease",
    width: "55px",
    backgroundColor: isLightMode ? "#f8f9fa" : "rgba(0,0,0,0.05)",
  };

  const itemStyle = (id: string) => ({
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
    padding: "0.35rem",
    borderRadius: "0.35rem",
    cursor: "pointer",
    color: isLightMode ? "#666" : "#8c8c9e",
    transition: "all 0.3s ease",
    textDecoration: "none",
    backgroundColor:
      isHovered === id
        ? isLightMode
          ? "rgba(0,0,0,0.05)"
          : "rgba(255,255,255,0.05)"
        : "transparent",
    "&:hover": {
      color: isLightMode ? "#333" : "#fff",
    },
  });

  const labelStyle = {
    position: "absolute" as const,
    left: "100%",
    zIndex: 1,
    marginLeft: "1rem",
    padding: "0.25rem 0.75rem",
    borderRadius: "0.25rem",
    backgroundColor: isLightMode
      ? "rgba(255, 255, 255, 0.95)"
      : "rgba(4, 4, 17, 0.95)",
    color: isLightMode ? "#333" : "#fff",
    fontSize: "0.875rem",
    whiteSpace: "nowrap" as const,
    boxShadow: isLightMode
      ? "0 2px 4px rgba(0,0,0,0.1)"
      : "0 2px 4px rgba(255,255,255,0.05)",
    opacity: 0,
    transform: "translateX(-10px)",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    backdropFilter: "blur(8px)",
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Filter out nav items that shouldn't be visible
  const visibleNavItems = navItems.filter((item) => item.isVisible);

  return (
    <nav style={containerStyle}>
      {visibleNavItems.map(({ id, icon: Icon, label }) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(id);
          }}
          style={itemStyle(id)}
          onMouseEnter={() => setIsHovered(id)}
          onMouseLeave={() => setIsHovered(null)}
        >
          <Icon
            size={18}
            style={{
              transition: "transform 0.3s ease",
              transform: isHovered === id ? "scale(1.1)" : "scale(1)",
            }}
          />
          <div
            style={{
              ...labelStyle,
              opacity: isHovered === id ? 1 : 0,
              transform:
                isHovered === id ? "translateX(0)" : "translateX(-10px)",
              visibility: isHovered === id ? "visible" : "hidden",
            }}
          >
            {label}
            <ChevronRight size={14} />
          </div>
        </a>
      ))}
    </nav>
  );
};

export default SideNavbar;

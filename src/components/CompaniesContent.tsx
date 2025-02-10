"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/Categories.module.css";
import Sidebar from "./dashboardComponents/Sidebar";
import MobileNav from "./dashboardComponents/MobileNav";
import DesktopNav from "./dashboardComponents/DesktopNav";

const CompaniesContent = () => {
  const [isLightMode, setIsLightMode] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("shouldRefresh")) {
      sessionStorage.removeItem("shouldRefresh");
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const isLight = savedTheme !== "dark";
      setIsLightMode(isLight);
    }
  }, []);

  const toggleLightMode = () => {
    const newTheme = isLightMode ? "dark" : "light";
    setIsLightMode(!isLightMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
    }
  };

  if (isLightMode === null) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`mainContainer ${isLightMode ? "light-mode" : ""}`}
      style={{
        backgroundColor: isLightMode ? "#ffffff" : "#000000",
        color: isLightMode ? "#000000" : "#ffffff",
        minHeight: "100vh",
        transition: "background-color 0.5s ease",
      }}
    >
      <Sidebar
        isLightMode={isLightMode}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <MobileNav
        isLightMode={isLightMode}
        isMobileNavOpen={isMobileNavOpen}
        setIsMobileNavOpen={setIsMobileNavOpen}
        toggleLightMode={toggleLightMode}
      />
      <DesktopNav
        isLightMode={isLightMode}
        isSidebarOpen={isSidebarOpen}
        toggleLightMode={toggleLightMode}
      />

      <div
        style={{
          marginLeft: isSidebarOpen ? "280px" : "64px",
          transition: "margin-left 0.3s ease",
          paddingTop: "80px",
        }}
        className="d-none d-md-block"
      >
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-xxl-11">
              <div className="content-container">
                <div className={`text-center mb-4 ${styles.titleWrapper}`}>
                  <h1
                    className={`display-4 display-md-3 display-lg-2 ${styles.title} text-break`}
                  >
                    Companies
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-md-none" style={{paddingTop: "80px"}}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-xxl-11">
              <div className="content-container">
                <div className="text-center mb-4">
                  <h1 className="display-4 display-md-3 display-lg-2 text-break">
                    Dashboard
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompaniesContent;
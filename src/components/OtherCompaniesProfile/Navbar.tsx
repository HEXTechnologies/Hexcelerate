/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SunFill, MoonStarsFill, List } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles.css";

type NavbarProps = {
  isLightMode: boolean;
  setIsLightMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar: React.FC<NavbarProps> = ({ isLightMode, setIsLightMode }) => {
  const [mounted, setMounted] = useState(false);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  // Apply saved theme on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.body.classList.add("light-mode");
      setIsLightMode(true);
    } else {
      document.body.classList.remove("light-mode");
      setIsLightMode(false);
    }
  }, [setIsLightMode]);

  // Ensure the component is mounted before rendering
  useEffect(() => {
    setMounted(true);
    // Load Bootstrap JS for client side
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js");

      // Setup resize handler for offcanvas
      const handleResize = () => {
        if (window.innerWidth >= 992) {
          setIsOffcanvasOpen(false);
        }
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const toggleLightMode = () => {
    const newMode = !isLightMode;
    document.body.classList.toggle("light-mode", newMode);
    setIsLightMode(newMode);
    localStorage.setItem("theme", newMode ? "light" : "dark");
  };

  const handleOffcanvasToggle = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  // Return null or loading state while client-side code is not yet available
  if (!mounted) {
    return (
      <nav className="navbar custom-navbar fixed-top">
        <div className="container-fluid">
          <div className="d-flex gap-1 ms-auto">
            <div className="darkmode-icon d-flex align-items-center justify-content-center">
              <SunFill size={20} />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar custom-navbar fixed-top">
      <div className="container-fluid d-flex justify-content-between">
        {/* Left side - Dashboard */}
        <div className="d-lg-none">
          <div
            className="navbar-brand gradient-button"
            style={{
              paddingLeft: "7px",
              paddingTop: "8px",
              paddingBottom: "7px",
              paddingRight: "10px",
              borderRadius: "10px",
            }}
          >
            <Link className="text-white" href="/Dashboard">
              <img
                src={"/HEX-HACC-2024-LIGHT.png"}
                alt="Dashboard Icon"
                width="auto"
                height={30}
                className="object-contain"
              />
              Hexcelerate AI
            </Link>
          </div>
        </div>

        {/* Right side - Controls */}
        <div className="d-flex gap-1 ms-auto d-lg-none">
          <div
            onClick={toggleLightMode}
            className="darkmode-icon d-flex align-items-center justify-content-center"
            style={{ cursor: "pointer" }}
          >
            {isLightMode ? <MoonStarsFill size={20} /> : <SunFill size={20} />}
          </div>
          <button
            className="navbar-toggler darkmode-icon d-flex align-items-center justify-content-center d-lg-none"
            style={{
              cursor: "pointer",
              border: "none",
              outline: "none",
              boxShadow: "none",
            }}
            type="button"
            onClick={handleOffcanvasToggle}
            aria-expanded={isOffcanvasOpen}
            aria-label="Toggle navigation"
          >
            <List size={28} />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="collapse navbar-collapse d-none d-lg-block mb-2">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <div className="container-fluid d-flex align-items-center">
              {/* Logo */}
              <div
                className="navbar-brand gradient-button"
                style={{
                  marginTop: "6px",
                  paddingLeft: "7px",
                  paddingTop: "8px",
                  paddingBottom: "7px",
                  borderRadius: "60px",
                }}
              >
                <Link href="/Dashboard">
                  <img
                    src={"/HEX-HACC-2024-LIGHT.png"}
                    alt="Dashboard Icon"
                    width="auto"
                    height={30}
                    className="object-contain"
                  />
                </Link>
              </div>

              {/* Navigation Links - Left Aligned */}
              <ul className="navbar-nav d-flex flex-row align-items-center">
                <li className="nav-item">
                  <Link href="/Companies" style={{ fontSize: "0.9rem" }}>
                    Companies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/Candidates" style={{ fontSize: "0.9rem" }}>
                    Candidates
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/InterviewAI" style={{ fontSize: "0.9rem" }}>
                    Interview AI
                  </Link>
                </li>
              </ul>
            </div>

            {/* Right Side Items */}
            <div className="d-flex align-items-center gap-3 me-2 mt-2">
              <Link
                href="Compare"
                className="btn btn-primary gradient-button text-white px-3 py-2"
                style={{ fontSize: "0.8rem", borderRadius: "20px" }}
              >
                Compare
              </Link>
              <div
                onClick={toggleLightMode}
                className="darkmode-icon d-flex align-items-center nav-link gap-2"
                style={{ cursor: "pointer" }}
              >
                {isLightMode ? (
                  <MoonStarsFill size={20} />
                ) : (
                  <SunFill size={20} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Offcanvas Menu for Mobile */}
        <div
          className={`offcanvas offcanvas-end custom-navbar ${
            isOffcanvasOpen ? "show" : ""
          }`}
          tabIndex={-1}
          id="navbarOffcanvas"
          aria-labelledby="navbarOffcanvasLabel"
          style={{
            boxShadow: "1px 1px 1px rgba(0, 0, 0, 0)",
            width: "300px",
            backgroundColor: isLightMode ? "#9BCDFF" : "black",
          }}
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close mt-2 me-4"
              onClick={() => setIsOffcanvasOpen(false)}
              aria-label="Close"
              style={{
                border: "1px solid",
                outline: "1px solid",
                boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                width: "5px",
                height: "5px",
                backgroundColor: isLightMode ? "white" : "#5c85f6",
              }}
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav align-items-start">
              <li className="nav-item mb-2">
                <Link
                  href="#Introduction"
                  className="nav-link"
                  onClick={() => setIsOffcanvasOpen(false)}
                  style={{ fontSize: "0.9rem" }}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  href="/Companies"
                  className="nav-link"
                  onClick={() => setIsOffcanvasOpen(false)}
                  style={{ fontSize: "0.9rem" }}
                >
                  Companies
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  href="/Candidates"
                  className="nav-link"
                  onClick={() => setIsOffcanvasOpen(false)}
                  style={{ fontSize: "0.9rem" }}
                >
                  Candidates
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  href="/InterviewAI"
                  className="nav-link"
                  onClick={() => setIsOffcanvasOpen(false)}
                  style={{ fontSize: "0.9rem" }}
                >
                  Interview AI
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  href="Compare"
                  className="btn btn-primary gradient-button text-white px-4 py-2"
                  style={{ fontSize: "0.8rem" }}
                >
                  Compare
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

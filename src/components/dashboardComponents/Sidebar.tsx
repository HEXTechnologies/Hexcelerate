import React from "react";
import Link from "next/link";
import { House } from "react-bootstrap-icons";
import { BarChart4, ChevronLeft, LayoutGrid, Settings, LogOut } from "lucide-react";
import "../../styles.css";

const Sidebar = ({ isLightMode, isSidebarOpen, setIsSidebarOpen }) => (
  <div
    className={`position-fixed h-100 d-none d-md-flex flex-column transition-all duration-300 ease-in-out ${
      isSidebarOpen ? "w-72" : "w-16"
    }`}
    style={{
      maxWidth: "280px",
      width: isSidebarOpen ? "280px" : "92px",
      backgroundColor: isLightMode
        ? "rgba(124, 174, 255, 0.743)"
        : "rgba(0, 0, 0, 0.743)",
      top: 0,
      left: 0,
      zIndex: 1030,
      paddingTop: "1rem",
    }}
  >
    <button
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
    >
      <ChevronLeft
        size={18}
        style={{
          transform: isSidebarOpen ? "rotate(0deg)" : "rotate(180deg)",
          transition: "transform 0.3s ease",
        }}
      />
    </button>

    <div className="d-flex flex-column gap-3 px-4">
      <Link
        href="/"
        className="d-flex align-items-center text-decoration-none text-white gap-3"
      >
        <div className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
             style={{ width: "45px", height: "45px" }}>
          <House size={18} />
        </div>
        {isSidebarOpen && <span className="fs-5">Home</span>}
      </Link>

      <Link
        href="../Projects"
        className="d-flex align-items-center text-decoration-none text-white gap-3"
      >
        <div className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
             style={{ width: "45px", height: "45px" }}>
          <BarChart4 size={18} />
        </div>
        {isSidebarOpen && <span className="fs-5">Projects</span>}
      </Link>

      <Link
        href="../Companies"
        className="d-flex align-items-center text-decoration-none text-white gap-3"
      >
        <div className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
             style={{ width: "45px", height: "45px" }}>
          <LayoutGrid size={18} />
        </div>
        {isSidebarOpen && <span className="fs-5">Companies</span>}
      </Link>

      <Link
        href="../Companies"
        className="d-flex align-items-center text-decoration-none text-white gap-3"
      >
        <div className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
             style={{ width: "45px", height: "45px" }}>
          <Settings size={18} />
        </div>
        {isSidebarOpen && <span className="fs-5">Settings</span>}
      </Link>

      <Link
        href="../Companies"
        className="d-flex align-items-center text-decoration-none text-white gap-3"
      >
        <div className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
             style={{
               width: "45px",
               height: "45px",
               /*backgroundColor: "rgba(255, 0, 0)"*/
               color: "red"

              }}>
          <LogOut size={18} />
        </div>
        {isSidebarOpen && <span className="fs-5">Logout</span>}
      </Link>
    </div>
  </div>
);

export default Sidebar;
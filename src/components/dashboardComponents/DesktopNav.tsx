import React from "react";
import { MoonStarsFill, SunFill } from "react-bootstrap-icons";
import BookmarkDropDown from "../Bookmark/BookmarksDropdown";

const DesktopNav = ({ isLightMode, isSidebarOpen, toggleLightMode }) => (
  <nav
    className="navbar custom-navbar p-3 fixed-top d-none d-md-flex"
    style={{
      width: `calc(100vw - ${isSidebarOpen ? "280px" : "92px"})`,
      marginLeft: isSidebarOpen ? "280px" : "92px",
      backgroundColor: isLightMode
        ? "rgba(124, 174, 255, 0.743)"
        : "rgba(0, 0, 0, 0.743)",
      transition: "all 0.2s ease",
    }}
  >
    <div className="d-flex justify-content-between align-items-center w-100">
      <h4 className="m-0 text-white text-center w-100">HEXCELERATE</h4>

      <div className="d-flex align-items-center gap-4">
        <button
          onClick={toggleLightMode}
          className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: "45px", height: "45px" }}
        >
          {isLightMode ? <MoonStarsFill size={18} /> : <SunFill size={18} />}
        </button>
        <BookmarkDropDown />
      </div>
    </div>
  </nav>
);

export default DesktopNav;
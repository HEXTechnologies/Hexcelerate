import React from "react";
import Link from "next/link";
import { House, MoonStarsFill, SunFill } from "react-bootstrap-icons";
import { BarChart4, ChevronDown, LayoutGrid } from "lucide-react";
import BookmarkDropDown from "../Bookmark/BookmarksDropdown";

const MobileNav = ({ isLightMode, isMobileNavOpen, setIsMobileNavOpen, toggleLightMode }) => (
  <nav
    className="navbar custom-navbar p-3 fixed-top d-md-none"
    style={{
      width: "100vw",
      backgroundColor: isLightMode
        ? "rgba(124, 174, 255, 0.743)"
        : "rgba(0, 0, 0, 0.743)",
    }}
  >
    <div className="d-flex justify-content-between align-items-center w-100">
      <div className="d-flex align-items-center position-relative">
        <button
          className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center ms-4"
          style={{ width: "45px", height: "45px" }}
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
        >
          <ChevronDown
            size={18}
            style={{
              transform: isMobileNavOpen ? "rotate(180deg)" : "none",
              transition: "transform 0.3s ease",
            }}
          />
        </button>

        {isMobileNavOpen && (
          <div
            className="position-absolute"
            style={{
              left: 0,
              top: "60px",
              zIndex: 1000,
            }}
          >
            <div
              className={`${
                isLightMode ? "bg-primary-subtle" : "bg-dark"
              } rounded-5 shadow-sm px-3 py-3 d-flex flex-column align-items-center ms-2 mt-3`}
            >
              <Link href="/" passHref>
                <button
                  className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "45px", height: "45px" }}
                >
                  <House size={18} />
                </button>
              </Link>
              <Link href="../Dashboard" passHref>
                <button
                  className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center mt-3"
                  style={{ width: "45px", height: "45px" }}
                >
                  <BarChart4 size={18} />
                </button>
              </Link>
              <Link href="/Categories/community" passHref>
                <button
                  className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center mt-3"
                  style={{ width: "45px", height: "45px" }}
                >
                  <LayoutGrid size={18} />
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <BookmarkDropDown />

      <div className="d-flex align-items-center gap-2 me-5">
        <button
          onClick={toggleLightMode}
          className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: "45px", height: "45px" }}
        >
          {isLightMode ? <MoonStarsFill size={18} /> : <SunFill size={18} />}
        </button>
      </div>
    </div>
  </nav>
);

export default MobileNav;
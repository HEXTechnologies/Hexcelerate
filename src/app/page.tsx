/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */

"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import "../styles/Lightmode.css";
import "../styles/HomeTopandIntro.css";
import "../styles/HomeCategory.css";
import "../styles/HomeHowItWorks.css";
import "../styles/HomeChatbots.css";

import {
  PeopleFill,
  BusFrontFill,
  Book,
  Briefcase,
  Shield,
  CaretLeftFill,
  CaretRightFill,
  BriefcaseFill,
  AwardFill,
  StarFill,
  TrophyFill,
  MortarboardFill,
} from "react-bootstrap-icons";
import Link from "next/link";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import HowItWorks from "../components/howItWorks";
import Introduction from "../components/introduction";
import React, { useEffect, useState } from "react";
import ChatBotsDesign from "@/components/ChatBotsDesign";
import AISticker from "@/components/AISticker";

const HomeImage: React.FC<{ isLightMode: boolean }> = ({ isLightMode }) => {
  const words = ["RELIABLE", "RELEVANT", "READY"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [text, setText] = useState("");
  const fullText =
    "Empowering Smarter Hiring with AI-Enhanced LinkedIn Insights";
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [words.length]);

  useEffect(() => {
    let currentIndex = 0;
    let typingTimer: string | number | NodeJS.Timeout | undefined;

    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    // Typing effect
    if (isTyping) {
      typingTimer = setInterval(() => {
        if (currentIndex < fullText.length) {
          setText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingTimer);
        }
      }, 50); // Adjust speed here (lower number = faster)
    }

    return () => {
      clearInterval(typingTimer);
      clearInterval(cursorInterval);
    };
  }, [isTyping]);

  return (
    <div
      id="Title"
      className="container-fluid HomeImageCt d-flex justify-content-center align-items-center pt-5"
    >
      <div className="row w-100">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center mb-5">
          <h1 className="text-center fw-bold mt-5 mb-4">
            <span
              className={`flip-word fw-bold ${
                isLightMode ? "blue-text" : "gradient-text"
              }`}
            >
              HEXCELERATE
            </span>
          </h1>

          <h4 className="text-center mt-2 font-medium text-lg min-h-[28px]">
            {text}
            <span
              className={`inline-block w-0.5 h-5 bg-black ml-1 -mb-0.5 ${
                showCursor ? "opacity-100" : "opacity-0"
              }`}
            />
          </h4>
          <h2 className="text-center fw-bold mt-4">
            <span
              key={currentWordIndex}
              className={`flip-word fw-bold ${
                isLightMode ? "blue-text" : "gradient-text"
              } flip-animation`}
            >
              {words[currentWordIndex]}
            </span>{" "}
            FOR YOUR DISCOVERY
          </h2>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img
            src="/HEX-HACC-2024-LIGHT-5.png"
            alt="3D Graph"
            className="img-fluid right-image rounded fade-in"
            style={{ width: "75%", height: "auto" }}
          />
        </div>
      </div>
      <div className="bottom-light left-light"></div>
      <div className="bottom-light right-light"></div>
    </div>
  );
};

const categoryData = [
  {
    id: "community",
    name: "Community",
    icon: <PeopleFill className="fs-1" />,
    link: "/Categories/community",
  },
  {
    id: "transportation",
    name: "Transportation",
    icon: <BusFrontFill className="fs-1" />,
    link: "/Categories/transportation",
  },
  {
    id: "school",
    name: "School",
    icon: <Book className="fs-1" />,
    link: "/Categories/school",
  },
  {
    id: "employment",
    name: "Employment",
    icon: <Briefcase className="fs-1" />,
    link: "/Categories/employment",
  },
  {
    id: "publicSafety",
    name: "Safety",
    icon: <Shield className="fs-1" />,
    link: "/Categories/publicSafety",
  },
];

const candidateData = [
  {
    id: "entry",
    name: "Entry Level",
    icon: <MortarboardFill className="fs-1" />,
    description: "0-2 years experience",
    link: "/Candidates/entry", // Added link
  },
  {
    id: "mid",
    name: "Mid Level",
    icon: <BriefcaseFill className="fs-1" />,
    description: "2-5 years experience",
    link: "/Candidates/mid", // Added link
  },
  {
    id: "senior",
    name: "Senior Level",
    icon: <AwardFill className="fs-1" />,
    description: "5+ years experience",
    link: "/Candidates/senior", // Added link
  },
  {
    id: "expert",
    name: "Expert Level",
    icon: <StarFill className="fs-1" />,
    description: "10+ years experience",
    link: "/Candidates/expert", // Added link
  },
  {
    id: "executive",
    name: "Executive",
    icon: <TrophyFill className="fs-1" />,
    description: "Leadership roles",
    link: "/Candidates/executive", // Added link
  },
];

const CombinedDisplay: React.FC<{ isLightMode: boolean }> = React.memo(() => {
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showCandidates, setShowCandidates] = useState(true);

  const currentData = showCandidates ? candidateData : categoryData;
  const rotationStep = -360 / currentData.length;

  const centeredIndex =
    ((Math.round(rotation / rotationStep) % currentData.length) +
      currentData.length) %
    currentData.length;

  useEffect(() => {
    // Reset rotation when switching between categories and candidates
    setRotation(0);
  }, [showCandidates]);

  useEffect(() => {
    const navButtons = document.querySelector(".nav-buttons");

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (navButtons) {
      observer.observe(navButtons);
    }

    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(() => {
        setRotation((prevRotation) => prevRotation + rotationStep);
      }, 2700);
    }

    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (navButtons) {
        observer.unobserve(navButtons);
      }
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPaused, rotationStep]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const handleForward = () => {
    setIsPaused(true);
    setRotation((prevRotation) => prevRotation + rotationStep);
  };

  const handleBackward = () => {
    setIsPaused(true);
    setRotation((prevRotation) => prevRotation - rotationStep);
  };

  const toggleDisplay = () => {
    setShowCandidates(!showCandidates);
  };

  return (
    <div
      id="Category"
      className="circular-categories-container text-center py-5 container-fluid"
    >
      <h1 className="custom-h1 mb-4 mt-4">
        {showCandidates ? "FIND PROMISING CANDIDATES" : "FIND ACTIVELY HIRING COMPANIES"}
      </h1>
      <h4 className="custom-h4 mb-5">
        {showCandidates
          ? "Accelerate Your Hiring: Discover Top Candidates Tailored to Your Needs"
          : "Land Your Dream Job: Guaranteed Skill-Based Matches You Can Trust"}
      </h4>

      <div
        className="circular-display"
        style={{ transform: `rotateY(${rotation}deg)` }}
      >
        {currentData.map((item, index) => (
          <Link
            key={item.id}
            href={showCandidates ? `/Candidates/${item.id}` : item.link}
            className={`category-box ${
              index === centeredIndex ? "centered" : ""
            }`}
            onMouseEnter={
              index === centeredIndex ? handleMouseEnter : undefined
            }
            onMouseLeave={
              index === centeredIndex ? handleMouseLeave : undefined
            }
          >
            <div className="category-icon">{item.icon}</div>
            <strong>{item.name}</strong>
          </Link>
        ))}
      </div>

      <div className="spotlight-center"></div>
      <div className="spotlight-left"></div>
      <div className="spotlight-right"></div>

      <div
        className="nav-buttons mt-4"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "all 0.5s ease",
        }}
      >
        <button
          onClick={handleBackward}
          className="btn btn-primary mx-2 gradient-button"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            padding: "0",
          }}
        >
          <CaretLeftFill size={20} />
        </button>
        <button
          onClick={toggleDisplay}
          className="btn btn-primary gradient-button px-4 py-2"
          style={{
            transition: "all 0.3s ease",
          }}
        >
          Find {showCandidates ? "Companies" : "Candidates"}
        </button>
        <button
          onClick={handleForward}
          className="btn btn-primary mx-2 gradient-button"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            padding: "0",
          }}
        >
          <CaretRightFill size={20} />
        </button>
      </div>
    </div>
  );
});

export default function Home() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("refreshHome")) {
      sessionStorage.removeItem("refreshHome");
      window.location.href = "/"; // Hard reload the homepage to ensure a full refresh
    }
  }, []);

  return (
    <main>
      <Navbar isLightMode={isLightMode} setIsLightMode={setIsLightMode} />
      <HomeImage isLightMode={isLightMode} />
      <Introduction />
      <CombinedDisplay isLightMode={isLightMode} />
      <HowItWorks />
      <ChatBotsDesign />
      <AISticker />
      <Footer />
    </main>
  );
}

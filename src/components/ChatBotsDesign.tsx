/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import "../styles.css";
import { Download, Upload, HelpCircle, BarChart2 } from "lucide-react";
import { BsArrowLeftRight } from "react-icons/bs";

const ChatBotsDesign: React.FC = () => {
  const [isCompanyView, setIsCompanyView] = useState(true);

  const content = {
    company: {
      title: "AI INTERVIEW ASSISTANT",
      buttonText: "Join Our Pre-Seed Waitlist",
      mainTitle: "PERSONALIZED INTERVIEW BOT FOR YOUR COMPANY",
      largeBoxTitle: "CUSTOMIZED SCREENING FOR YOUR NEEDS",
      quickActions: ["SCREEN", "FILTER", "RANK", "ANALYZE"],
      leftBoxTitle: (
        <>
          View Insights
          <br />
          From Top Candidates
        </>
      ),
      rightBoxTitle: (
        <>
          Quick Screening,
          <br />
          Just Like a Chat!
        </>
      ),
    },
    candidate: {
      title: "AI INTERVIEW PRACTICE",
      buttonText: "Join Our Pre-Seed Waitlist",
      mainTitle: "PRACTICE WITH COMPANY-SPECIFIC AI",
      largeBoxTitle: "TAILORED INTERVIEWS FOR YOUR GOALS",
      quickActions: ["PRACTICE", "LEARN", "IMPROVE", "TRACK"],
      leftBoxTitle: (
        <>
          Track Progress
          <br />
          With Company Matches
        </>
      ),
      rightBoxTitle: (
        <>
          Real Interviews,
          <br />
          Perfect Practice!
        </>
      ),
    },
  };

  const handleNavigation = () => {
    window.location.href = "/Waitlist";
  };

  useEffect(() => {
    const boxes = document.querySelectorAll(".AnimatedBox");

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    boxes.forEach((box) => {
      observer.observe(box);
    });

    return () => {
      boxes.forEach((box) => observer.unobserve(box));
    };
  }, []);

  const currentContent = isCompanyView ? content.company : content.candidate;

  return (
    <div id="Chatbot" className="FullPageBackground">
      <div className="text-center">
        <h1
          className="custom-h1 AnimatedBox mt-5"
          style={{
            marginBottom: "30px",
            opacity: 0,
            transform: "translateY(20px)",
            transition: "all 0.5s ease",
          }}
        >
          {currentContent.mainTitle}
        </h1>

        <button
          onClick={() => setIsCompanyView(!isCompanyView)}
          className="btn btn-primary gradient-button px-4 py-2 mb-4"
          style={{
            borderRadius: "20px",
            transition: "all 0.3s ease",
          }}
        >
          <BsArrowLeftRight size={12} />
        </button>
      </div>

      <div
        className="mt-4 AnimatedBox"
        style={{
          display: "flex",
          justifyContent: "center",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "all 0.5s ease 0.2s",
          position: "relative",
        }}
      ></div>

      <div className="ChatBotsContainer container-fluid p-0">
        <div className="Row TopRow row mx-0 justify-content-center">
          <div className="col-12 col-lg-8 px-2 mb-3 mb-lg-0 d-flex justify-content-center">
            <div
              className="Box LargeBox d-flex flex-column align-items-center AnimatedBox w-100"
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: "ease 0.6s",
              }}
            >
              <img src="/AI.png" alt="AI.jpg" className="AI-image" />
              <h3
                className="fw-bold"
                style={{
                  marginTop: "30px",
                  textAlign: "center",
                  fontSize: "25px",
                }}
              >
                {currentContent.largeBoxTitle}
              </h3>
            </div>
          </div>
          <div className="col-12 col-lg-4 px-2 mb-3 mb-lg-0 d-flex justify-content-center">
            <div
              className="Box SmallBox smallBoxText AnimatedBox w-100"
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: "ease 0.6s",
                fontSize: "25px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {currentContent.quickActions.map((action, index) => (
                <div
                  key={index}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {index === 0 && (
                    <Download size={20} style={{ marginRight: "8px" }} />
                  )}
                  {index === 1 && (
                    <Upload size={20} style={{ marginRight: "8px" }} />
                  )}
                  {index === 2 && (
                    <HelpCircle size={20} style={{ marginRight: "8px" }} />
                  )}
                  {index === 3 && (
                    <BarChart2 size={20} style={{ marginRight: "8px" }} />
                  )}
                  <span>{action}</span>
                </div>
              ))}
              <p>INSTANTLY!</p>
            </div>
          </div>
        </div>

        <div className="Row BottomRow row mx-0 justify-content-center">
          <div className="col-12 col-lg-6 px-2 mb-3 mb-lg-0 d-flex justify-content-center">
            <div
              className="Box MediumBox-left d-flex flex-column align-items-center justify-content-center AnimatedBox w-100"
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: "ease 0.1s",
              }}
            >
              <h3 className="fw-bold text-center mt-5 mb-4">
                {currentContent.leftBoxTitle}
              </h3>
              <div className="bar-chart">
                <div className="bar bar-1"></div>
                <div className="bar bar-2"></div>
                <div className="bar bar-3"></div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 px-2 d-flex justify-content-center">
            <div
              className="Box MediumBox-right d-flex flex-column align-items-center AnimatedBox w-100"
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: "ease 0.5s",
              }}
            >
              <img src="/text.png" alt="Text" className="Text-image" />
              <h3
                className="fw-bold"
                style={{ marginTop: "-20px", fontSize: "20px" }}
              >
                {currentContent.rightBoxTitle}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <h1
        className="custom-h1 AnimatedBox mt-5"
        style={{
          marginBottom: "30px",
          opacity: 0,
          textAlign: "center",
          transform: "translateY(20px)",
          transition: "all 0.5s ease",
        }}
      >
        {isCompanyView
          ? "READY TO SKYROCKET YOUR HIRING PROCESS?"
          : "READY TO MATCH WITH THE RIGHT COMPANY?"}
      </h1>
      <button
        onClick={handleNavigation}
        className="btn btn-primary gradient-button mx-2"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          padding: "10px 20px",
        }}
      >
        {currentContent.buttonText}
      </button>
      <button
        onClick={() => setIsCompanyView(!isCompanyView)}
        className="btn btn-primary gradient-button px-4 py-2 mb-4"
        style={{
          borderRadius: "20px",
          transition: "all 0.3s ease",
          marginTop: "30px",
        }}
      >
        <BsArrowLeftRight size={12} />
      </button>
    </div>
  );
};

export default ChatBotsDesign;

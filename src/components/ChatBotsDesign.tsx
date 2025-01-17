/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import "../styles.css";
import {
  Download,
  Upload,
  HelpCircle,
  BarChart2,
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  UserPlus,
  LifeBuoy,
  Rocket,
  ArrowUpCircle,
  User,
} from "lucide-react";
import { BsArrowLeftRight } from "react-icons/bs";
import { database } from "../../firebaseConfig/firebase";
import { ref, onValue } from "firebase/database";

interface ContentBox {
  title: string;
  buttonText: string;
  mainTitle: string;
  largeBoxTitle: string;
  quickActions: string[];
  leftBoxTitle: React.ReactNode;
  rightBoxTitle: React.ReactNode;
}

interface WaitlistStats {
  total: number;
  companies: number;
  jobSeekers: number;
  educational: number;
}

const ChatBotsDesign: React.FC = () => {
  const [isCompanyView, setIsCompanyView] = useState(true);
  const [stats, setStats] = useState<WaitlistStats>({
    total: 0,
    companies: 0,
    jobSeekers: 0,
    educational: 0,
  });

  const content: Record<string, ContentBox> = {
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
      mainTitle: "PRACTICE WITH AI PROJECTS AND INTERVIEWS",
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

  useEffect(() => {
    const waitlistRef = ref(database, "Waitlist");

    const unsubscribe = onValue(waitlistRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const entries = Object.values(data) as Array<{ role: string }>;

        const newStats = entries.reduce(
          (acc: WaitlistStats, entry) => {
            // Always increment total for any role
            acc.total++;

            const role = entry.role;

            // Companies
            if (
              role === "Company Hiring" ||
              role === "Company Internships" ||
              role === "Startup Building" ||
              role === "Company Projects"
            ) {
              acc.companies++;
            }
            // Job Seekers
            else if (
              role === "Professional Seeking Jobs" ||
              role === "Student Seeking Internship" ||
              role === "Career Transitioner" ||
              role === "Project Seeker"
            ) {
              acc.jobSeekers++;
            }
            // Educational
            else if (
              role === "University Partner" ||
              role === "Educational Institution" ||
              role === "Career Counselor" ||
              role === "Educational Representative"
            ) {
              acc.educational++;
            }
            // Other roles will only contribute to total count

            return acc;
          },
          { total: 0, companies: 0, jobSeekers: 0, educational: 0 }
        );

        setStats(newStats);
      }
    });

    return () => unsubscribe();
  }, []);

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

  const handleNavigation = () => {
    window.location.href = "/Waitlist";
  };

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

        {/* Stats Section */}
        <div className="Row StatsRow row mx-0 justify-content-center mt-2">
          <div className="col-12 col-lg-8 px-2 mb-3 mb-lg-0 d-flex justify-content-center">
            <div
              className="Box LargeBox d-flex flex-column align-items-center AnimatedBox w-100"
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: "ease 0.6s",
              }}
            >
              <h3
                className="fw-bold"
                style={{
                  marginTop: "30px",
                  textAlign: "center",
                  fontSize: "25px",
                }}
              >
                JOIN OUR GROWING COMMUNITY
              </h3>
              <div className="row w-100 mt-4">
                <div className="col-md-3 col-6 text-center mb-4">
                  <Users className="gradient-icon mb-3" size={32} />
                  <div className="fw-bold" style={{ fontSize: "24px" }}>
                    {stats.total}
                  </div>
                  <div className="text-gray-400" style={{ fontSize: "16px" }}>
                    Waitlisted
                  </div>
                </div>
                <div className="col-md-3 col-6 text-center mb-4">
                  <Building2 className="gradient-icon mb-3" size={32} />
                  <div className="fw-bold" style={{ fontSize: "24px" }}>
                    {stats.companies}
                  </div>
                  <div className="text-gray-400" style={{ fontSize: "16px" }}>
                    Companies
                  </div>
                </div>
                <div className="col-md-3 col-6 text-center mb-4">
                  <Briefcase className="gradient-icon mb-3" size={32} />
                  <div className="fw-bold" style={{ fontSize: "24px" }}>
                    {stats.jobSeekers}
                  </div>
                  <div className="text-gray-400" style={{ fontSize: "16px" }}>
                    Candidates
                  </div>
                </div>
                <div className="col-md-3 col-6 text-center mb-4">
                  <GraduationCap className="gradient-icon mb-3" size={32} />
                  <div className="fw-bold" style={{ fontSize: "24px" }}>
                    {stats.educational}
                  </div>
                  <div className="text-gray-400" style={{ fontSize: "16px" }}>
                    Partners
                  </div>
                </div>
              </div>
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
              <div style={{ display: "flex", alignItems: "center" }}>
                <UserPlus size={20} style={{ marginRight: "8px" }} />
                <span>RECRUIT</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <LifeBuoy size={20} style={{ marginRight: "8px" }} />
                <span>ASSIST</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Rocket size={20} style={{ marginRight: "8px" }} />
                <span>LAUNCH</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <ArrowUpCircle size={20} style={{ marginRight: "8px" }} />
                <span>ELEVATE</span>
              </div>
              <p>TODAY!</p>
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
          ? "READY TO BOOST YOUR DEVELOPMENT SPEED?"
          : "READY TO MATCH WITH LEADING COMPANIES?"}
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

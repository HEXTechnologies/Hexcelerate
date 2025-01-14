import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BsArrowLeftRight } from "react-icons/bs";

const Introduction: React.FC = () => {
  const [isCompanyView, setIsCompanyView] = useState(true);

  const content = {
    company: {
      header: "For Companies",
      subheader: "Discover How We Help You Find Top Talent",
      features: [
        {
          title: "AI-Powered Matching",
          description:
            "Our advanced AI analyzes LinkedIn profiles to identify top talent that matches your company needs. Experience seamless candidate discovery through intelligent profile analysis and precise matching algorithms.",
        },
        {
          title: "Smart Filtering",
          description:
            "Efficiently sort candidates using our advanced filtering system based on experience, skills, and potential. Our AI ranks each profile to ensure you find the perfect match for your team.",
        },
        {
          title: "Automated Interviews",
          description:
            "Deploy customized AI interview bots that reflect your company culture and requirements. Screen candidates automatically and efficiently while maintaining your unique hiring standards.",
        },
      ],
    },
    candidate: {
      header: "For Candidates",
      subheader: "Let AI Fast-Track Your Career Journey",
      features: [
        {
          title: "LinkedIn Integration",
          description:
            "Connect your LinkedIn profile to unlock AI-powered job matching tailored to your experience. Our system analyzes your professional background to find opportunities that match your career goals.",
        },
        {
          title: "Instant Matching",
          description:
            "Receive immediate connections with companies seeking your specific skills and experience level. Our AI ensures precise matching by analyzing both your profile and company requirements.",
        },
        {
          title: "AI-Powered Interviews",
          description:
            "Start interviewing instantly with company-specific AI chatbots designed to assess your fit. Experience personalized conversations that prepare you for your next career opportunity.",
        },
      ],
    },
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
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
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
    <div id="Introduction" className="IntroDiv px-4 pt-5">
      <div className="text-center mb-5">
        <h1 className="text-white fw-bold mb-3">{currentContent.header}</h1>
        <h4 className="text-white">{currentContent.subheader}</h4>
        <button
          onClick={() => setIsCompanyView(!isCompanyView)}
          className="btn btn-primary gradient-button px-4 py-2 mt-4"
          style={{
            borderRadius: "20px",
          }}
        >
          <BsArrowLeftRight size={12} />
        </button>
      </div>

      <Row className="d-flex justify-content-center align-items-stretch gap-md-4 gap-2">
        {currentContent.features.map((item, index) => (
          <Col
            key={index}
            xs={12}
            lg={3}
            md={5}
            className="d-flex flex-column align-items-center"
          >
            <div
              className="IntroBox p-4 text-center border card-shadow mt-4 AnimatedBox"
              data-box={index + 1}
              style={{
                height: "400px",
                maxWidth: "300px",
                width: "100%",
                opacity: 0,
                transform: "translateY(30px)",
                transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${
                  index * 0.2
                }s`,
                letterSpacing: 0.5,
              }}
            >
              <h3 className="feature-title mb-4">{item.title}</h3>
              <p className="feature-description">{item.description}</p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Introduction;
